import Label from "../../atoms/Lable/Label";
import './about.scss';
import Image from "../../atoms/Image/Image";

export default function About() {
    return (
        <div className={'about'}>
            <Label content={"It's time for me to talk a bit about myself . . ."}/>
            <div className={'content'}>
                <div>
                    My full name is Nguyen Tan Loc, I am 22 years old, and I was born and raised in Duyen Hai district -
                    Tra Vinh city <Image type={'circle'} image={'beach.gif'} />.
                    <br/>Because I am a student and my major is software engineer <Image image={'typing.gif'} /> at Can Tho University Of Technology then I am have been living
                    at Can Tho city for now, and this is my fourth year.
                    <br/>With my experience when I'm staying in Can Tho in along time, I am
                    willing to find a job in here.
                    I am also excited about the possibility of working and learning in a new place if the opportunity
                    comes.
                </div>
            </div>

        </div>
    )
}