import React, { useRef, useState, useEffect } from 'react';
import {
    AppstoreAddOutlined,
    BranchesOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    SoundOutlined,
    CaretDownFilled,
} from '@ant-design/icons';
import { Icon } from "@iconify/react";


import './Sidebar.scss';
import { useTranslation } from 'react-i18next';

export const sidebarIcons = {
    js: <Icon icon="material-icon-theme:javascript" />,
    ts: <Icon icon="material-icon-theme:typescript" />,
    json: <Icon icon="material-icon-theme:json" />,
    graphql: <Icon icon="material-icon-theme:graphql" />,
    html: <Icon icon="material-icon-theme:html" />,
    md: <Icon icon="material-icon-theme:markdown" />,
    bash: <Icon icon="catppuccin:bash" />,
};
export default function Sidebar({ tabs, fileActiveOn, navigateTo }) {
    const [activeOn, setActiveOn] = useState('explorer');
    const [indicatorTop, setIndicatorTop] = useState(0);
    const { t } = useTranslation();

    const treeRef = useRef(null);

    const handleFileClick = (file) => (e) => {
        navigateTo(file);

        if (!treeRef.current) return;

        const treeRect = treeRef.current.getBoundingClientRect();
        const fileRect = e.currentTarget.getBoundingClientRect();

        setIndicatorTop(fileRect.top - treeRect.top);
    };

    useEffect(() => {
        if (!treeRef.current) return;
        const activeFile = treeRef.current.querySelector('.file.active');
        if (activeFile) {
            const treeRect = treeRef.current.getBoundingClientRect();
            const fileRect = activeFile.getBoundingClientRect();

            setIndicatorTop(fileRect.top - treeRect.top);
        }
    }, [fileActiveOn, tabs]);

    return (
        <>
            <div key={1} className="activity">
                <div
                    className={`act ${activeOn === 'explorer' ? 'on' : ''}`}
                    onClick={() => setActiveOn('explorer')}
                >
                    <MenuFoldOutlined />
                </div>

                <div
                    className={`act ${activeOn === 'search' ? 'on' : ''}`}
                    onClick={() => setActiveOn('search')}
                >
                    <SearchOutlined />
                </div>

                <div
                    className={`act ${activeOn === 'source-control' ? 'on' : ''}`}
                    onClick={() => setActiveOn('source-control')}
                >
                    <BranchesOutlined />
                </div>

                <div
                    className={`act ${activeOn === 'extensions' ? 'on' : ''}`}
                    onClick={() => setActiveOn('extensions')}
                >
                    <AppstoreAddOutlined />
                </div>

                <div className="grow" />

                <div
                    className={`act ${activeOn === 'account' ? 'on' : ''}`}
                    onClick={() => setActiveOn('account')}
                >
                    <SoundOutlined />
                </div>
            </div>

            <div key={2} className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-header-title">
                        Explorer
                    </div>
                </div>

                <div className="tree" ref={treeRef}>
                    <div
                        className="active-indicator"
                        style={{
                            transform: `translateY(${indicatorTop}px)`
                        }}
                    />

                    <div className="folder">
                        <span>
                            <CaretDownFilled />
                        </span>

                        <div className="folder-name">
                            Portfolio
                        </div>
                    </div>

                    <div className="nested">
                        {
                            tabs.map((tab, index) => {
                                return (
                                    !tab?.root ?
                                        <div
                                            key={index}
                                            className={`file ${fileActiveOn === tab.tab ? 'active' : ''}`}
                                            onClick={handleFileClick(tab.tab)}
                                        >
                                            <span>{sidebarIcons[tab.prefix]}</span>
                                            <div className="file-name">{t(tab.title).toLocaleLowerCase().replaceAll(' ', '')}.{tab.prefix}</div>
                                        </div>
                                        : <div key={index}>
                                            <div className="folder">
                                                <span><CaretDownFilled /></span>
                                                <div className="folder-name">
                                                    {t(tab.root).toLocaleLowerCase().replaceAll(' ', '')}
                                                </div>
                                            </div>
                                            <div className="nested">
                                                {
                                                    tab.children.map((child, childIndex) => {
                                                        return (
                                                            <div
                                                                key={childIndex + index}
                                                                className={`file ${fileActiveOn === child.tab ? 'active' : ''}`}
                                                                onClick={handleFileClick(child.tab)}
                                                            >
                                                                <span>{sidebarIcons[child.prefix]}</span>
                                                                <div className="file-name">{t(child.title).toLocaleLowerCase().replaceAll(' ', '')}.{child.prefix}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}