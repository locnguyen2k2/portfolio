import Image from "../../atoms/Image/Image";
import './about.scss'
import Label from "../../atoms/Lable/Label";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../../Context";

export default function About() {
    const { t } = useTranslation();
    const { language } = useContext(Context);

    return (
        <div id={'about'} className={`${language}`} style={{ backdropFilter: 'blur(0.4px)' }}>
            <div className={'welcome fade-effect'}>
                <Label content={t('greeting')} />
            </div>
            <div className={"quote"} style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <p style={{
                    maxWidth: "500px"
                }}>
                    “Try and leave this world a little better than you found it, and when your turn comes to die you can
                    die happy in feeling that at any rate you have not wasted your time but have done your best.”
                    <br /><u><i style={{ fontSize: "0.9rem" }}>Robert Baden-Powell</i></u>
                </p>
            </div>
            <div className={'my-self'}>
                <div className={'content'}>
                    <div className={'info'}>
                        <div className={'fade-effect'}>
                            <Label content={'Loc Nguyen'} />
                            <p><i>{t('about.major')} - BE(1yoe) | FE(1yoe)</i></p>
                        </div>
                        <Image style={{
                            width: '205px',
                            height: '229px'
                        }} blur={true} />
                    </div>
                    <p className={'fade-effect'}>
                        {t('about.profile')}
                    </p>
                    <div>
                        <div className={'fade-effect'}>
                            <Label content={'BIO'} />
                            <p><i>{t('about.bio')}</i></p>
                        </div>
                    </div>
                    <ul>
                        <li><p><b>2002</b> - {t('about.2002')}</p></li>
                        <li><p><b>2024</b> - {t('about.2024_1')}</p></li>
                        <li><p><b>2024</b> - {t('about.2024_2')}</p></li>
                        <li><p><b>2025</b> - {t('about.2025')}</p></li>
                    </ul>
                    <div className={'fade-effect'}>
                        <Label content={'I ♥'} />
                    </div>
                    <p>
                        Coffee, Music, Photography, Movies, Traveling
                    </p>
                    <div className={'fade-effect'}>
                        <Label content={t('about.title.contact')} />
                    </div>
                    <div className={'fade-effect'} style={{ display: 'flex' }}>
                        <p><a href={'mailto:locnguyen071102@gmail.com'}>Email</a></p>
                        <p><a href={'https://www.linkedin.com/in/loc-nguyen-171793311/'}> LinkedIn</a></p>
                        <p><a href={'https://www.facebook.com/nguyentanloc0711/'}> Facebook</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
