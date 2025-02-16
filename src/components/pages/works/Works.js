import './../project/Project.scss'
import CardList from "../../organisms/Lists/CardList";
import {useTranslation} from "react-i18next";
import {VerticalLeftOutlined, VerticalRightOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export default function Works(props) {
    const {t} = useTranslation();
    const [trans, setTrans] = useState('');
    const [width, setWidth] = useState(500);
    const [currentSlide, setCurrentSlide] = useState(0);
    const data = props.data ? props.data : [{
        title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
        body: t('works.datech.body'),
        image: 'viet247-logo.png',
        link: 'https://viet247.vn',
        tags: ['React', 'JavaScript']
    },
        {
            title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
            body: t('works.datech.body'),
            image: 'viet247-logo.png',
            link: 'https://viet247.vn',
            tags: ['React', 'JavaScript']
        },
        {
            title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
            body: t('works.datech.body'),
            image: 'viet247-logo.png',
            link: 'https://viet247.vn',
            tags: ['React', 'JavaScript']
        },
        {
            title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
            body: t('works.datech.body'),
            image: 'viet247-logo.png',
            link: 'https://viet247.vn',
            tags: ['React', 'JavaScript']
        },
        {
            title: `${t('works.datech.name')} - (${t('works.datech.time')})`,
            body: t('works.datech.body'),
            image: 'viet247-logo.png',
            link: 'https://viet247.vn',
            tags: ['React', 'JavaScript']
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
    }, []);

    return (<>
        <div className={`project ${props.className ? props.className : ''}`}>
            {props.className === 'slider' ? <div className={'slide-control'}>
                <VerticalRightOutlined
                    onClick={onPrev}/>
                <VerticalLeftOutlined
                    onClick={onNext}/>
            </div> : <></>}
            <CardList effect={true} title={``} trans={trans} data={props.data ? props.data : data}/>
        </div>
    </>)
}