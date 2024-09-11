import {GithubOutlined, HomeOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import IconButton from "../../atoms/Button/IconButton";
import {Context} from "../../../Context";
import {useContext, useState} from "react";
import './Header.scss';
import {Link} from "react-router-dom";

export default function MainHeader(props) {
    const {theme, toggleTheme} = useContext(Context);
    const [isClickBar, setIsClickBar] = useState(false);
    const [barsState] = useState([`CloseLHead`, `OpenLHeadOne`, `CloseLHead`, `OpenLHeadTwo`]);

    const toggleMenu = () => {
        setIsClickBar(!isClickBar);
    };

    const path = [
        {
            icon: <HomeOutlined/>,
            title: "Home",
            link: `/`,
        },
        {
            title: "Projects",
            link: `/projects`,
        },
        {
            title: "Skill",
            link: `/skill`,
        },
        {
            title: "About",
            link: `/about`,
        },
        {
            title: "Resume",
            link: `/resume`,
        },
        {
            icon: <GithubOutlined/>,
            title: 'Github',
            link: `https://github.com/locnguyen2k2`,
        }
    ]

    return (
        <div id={'heading'}>
            <div className={`model ${isClickBar ? 'open' : ''}`}></div>
            <div className={"left"}>
                <span className={'logo'}>LOCNGUYEN</span>
            </div>
            <div className={"center"}>
                <ul>
                    {path.map((item, index) => (
                        <li key={index}>
                            <Link to={`${item.link}`}><span>{item.icon && item.icon} {item?.title && item.title}</span></Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"right"}>
                <IconButton handleAction={() => toggleTheme()}
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
                                    <Link
                                        to={`${item.link}`}><span>{item.icon && item.icon} {item?.title && item.title}</span></Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}