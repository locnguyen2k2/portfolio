import './Project.scss'
import CardList from "../../organisms/Lists/CardList";
import {useTranslation} from "react-i18next";
import {VerticalLeftOutlined, VerticalRightOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export default function Project(props) {
    const {t} = useTranslation();
    const [trans, setTrans] = useState('');
    const [width, setWidth] = useState(500);
    const [currentSlide, setCurrentSlide] = useState(0);
    const data = props.data ? props.data : [
        {
            title: `${t('works.datech.name')}`,
            body: t('works.datech.body'),
            image: 'viet247-logo.png',
            time: `${t('works.datech.time')}`,
            link: 'https://viet247.vn',
            tags: ['React', 'JavaScript', 'Ant-Design']
        },
        {
            title: t('projects.ems.name'),
            body: t('projects.ems.body'),
            image: 'ems.jpg',
            time: '08/2024 – 12/2024',
            link: 'https://exam-management-system-z76m.onrender.com/graphql',
            github: 'https://github.com/locnguyen2k2/exam-management-system/',
            tags: ['NestJS', 'MongoDB', 'Apollo-GraphQL', 'TypeScript', 'OAuth2(GoogleAPIConsole)', 'NodeMailer', 'Render']
        }, {
            title: t('projects.lms.name'),
            body: t('projects.lms.body'),
            time: '01/2024 – 07/2024',
            github: 'https://github.com/locnguyen2k2/laboratory-management-system',
            link: 'https://laboratory-management-system.onrender.com/apis',
            image: 'labs.jpg',
            tags: ['NestJS', 'MySQL', 'TypeORM', 'SwaggerAPI', 'TypeScript', 'OAuth2(GoogleAPIConsole)', 'NodeMailer', 'Render']
        }, {
            title: t('projects.hiCoffeePos.name'),
            body: t('projects.hiCoffeePos.body'),
            time: '09/2022 – 12/2023 (prj 1 - 3)',
            image: 'hicoffee-management.jpg',
            link: '',
            github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
            tags: ['Php(core - MVC)', 'JavaScript', 'Ajax', 'Axios', 'WebSocket(Ratchet)', 'Phpmailer', 'Bootstrap5', 'HTML', 'CSS'],
        }, {
            title: t('projects.hiCoffeeApp.name'),
            body: t('projects.hiCoffeeApp.body'),
            github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
            link: '',
            time: '11/2023 – 12/2023',
            image: 'hicoffee-mobile.jpg',
            tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        }, {
            title: t('projects.lmsApp.name'),
            body: t('projects.lmsApp.body'),
            github: 'https://github.com/locnguyen2k2/laboratory-management-application',
            image: 'labs-app.jpg',
            tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        }]

    const onNext = () => {
        let slide = (currentSlide < data.length - 1) ? currentSlide + 1 : 0;
        setTrans(`-${slide * width}px`);
        setCurrentSlide(slide);
    }

    const onPrev = () => {
        let slide = (currentSlide >= 0) ? currentSlide - 1 : data.length - 1;
        setTrans(`-${(slide < 0 ? data.length - 1 : slide) * width}px`);
        setCurrentSlide(slide);
    }

    const currentWidth = () => {
        if (window.innerWidth < 500) {
            setWidth(window.innerWidth);
        } else {
            setWidth(500)
        }
    }

    useEffect(() => {
        currentWidth()
        window.addEventListener('resize', () => {
            if (window.innerWidth < 500) {
                setWidth(window.innerWidth);
            } else {
                setWidth(500)
            }
        })
    }, [window.location.pathname]);

    return (<>
        <div className={`project ${props.className ? props.className : ''}`}>
            {props.className === 'slider' ? <div className={'slide-control'}>
                <VerticalRightOutlined
                    onClick={onPrev}/>
                <VerticalLeftOutlined
                    onClick={onNext}/>
            </div> : <></>}
            <CardList effect={true} title={props.data ? '' : t('projects&works')} trans={trans}
                      data={props.data ? props.data : data}/>
        </div>
    </>)
}