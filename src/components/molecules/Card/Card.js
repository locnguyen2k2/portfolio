import './Card.scss'
import Image from "../../atoms/Image/Image";
import {GithubOutlined, LinkOutlined} from "@ant-design/icons";
import Label from "../../atoms/Lable/Label";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-header">
                {props.image && <Image image={props.image}/>}
            </div>
            <div className="card-body">
                {
                    props?.title && <Label content={props.title}/>
                }
                <p className={'body'}>{props.body}</p>
                <div className="card-footer">
                    <div className={'tags'}>
                        {props?.tags && props.tags.map((tag, key) => {
                            return (
                                <a key={key}>{tag}</a>
                            )
                        })}
                    </div>
                    <div className={'links'}>
                        {props.github && <a href={`${props.github}`}><GithubOutlined/> Github</a>}
                        {props.link && <a href={`${props.link}`}><LinkOutlined/> Demo</a>}
                    </div>
                </div>
            </div>
        </div>
    )
}