import Image from "../../atoms/Image/Image";
import './about.scss'
import Label from "../../atoms/Lable/Label";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {Context} from "../../../Context";

export default function About() {
    const {t} = useTranslation();
    const {language} = useContext(Context);
    return (
        <div id={'about'} className={`${language}`}>
            <div className={'welcome'}>
                <Label content={t('greeting')}/>
            </div>
            <div className={'my-self'}>
                <div className={'content'}>
                    <div className={'info'}>
                        <div>
                            <Label content={'Loc Nguyen'}/>
                            <p><i>{t('about.major')}</i></p>
                        </div>
                        <Image border={true} image={'avatar.jpg'}/>
                    </div>
                    <div>
                        <p>
                            {t('about.profile')}
                        </p>
                    </div>
                    <div className={'contact'}>
                        <Label content={'Contact'}/>
                        <p>
                            {t('about.contact')} <a
                            href={'mailto:locnguyen071102@gmail.com'}><i>Email</i></a>, <a
                            href={'https://www.linkedin.com/in/nguyen-loc-171793311/'}><i> LinkedIn</i></a>,
                            <a href={'https://www.facebook.com/nguyentanloc0711/'}><i> Facebook</i></a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}