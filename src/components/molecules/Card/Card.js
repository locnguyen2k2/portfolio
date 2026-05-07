import './Card.scss'
import React, { useRef, useEffect, useState } from 'react';
import Image from "../../atoms/Image/Image";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Label from "../../atoms/Lable/Label";
import IconButton from "../../atoms/Button/IconButton";

export default function Card(props) {
    const cardRef = useRef(null);
    const [randomColor] = useState(() => {
        const colors = ['#3178C6', '#F7DF1E', '#0170FE', '#7A86B8', '#da2640', '#E34F26', '#1572B6', '#06B6D4', '#4479A1', '#00ed64', '#e10098', '#FF6600', '#5A29E4', '#38B832', '#FF6C37', '#fc6d26'];
        return colors[Math.floor(Math.random() * colors.length)];
    });

    useEffect(() => {
        const updatePos = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                cardRef.current.style.setProperty('--card-left', `${rect.left}px`);
                cardRef.current.style.setProperty('--card-top', `${rect.top}px`);
            }
            requestAnimationFrame(updatePos);
        };
        const id = requestAnimationFrame(updatePos);
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`card ${props.className ? props.className : ""}`}
            ref={cardRef}
            style={{
                ...(props.style && props.style),
                ...(props?.blur && { backdropFilter: 'blur(3px)' }),
                ...(props?.borderColor && {
                    '--card-color': randomColor
                })
            }}
        >
            {
                props?.borderColor && (
                    <div className="card-border"></div>
                )
            }
            <div className="card-header fade-effect"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {props.image && <Image image={props.image} />}
                {props.time && <h3><i>{props.time}</i></h3>}
            </div>
            <div className="card-body fade-effect">
                {
                    props?.title && <Label content={props.title} />
                }
                {
                    typeof props.body === 'string' || props.body == null
                        ? <p className={'body'}>{props.body}</p>
                        : typeof props.body === 'object' && props.body.type
                            ? <div className={'body body-structured'}>{props.body}</div>
                            : <div className={'body body-structured'}>
                                {props.body?.role && <p className={'body-role'}>{props.body.role}</p>}
                                {Array.isArray(props.body?.highlights) && props.body.highlights.length > 0 && (
                                    <ul className={'body-highlights'}>
                                        {props.body.highlights.map((text, idx) => (
                                            <li key={idx}><p>{text}</p></li>
                                        ))}
                                    </ul>
                                )}

                                {Array.isArray(props.body?.projects) && props.body.projects.length > 0 && (
                                    <div className={'body-projects'}>
                                        {props.body.projects.map((project, projectIdx) => (
                                            <div className={'body-project'} key={projectIdx}>
                                                {project?.title && <p className={'body-project-title'}>{project.title}</p>}
                                                {project?.summary && <p className={'body-project-summary'}>{project.summary}</p>}
                                                {project?.technologies && <p className={'body-project-tech'}><b>Technologies:</b> {project.technologies}</p>}

                                                {Array.isArray(project?.responsibilities) && project.responsibilities.length > 0 && (
                                                    <>
                                                        <p className={'body-project-resp-title'}><b>Responsibility:</b></p>
                                                        <ul className={'body-project-resp'}>
                                                            {project.responsibilities.map((text, respIdx) => (
                                                                <li key={respIdx}><p>{text}</p></li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                }
                <div className="card-footer">
                    <div className={'tags'}>
                        {props?.tags && props.tags.map((tag, key) => {
                            return (
                                <IconButton
                                    key={key}
                                    style={{
                                        margin: '0 3px',
                                        padding: '3px 5px',
                                    }}
                                    icon={<a href='#'>#{tag}</a>}
                                    handleAction={() => {
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div className={'links'}>
                        {props.github &&
                            <IconButton
                                hover={true}
                                style={{
                                    margin: '0 3px',
                                    padding: '3px 5px'
                                }}
                                border={true}
                                icon={<a href={`${props.github}`}><GithubOutlined /> Github</a>}
                                handleAction={() => {
                                }}
                            />}
                        {props.link &&
                            <IconButton
                                hover={true}
                                style={{
                                    margin: '0 3px',
                                    padding: '3px 5px'
                                }}
                                border={true}
                                icon={<a href={`${props.link}`}><LinkOutlined /> Demo</a>}
                                handleAction={() => {
                                }}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}