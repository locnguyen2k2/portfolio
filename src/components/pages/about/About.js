import Image from "../../atoms/Image/Image";
import './about.scss'
import Label from "../../atoms/Lable/Label";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {Context} from "../../../Context";
import CustomInput from "../../atoms/Input/Input";
import IconButton from "../../atoms/Button/IconButton";
import axios from "axios";
import Project from "../project/Project";
import Works from "../works/Works";

export default function About() {
    const {t} = useTranslation();
    const {language} = useContext(Context);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");

    const projects = [
        {
            title: t('projects.ems.name'),
            body: t('projects.ems.body'),
            image: 'ems.jpg',
            link: 'https://exam-management-system-z76m.onrender.com/graphql',
            github: 'https://github.com/locnguyen2k2/exam-management-system/',
            tags: ['NestJS', 'MongoDB', 'GraphQL', 'Apollo', 'TypeScript']
        }, {
            title: t('projects.lms.name'),
            body: t('projects.lms.body'),
            github: 'https://github.com/locnguyen2k2/laboratory-management-system',
            link: 'https://laboratory-management-system.onrender.com/apis',
            image: 'labs.jpg',
            tags: ['NestJS', 'MySQL', 'TypeORM', 'SwaggerAPI', 'TypeScript']
        }, {
            title: t('projects.hiCoffeePos.name'),
            body: t('projects.hiCoffeePos.body'),
            image: 'hicoffee-management.jpg',
            link: '',
            github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
            tags: ['Php(core - MVC)', 'JavaScript', 'Ajax', 'Axios', 'WebSocket(Ratchet)', 'Phpmailer', 'Bootstrap5', 'HTML', 'CSS'],
        }, {
            title: t('projects.hiCoffeeApp.name'),
            body: t('projects.hiCoffeeApp.body'),
            github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
            link: '',
            image: 'hicoffee-mobile.jpg',
            tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        }, {
            title: t('projects.lmsApp.name'),
            body: t('projects.lmsApp.body'),
            github: 'https://github.com/locnguyen2k2/laboratory-management-application',
            image: 'labs-app.jpg',
            tags: ['React-Native', 'Axios', 'Redux', 'TailwindCSS']
        }]

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
            <div className={'welcome fade-effect'}>
                <Label content={t('greeting')}/>
            </div>
            <div className={'my-self'}>
                <div className={'content'}>
                    <div className={'info'}>
                        <div className={'fade-effect'}>
                            <Label content={'Loc Nguyen'}/>
                            <p><i>{t('about.major')}</i></p>
                        </div>
                        <Image style={{
                            width: '205px',
                            height: '269px'
                        }} blur={true} image={'avatar.png'}/>
                    </div>
                    <p className={'fade-effect'}>
                        {t('about.profile')}
                    </p>
                    <p>
                        {t('works.title.works')}:
                    </p>
                    <Works className={'slider'}/>
                    <p>
                        {t('projects.title.projects')}:
                    </p>
                    <Project className={'slider'} data={projects}/>
                    <div className={'contact'}>
                        <Label content={t('about.title.contact')}/>
                        <p>
                            {t('about.contact')} <a
                            href={'mailto:locnguyen071102@gmail.com'}><i>Email</i></a>, <a
                            href={'https://www.linkedin.com/in/nguyen-loc-171793311/'}><i> LinkedIn</i></a>,
                            <a href={'https://www.facebook.com/nguyentanloc0711/'}><i> Facebook</i></a>.
                        </p>
                    </div>
                    <Label content={t('about.title.feedback')}/>
                    <div className={'feedback-info'}>
                        <CustomInput value={name} onChange={(e) => setName(e.target.value)} width={'100%'} lines={3}
                                     title={t('mailer.name')} type={'text'}/>
                        <CustomInput
                            type={'email'}
                            value={email} onChange={(e) => setEmail(e.target.value)} width={'100%'}
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
    )
}
