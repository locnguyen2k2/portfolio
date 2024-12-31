import {GithubOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import IconButton from "../../atoms/Button/IconButton";
import {Context} from "../../../Context";
import {useContext, useEffect, useState} from "react";
import './Header.scss';
import {Link} from "react-router-dom";
import Image from "../../atoms/Image/Image";
import {languages} from "../../../i18n";
import {useTranslation} from "react-i18next";

export default function MainHeader({...props}) {
    const {t} = useTranslation();
    const {theme, language, toggleTheme, toggleLanguage} = useContext(Context);
    const [isClickBar, setIsClickBar] = useState(false);
    const [isActiveTab, setIsActiveTab] = useState('/');
    const [barsState] = useState([`CloseLHead`, `OpenLHeadOne`, `CloseLHead`, `OpenLHeadTwo`]);

    const toggleMenu = () => {
        setIsClickBar(!isClickBar);
    };

    const path = [
        {
            title: "Projects",
            name: "projects",
            link: `/projects`,
        },
        {
            title: "Skill",
            name: "skill",
            link: `/skill`,
        },
        {
            title: "About",
            name: "about",
            link: `/about`,
        },
        {
            title: "Resume",
            name: "resume",
        },
        {
            title: "Source",
            icon: <GithubOutlined/>,
            link: `https://github.com/locnguyen2k2`,
        }
    ]

    useEffect(() => {
        props.currentRoute && setIsActiveTab(props.currentRoute);
    }, [props.currentRoute, language]);

    window.addEventListener('resize', () => {
        setIsClickBar(false)
    });

    return (
        <div id={'heading'} className={`${language}`}>
            <div className={`model ${isClickBar ? 'open' : ''}`}></div>
            <div className={"left"}>
                <Link className={`logo`}
                      to={`/`}>
                    <span>LOCNGUYEN</span>
                </Link>
            </div>
            <div className={"center"}>
                <ul>
                    {path.map((item, index) => (
                        <li key={index}>
                            {
                                item?.link ?
                                    <Link className={`${isActiveTab === item.link ? 'active' : ''}`}
                                          to={`${item.link}`}><span>{item.icon && item.icon} {item?.name && t(`navigation.${item.name}`)}</span></Link>
                                    :
                                    // eslint-disable-next-line
                                    <a onClick={() => window.open('https://locnguyen2k2-portfolio.vercel.app/static/media/LOCNGUYEN_CV.1.0.70af7e819142a0491bc4.pdf')}>
                                        <span>{item.icon && item.icon} {item?.name && t(`navigation.${item.name}`)}</span>
                                    </a>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"right"}>
                <div className={'image'}>
                    <span className={'label'}
                          style={{display: 'flex', alignItems: 'center'}}>{languages[language]?.name}</span>
                    <IconButton width={35} height={35} handleAction={() => toggleLanguage()}
                                icon={
                                    <Image style={{width: '100%', height: '100%'}}
                                           image={languages[language]?.flag || 'vn_flag.png'}/>}/>
                </div>
                <IconButton width={35} height={35} handleAction={() => toggleTheme()}
                            icon={theme === 'dark' ? <SunOutlined/> : <MoonOutlined/>}/>

                <div className={`mobile-menu`} onClick={toggleMenu}>
                    <div className="bars">
                        {barsState.map((isActive, index) => (
                            <span
                                key={index}
                                className={`bar ${isClickBar ? isActive : ''}`}
                            ></span>
                        ))}
                    </div>

                    <div className={'menu'}>
                        <ul className={`${isClickBar ? 'open' : ''}`}>
                            {path.map((item, index) => (
                                <li key={index}>
                                    {
                                        item?.link ?
                                            <Link className={`${isActiveTab === item.link ? 'active' : ''}`}
                                                  to={`${item.link}`}><span>{item.icon && item.icon} {item?.name && t(`navigation.${item.name}`)}</span></Link>
                                            :
                                            // eslint-disable-next-line
                                            <a onClick={() => window.open('https://locnguyen2k2-portfolio.vercel.app/static/media/LOCNGUYEN_CV.1.0.70af7e819142a0491bc4.pdf')}>
                                                <span>{item.icon && item.icon} {item?.name && t(`navigation.${item.name}`)}</span>
                                            </a>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}