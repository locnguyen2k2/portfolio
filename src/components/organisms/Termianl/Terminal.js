import { useState, useRef, useEffect, useCallback } from "react";
import "./terminal.scss";


export default function Terminal({ title = "Loc Nguyen", className = '' }) {
    const [open, setOpen] = useState(false);
    const API_URL = `${process.env.REACT_APP_CHAT_BOT_API}`;
    const WORKSPACE_ID = `${process.env.REACT_APP_CHAT_BOT_WORKPLACE_ID}`;
    const AUTH_HEADER = `Basic ${process.env.REACT_APP_CHAT_BOT_TOKEN}`;
    const QUICK_COMMANDS = [
        { label: "tech-stack", question: "What is your tech stack?" },
        { label: "experience", question: "Tell me about your worked experiences." },
        { label: "projects", question: "What projects have you worked on?" },
        { label: "education", question: "What is your education background?" },
        { label: "contact", question: "How can I contact you?" },
    ];
    const [history, setHistory] = useState([
        { type: "output", text: "Hi, I'm Loc's portfolio assistant. Ask me anything, or try a command below." },
    ]);
    const [isStreaming, setIsStreaming] = useState(false);
    const bodyRef = useRef(null);
    const inputRef = useRef(null);
    const abortRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const appendLine = useCallback((line) => {
        setHistory((prev) => [...prev, line]);
    }, []);

    const updateLastOutput = useCallback((updater) => {
        setHistory((prev) => {
            const next = [...prev];
            const lastIndex = next.length - 1;
            next[lastIndex] = { ...next[lastIndex], ...updater(next[lastIndex]) };
            return next;
        });
    }, []);

    const askQuestion = useCallback(
        async (question) => {
            if (!question.trim() || isStreaming) return;

            appendLine({ type: "command", text: question });
            appendLine({ type: "output", text: "", sources: [] });
            setIsStreaming(true);

            const controller = new AbortController();
            abortRef.current = controller;

            try {
                const conversationHistory = history
                    .filter((h) => h.type === "command" || (h.type === "output" && h.text))
                    .slice(-8)
                    .map((h) => ({ role: h.type === "command" ? "user" : "assistant", content: h.text }));

                const response = await fetch(API_URL, {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        ...(AUTH_HEADER ? { Authorization: AUTH_HEADER } : {}),
                    },
                    body: JSON.stringify({
                        question,
                        workspaceId: WORKSPACE_ID,
                        history: conversationHistory,
                    }),
                });

                if (!response.ok || !response.body) {
                    throw new Error(`Request failed (${response.status})`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const parts = buffer.split("\n\n");
                    buffer = parts.pop();

                    for (const part of parts) {
                        if (!part.startsWith("data: ")) continue;
                        const event = JSON.parse(part.slice(6));

                        if (event.type === "sources") {
                            updateLastOutput(() => ({ sources: event.data }));
                        } else if (event.type === "token") {
                            updateLastOutput((line) => ({ text: (line.text || "") + event.data }));
                        } else if (event.type === "error") {
                            updateLastOutput(() => ({ text: "Something went wrong. Please try again.", isError: true }));
                        }
                    }
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    updateLastOutput(() => ({ text: "Connection failed. Is the API running?", isError: true }));
                }
            } finally {
                setIsStreaming(false);
                inputRef.current?.focus();
            }
        },
        [isStreaming, history],
    );

    const handleCancel = () => {
        abortRef.current?.abort();
        updateLastOutput((line) => ({
            text: (line.text || "") + (line.text ? "\n" : "") + "[cancelled]",
        }));
        setIsStreaming(false);
        inputRef.current?.focus();
    };

    return (
        <div className={`terminal ${className}`} style={{ height: `${open ? 420 : 32}px` }}>
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="red" />
                    <span className="yellow" onClick={() => setOpen(false)} />
                    <span className="green" onClick={() => setOpen(true)} />
                </div>
                <div className="terminal-title">{title} - bash</div>
            </div>

            {open && <div className="terminal-body" ref={bodyRef}>
                {history.map((line, i) => (
                    <TerminalLine key={i} line={line} />
                ))}

                {!isStreaming && (
                    <div className="quick-commands">
                        {QUICK_COMMANDS.map((cmd) => (
                            <button
                                key={cmd.label}
                                type="button"
                                className="quick-command"
                                onClick={() => askQuestion(cmd.question)}
                            >
                                --{cmd.label}
                            </button>
                        ))}
                    </div>
                )}

                <form className="line input-line">
                    <span className="prompt">loc@portfolio:~$</span>
                    {isStreaming ? (
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            cancel
                        </button>
                    ) : (
                        <span className="cursor" />
                    )}
                </form>
            </div>}
        </div>
    );
}

function TerminalLine({ line }) {
    if (line.type === "command") {
        return (
            <div className="line">
                <span className="prompt">loc@portfolio:~$</span>
                <span className="command">{line.text}</span>
            </div>
        );
    }

    return (
        <div className={`output${line.isError ? " output-error" : ""}`}>
            {line.text || <span className="typing-dots" />}
            {line.sources && line.sources.length > 0 && (
                <div className="sources">
                    {line.sources.map((s, i) => (
                        <span key={i} className="source-tag">
                            [{s.index}] {s.title}
                            {s.page ? ` p.${s.page}${s.pageEnd && s.pageEnd !== s.page ? `-${s.pageEnd}` : ""}` : ""}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}