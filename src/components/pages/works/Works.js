// import './../project/Project.scss'
// import CardList from "../../organisms/Lists/CardList";
// import { useTranslation } from "react-i18next";
// import { VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";

// export default function Works(props) {
//     const { t } = useTranslation();
//     const defaultWidth = 800
//     const [trans, setTrans] = useState('');
//     const [width, setWidth] = useState(defaultWidth);
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const data = props.data ? props.data : [
//         {
//             title: `${t('works.teknix.name')} - (${t('works.teknix.time')})`,
//             body: {
//                 role: t('works.teknix.body.role'),
//                 highlights: t('works.teknix.body.highlights', { returnObjects: true, defaultValue: [] }),
//                 projects: t('works.teknix.body.projects', { returnObjects: true, defaultValue: [] })
//             },
//             image: 'teknix.svg',
//             link: 'https://www.teknix.vn/',
//             tags: ['NetJS', 'Go', 'PostgresQL', 'Prisma', 'SwaggerAPI', 'TypeScript', 'NodeJS', 'Prometheus']
//         },
//         {
//             title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
//             body: {
//                 role: t('works.datech.body.role'),
//                 highlights: t('works.datech.body.highlights', { returnObjects: true })
//             },
//             image: 'viet247-logo.png',
//             link: 'https://viet247.vn',
//             tags: ['React', 'JavaScript']
//         }
//     ]

//     const onNext = () => {
//         let slide = (currentSlide < data.length - 1) ? currentSlide + 1 : 0;
//         setTrans(`-${slide * width}px`);
//         setCurrentSlide(slide);
//     }

//     const onPrev = () => {
//         let slide = (currentSlide >= 0) ? currentSlide - 1 : data.length - 1;
//         setTrans(`-${(slide < 0 ? data.length - 1 : slide) * width}px`);
//         setCurrentSlide(slide);
//     }

//     const currentWidth = () => {
//         if (window.innerWidth < defaultWidth) {
//             setWidth(window.innerWidth);
//         } else {
//             setWidth(defaultWidth)
//         }
//     }

//     useEffect(() => {
//         currentWidth()
//         window.addEventListener('resize', () => {
//             if (window.innerWidth < defaultWidth) {
//                 setWidth(window.innerWidth);
//             } else {
//                 setWidth(defaultWidth)
//             }
//         })
//     }, []);

//     return (<>
//         <div className={`project ${props.className ? props.className : ''} works`}>
//             {props.className === 'slider' ? <div className={'slide-control'}>
//                 <VerticalRightOutlined
//                     onClick={onPrev} />
//                 <VerticalLeftOutlined
//                     onClick={onNext} />
//             </div> : <></>}
//             <CardList effect={true} title={``} trans={trans} data={props.data ? props.data : data} />
//         </div>
//     </>)
// }