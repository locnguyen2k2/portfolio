import './Label.scss'
import {useContext} from "react";
import {Context} from "../../../Context";

export default function Label(props) {
    const {language} = useContext(Context);
    return (
        <h1 className={`label ${language} fade-effect`}>{props.content}</h1>
    )
}