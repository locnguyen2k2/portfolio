import Image from "../../atoms/Image/Image";
import './about.scss'
import Label from "../../atoms/Lable/Label";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {Context} from "../../../Context";
import CustomInput from "../../atoms/Input/Input";
import IconButton from "../../atoms/Button/IconButton";
import axios from "axios";

export default function About() {
    const {t} = useTranslation();
    const {language} = useContext(Context);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");

    async function sendEmail() {
        alert(t('mailer.sending'))
        axios.post('https://laboratory-management-system.onrender.com/apis/feed-back', {
            from: email,
            content: content,
            key: process.env.REACT_APP_MAILER_PASSWORD
        }).then((result) => {
            alert(t('mailer.success'))
        }).catch(() => alert(t('mailer.failed'))).finally(() => {
            setContent("");
            setEmail("");
            setName("");
        })
    }

    const onSubmit = async () => {
        await sendEmail()
    }

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
                        <Label content={t('about.title.contact')}/>
                        <p>
                            {t('about.contact')} <a
                            href={'mailto:locnguyen071102@gmail.com'}><i>Email</i></a>, <a
                            href={'https://www.linkedin.com/in/nguyen-loc-171793311/'}><i> LinkedIn</i></a>,
                            <a href={'https://www.facebook.com/nguyentanloc0711/'}><i> Facebook</i></a>.
                        </p>
                    </div>
                    <div>
                        <Label content={t('about.title.feedback')}/>
                        <div className={'feedback-info'}>
                            <CustomInput value={name} onChange={(e) => setName(e.target.value)} width={'100%'} lines={3}
                                         title={t('mailer.name')} type={'text'}/>
                            <CustomInput value={email} onChange={(e) => setEmail(e.target.value)} width={'100%'}
                                         lines={3}
                                         title={t('mailer.email')} type={'email'}/>
                        </div>
                        <CustomInput value={content} onChange={(e) => setContent(e.target.value)} width={'100%'}
                                     lines={10} title={t('mailer.content')} type={'textarea'}/>
                        <IconButton border={true} width={100} height={'max-content'}
                                    handleAction={onSubmit}
                                    icon={<p style={{padding: 0, textAlign: 'center', fontSize: 'small'}}>Send</p>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
