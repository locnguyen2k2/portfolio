import Image from "../../atoms/Image/Image";
import './home.scss'
import Label from "../../atoms/Lable/Label";

export default function Home() {
    return (
        <>
            <div className={'welcome'}>
                <Label content={'Hi, welcome to my website!'}/>
            </div>
            <div className={'my-self'}>
                <div className={'content'}>
                    <div className={'info'}>
                        <div>
                            <h1>Loc Nguyen</h1>
                            <p><i>Software Engineer(Backend Developer)</i></p>
                        </div>
                        <Image image={'avatar.jpg'} type={"circle"}/>
                    </div>
                    <p>
                        I'm Loc Nguyen, a software engineer and a fourth-year student at Can Tho University of
                        Technology. I'm currently seeking a backend developer position. My passion for coding drives me
                        to continuously learn and practice, always striving to improve my skills and grow as a
                        developer.
                        All the repositories you’ll find here are the results of the fundamental knowledge I've gained
                        through my university studies and personal projects. Feel free to explore some of my work.
                    </p>
                </div>
            </div>
        </>
    )
}