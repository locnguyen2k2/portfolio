import './Project.scss'
import CardList from "../../organisms/List/CardList";
import {useTranslation} from "react-i18next";
import {VerticalLeftOutlined, VerticalRightOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function Project(props) {
    const {t} = useTranslation();
    const [trans, setTrans] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const data = [{
        title: t('projects.ems.name'),
        body: t('projects.ems.body'),
        image: 'ems.jpg',
        link: 'https://exam-management-system-z76m.onrender.com/graphql',
        github: 'https://github.com/locnguyen2k2/exam-management-system/',
        tags: ['nestjs', 'mongodb', 'graphql', 'typescript']
    }, {
        title: t('projects.lms.name'),
        body: t('projects.lms.body'),
        github: 'https://github.com/locnguyen2k2/laboratory-management-system',
        link: 'https://laboratory-management-system.onrender.com/apis',
        image: 'labs.jpg',
        tags: ['nestjs', 'mysql', 'swagger']
    }, {
        title: t('projects.lmsApp.name'),
        body: t('projects.lmsApp.body'),
        github: 'https://github.com/locnguyen2k2/laboratory-management-application',
        image: 'labs-app.jpg',
        tags: ['react-native', 'axios'],
    }, {
        title: t('projects.hiCoffeePos.name'),
        body: t('projects.hiCoffeePos.body'),
        image: 'hicoffee-management.jpg',
        link: '',
        github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
        tags: ['core-php', 'mvc', 'axios', 'bootstrap5', 'html', 'css', 'javascript'],
    }, {
        title: t('projects.hiCoffeeApp.name'),
        body: t('projects.hiCoffeeApp.body'),
        github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
        link: '',
        image: 'hicoffee-mobile.jpg',
        tags: ['react-native', 'axios']
    }]

    const onNext = () => {
        let slide = (currentSlide < data.length - 1) ? currentSlide + 1 : 0;
        setTrans(`-${slide * 5}00px`);
        setCurrentSlide(slide);
    }

    const onPrev = () => {
        let slide = (currentSlide >= 0) ? currentSlide - 1 : data.length - 1;
        setTrans(`-${(slide < 0 ? data.length - 1 : slide) * 5}00px`);
        setCurrentSlide(slide);
    }

    return (<>
        <div className={`project ${props.className ? props.className : ''}`}>
            {props.className === 'slider' ? <div className={'slide-control'}>
                <VerticalRightOutlined
                    onClick={onPrev}/>
                <VerticalLeftOutlined
                    onClick={onNext}/>
            </div> : <></>}
            <CardList title={``} trans={trans} data={data}/>
        </div>
    </>)
}