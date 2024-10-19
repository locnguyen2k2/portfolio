import Image from "../../atoms/Image/Image";
import './about.scss'
import Label from "../../atoms/Lable/Label";

export default function About() {
    return (
        <>
            <div className={'welcome'}>
                <Label content={'Hi, welcome to my website!'}/>
            </div>
            <div className={'my-self'}>
                <div className={'content'}>
                    <div className={'info'}>
                        <div>
                            <Label content={'Loc Nguyen'}/>
                            <p><i>Software Engineer(Backend Developer)</i></p>
                        </div>
                        <Image image={'avatar.jpg'} type={"circle"}/>
                    </div>
                    <div>
                        <p>
                            a software engineer, with a passion for coding, and the excitement of completing something
                            drives me to continuously learn and practice, always striving to improve my skills.
                        </p>
                    </div>
                    <div className={'contact'}>
                        <Label content={'Contact'}/>
                        <p>
                            The easiest way to connect with me is through <a href={'mailto:locnguyen071102@gmail.com'}><i>Email</i></a>, <a href={'https://www.linkedin.com/in/nguyen-loc-171793311/'}><i>LinkedIn</i></a>,
                            or <a href={'https://www.facebook.com/nguyentanloc0711/'}><i>Facebook</i></a>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}