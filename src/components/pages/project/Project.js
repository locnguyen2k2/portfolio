import './Project.scss'
import Card from "../../molecules/Card/Card";
import Label from "../../atoms/Lable/Label";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef, useMemo } from "react";

export default function Project(props) {
    const { t } = useTranslation();
    const timelineRef = useRef(null);

    const data = useMemo(() => props.data ? props.data : [
        {
            title: t('projects.abacNestjs.name'),
            body: t('projects.abacNestjs.body'),
            github: 'https://github.com/locnguyen2k2/ddd-nest-template',
            image: 'abac-nestjs.jpg',
            time: '04/2026 - Present',
            link: 'https://cjool-admin-dashboard.vercel.app/',
            tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'RabbitMQ', 'DDD', 'Krakend', 'ABAC'],
            id: 'ddd-dashboard'
        },
        {
            title: `${t('works.teknix.name')}`,
            body: {
                role: t('works.teknix.body.role'),
                highlights: t('works.teknix.body.highlights', { returnObjects: true, defaultValue: [] }),
                projects: t('works.teknix.body.projects', { returnObjects: true, defaultValue: [] })
            },
            image: 'teknix.svg',
            time: `${t('works.teknix.time')}`,
            // link: 'https://www.teknix.vn/',
            tags: ['NestJS', 'NodeJS', 'SwaggerAPI', 'TypeScript', 'PostgresQL', 'Prisma', 'Go', 'Prometheus', 'Kraken', 'Grafana', 'Docker', 'Neo4j', 'Redis', 'RabbitMQ'],
            id: 'teknix'
        }, {
            title: `${t('works.datech.name')}`,
            body: {
                role: t('works.datech.body.role'),
                highlights: t('works.datech.body.highlights', { returnObjects: true, defaultValue: [] })
            },
            image: 'viet247-logo.png',
            time: `${t('works.datech.time')}`,
            // link: 'https://viet247.vn',
            tags: ['React', 'JavaScript', 'Ant-Design'],
            id: 'datech'
        },
        {
            title: t('projects.ems.name'),
            body: t('projects.ems.body'),
            image: 'ems-dashboard.png',
            time: '08/2024 – Present',
            link: 'https://cjool117-ems-system.vercel.app/',
            github: 'https://github.com/locnguyen2k2/exam-management-system/',
            tags: ['NestJS', 'MongoDB', 'Apollo-GraphQL', 'TypeScript', 'OAuth2(GoogleAPIConsole)', 'NodeMailer', 'Render', 'NextJS', 'TypeScript', 'React', 'Ant Design', 'Atomic'],
            id: 'ems'
        }, {
            title: t('projects.lms.name'),
            body: t('projects.lms.body'),
            time: '01/2024 – 07/2024',
            github: 'https://github.com/locnguyen2k2/laboratory-management-system',
            link: 'https://laboratory-management-system.onrender.com/apis',
            image: 'labs.jpg',
            tags: ['NestJS', 'MySQL', 'TypeORM', 'SwaggerAPI', 'TypeScript', 'OAuth2(GoogleAPIConsole)', 'NodeMailer', 'Render'],
            id: 'lms'
        },
        // {
        //     title: t('projects.hiCoffeePos.name'),
        //     body: t('projects.hiCoffeePos.body'),
        //     time: '09/2022 – 12/2023',
        //     image: 'hicoffee-management.jpg',
        //     link: '',
        //     github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
        //     tags: ['Php', 'JavaScript', 'Ajax', 'Axios', 'WebSocket', 'Phpmailer', 'Bootstrap5', 'HTML', 'CSS'],
        // },
        // {
        //     title: t('projects.hiCoffeeApp.name'),
        //     body: t('projects.hiCoffeeApp.body'),
        //     github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
        //     link: '',
        //     time: '11/2023 – 12/2023',
        //     image: 'hicoffee-mobile.jpg',
        //     tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        // }, {
        //     title: t('projects.lmsApp.name'),
        //     body: t('projects.lmsApp.body'),
        //     github: 'https://github.com/locnguyen2k2/laboratory-management-application',
        //     image: 'labs-app.jpg',
        //     time: '01/2024',
        //     tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        // },
    ], [props.data, t]);

    const getYear = (timeStr) => {
        const years = timeStr.match(/\d{4}/g);
        return years ? years[years.length - 1] : 'Present';
    };

    const groupedData = useMemo(() => data.reduce((acc, item) => {
        const year = getYear(item.time);
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {}), [data]);

    const sortedYears = useMemo(() => Object.keys(groupedData).sort((a, b) => b - a), [groupedData]);


    useEffect(() => {
        const container = document.querySelector('.container');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                root: container,
                rootMargin: '10% 0px 10% 0px'
            }
        );

        const updateObserver = () => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item) => {
                observer.observe(item);
                // Trigger visibility for items already in view
                const rect = item.getBoundingClientRect();
                const containerRect = container ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
                if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
                    item.classList.add('visible');
                }
            });
        };

        const timer = setTimeout(updateObserver, 200);

        return () => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item) => observer.unobserve(item));
            clearTimeout(timer);
        };
    }, [data, sortedYears]);

    return (
        <div className={`project-page ${props.className ? props.className : ''}`} >
            <i id="ddd-dashboard" style={{ fontSize: "0.9rem" }}>// {t('projects.description')}</i>
            <div style={{ display: "flex", alignItems: "center" }}> <span className={'tag'}>&lt;h1&gt;</span><Label content={t('projects&works')} /><span className={'tag'}>&lt;/h1&gt;</span></div>

            <div className="timeline-container" ref={timelineRef}>
                <div className="timeline-axis"></div>

                {sortedYears.map((year, yearIndex) => (
                    <div key={year} className="year-section">
                        <div className="year-marker">
                            <span>{year}</span>
                        </div>

                        {groupedData[year].map((item, index) => (
                            <div key={`${year}-${index}`} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <Card {...item} id={item.id === data[0].id ? "" : item?.id} blur={true} borderColor={true} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}