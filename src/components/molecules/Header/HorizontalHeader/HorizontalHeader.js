import {GithubOutlined, HeartOutlined, HomeOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import IconButton from "../../../atoms/Button/IconButton";
import {Context} from "../../../../Context";
import {useContext} from "react";
import './HorizontalHeader.scss';
import {Link} from "react-router-dom";

export default function HorizontalHeader(props) {
    const {theme, toggleTheme} = useContext(Context);
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
                <IconButton handleAction={() => toggleTheme()} icon={theme === 'dark' ? <SunOutlined/> : <MoonOutlined/>}/>
            </div>
        </div>
    )
}