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
import { pdfjs } from "react-pdf";
import { DraggableForm } from './../Forms/Draggable.js'
import Tab from './../Tabs/Tab.js';
import Breadcrumb from './../Breadcrumbs/Breadcrumb.js';
import Image from '../../atoms/Image/Image.js';


import './Sidebar.scss';
import { useTranslation } from 'react-i18next';
import PDFPreview from '../Preview/PDFPreview.js';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();
export const sidebarIcons = {
    js: <Icon icon="material-icon-theme:javascript" />,
    ts: <Icon icon="material-icon-theme:typescript" />,
    json: <Icon icon="material-icon-theme:json" />,
    graphql: <Icon icon="material-icon-theme:graphql" />,
    html: <Icon icon="material-icon-theme:html" />,
    md: <Icon icon="material-icon-theme:markdown" />,
    bash: <Icon icon="catppuccin:bash" />,
    docker: <Icon icon="material-icon-theme:docker" />,
    pdf: <Icon icon="material-icon-theme:pdf" />,
};
export default function Sidebar({ tabs, fileActiveOn, navigateTo, isOpenSidebar, setOpenSidebar }) {
    const [activeOn, setActiveOn] = useState('explorer');
    const [indicatorTop, setIndicatorTop] = useState(0);
    const [openResume, setOpenResume] = useState(false);
    const { t } = useTranslation();
    const treeRef = useRef(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

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
            <div key={1} className="activity"
                style={{ zIndex: 2, }}
            >
                <div
                    className={`act ${activeOn === 'explorer' ? 'on' : ''}`}
                    onClick={() => { setActiveOn('explorer'); setOpenSidebar(!isOpenSidebar) }}
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

            <div key={2} className="sidebar" style={{
                ...(!isOpenSidebar ? {
                    left: '-144px',
                    opacity: 0,
                } : { left: '56px', opacity: 1 }),
                transition: 'ease-in-out 0.3s',
                transitionBehavior: 'left',
            }}>

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
                        <div
                            className={`file`}
                            onClick={() => setOpenResume(true)}
                        >
                            <span>{sidebarIcons['pdf']}</span>
                            <div className="file-name">resume.pdf</div>
                        </div>
                    </div>


                    <div className="folder">
                        <span>
                            <CaretDownFilled />
                        </span>

                        <div className="folder-name">
                            Docsaurus
                        </div>
                    </div>

                    <div className="nested">
                        <div className={`file`} onClick={() => window.open('https://cjool117-docusaurus.vercel.app/docs/category/backend')}>
                            <span>{sidebarIcons['docker']}</span>
                            <div className="file-name">Dockerfile</div>
                        </div>
                    </div>
                </div>
            </div >
            <Breadcrumb tabs={tabs} fileActiveOn={fileActiveOn} navigateTo={navigateTo} isOpenSidebar={isOpenSidebar} />

            <Tab tabs={tabs} fileActiveOn={fileActiveOn} navigateTo={navigateTo} isOpenSidebar={isOpenSidebar} />

            {openResume && (
                <DraggableForm startAt={'center'} onClose={() => setOpenResume(false)} children={<PDFPreview />} />
            )}
        </>
    );
}