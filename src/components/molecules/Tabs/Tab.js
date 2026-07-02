import {
    CloseOutlined
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "./tab.scss";
import { sidebarIcons } from "../Sidebar/Sidebar";
import { Icon } from "@iconify/react";

export default function Tab({
    tabs,
    fileActiveOn,
    navigateTo,
    onClose
}) {
    const { t } = useTranslation();
    const expandedTabs = tabs.flatMap(tab =>
        tab.root ? tab.children : [tab]
    );

    const tabsRef = useRef(null);
    const tabRefs = useRef({});

    const [indicator, setIndicator] = useState({
        left: 0,
        width: 0,
    });

    useEffect(() => {
        const activeTab = tabRefs.current[fileActiveOn];
        const container = tabsRef.current;

        if (!activeTab || !container) return;

        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        setIndicator({
            left:
                tabRect.left -
                containerRect.left +
                container.scrollLeft,
            width: tabRect.width,
        });
    }, [fileActiveOn]);

    return (
        <div className="tabs" ref={tabsRef}>
            <div
                className="tab-indicator"
                style={{
                    width: indicator.width,
                    transform: `translateX(${indicator.left}px)`,
                }}
            />

            {expandedTabs.map(tab => (
                <div
                    key={tab.tab}
                    ref={(el) => (tabRefs.current[tab.tab] = el)}
                    data-goto={tab.tab}
                    className={`tab ${fileActiveOn === tab.tab ? "on" : ""
                        }`}
                    onClick={() => navigateTo(tab.tab)}
                >
                    <div className="tab-left">
                        <span className="tab-icon">
                            {sidebarIcons[tab.prefix]}
                        </span>

                        <span className="tab-title">
                            {t(tab.title)}
                        </span>
                    </div>

                    <button
                        className="tab-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose?.(tab.tab);
                        }}
                    >
                        <CloseOutlined />
                    </button>
                </div>
            ))}
            <div
                className={`tab`}
                onClick={() => {
                    const link = document.createElement("a");
                    link.href = `https://locnguyen2k2-portfolio.vercel.app/static/media/${process.env.REACT_APP_RESUME_FILENAME}.pdf`;
                    link.download = "CV_LOCNGUYEN2k2_2026.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
            >
                <div className="tab-left">
                    <span className="tab-icon">
                        <Icon icon="material-symbols:download" />
                    </span>

                    <span className="tab-title">
                        Resume
                    </span>
                </div>

                <button
                    className="tab-close"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <CloseOutlined />
                </button>
            </div>
        </div>
    );
}