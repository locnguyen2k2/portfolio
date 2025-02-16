import CustomInput from "../../atoms/Input/Input";
import IconButton from "../../atoms/Button/IconButton";
import {useTranslation} from "react-i18next";

export default function ContactForm(props) {
    const {t} = useTranslation();

    return (<>
        <div className={'feedback-info'}>
            <CustomInput value={props.name} onChange={(e) => props.setName(e.target.value)} width={'100%'} lines={3}
                         title={t('mailer.name')} type={'text'}
                         placeholder={'Nguyen Tan Loc'}
            />
            <CustomInput
                type={'email'}
                placeholder={'locnguyen071102@gmail.com'}
                value={props.email} onChange={(e) => props.setEmail(e.target.value)} width={'100%'}
                lines={3}
                title={t('mailer.email')} type={'email'}/>
            <CustomInput placeholder={'Xin chao'} value={props.content}
                         onChange={(e) => props.setContent(e.target.value)} width={'100%'}
                         lines={10} title={t('mailer.content')} type={'textarea'}/>
            <IconButton border={true} width={100} height={'max-content'}
                        handleAction={props.onSubmit}
                        icon={<p style={{padding: 0, textAlign: 'center', fontSize: 'small'}}>Send</p>}/>
        </div>
    </>)
}