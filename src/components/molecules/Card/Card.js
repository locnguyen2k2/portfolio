import './Card.scss'
import Image from "../../atoms/Image/Image";
import {GithubOutlined, LinkOutlined} from "@ant-design/icons";
import Label from "../../atoms/Lable/Label";
import IconButton from "../../atoms/Button/IconButton";

export default function Card(props) {
    return (
        <div className={`card ${props.className ? props.className : ""} fade-effect`}
             style={{
                 ...(props.style && props.style),
                 ...(props?.blur && {'backdrop-filter': 'blur(12px)'})
             }}
        >
            <div className="card-header">
                {props.image && <Image border={true} image={props.image}/>}
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
                                <IconButton
                                    key={key}
                                    style={{
                                        margin: '0 3px',
                                        padding: '3px 5px',
                                    }}
                                    icon={<a href='#'>#{tag}</a>}
                                    handleAction={() => {
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div className={'links'}>
                        {props.github &&
                            <IconButton
                                hover={true}
                                style={{
                                    margin: '0 3px',
                                    padding: '3px 5px'
                                }}
                                border={true}
                                icon={<a href={`${props.github}`}><GithubOutlined/> Github</a>}
                                handleAction={() => {
                                }}
                            />}
                        {props.link &&
                            <IconButton
                                hover={true}
                                style={{
                                    margin: '0 3px',
                                    padding: '3px 5px'
                                }}
                                border={true}
                                icon={<a href={`${props.link}`}><LinkOutlined/> Link</a>}
                                handleAction={() => {
                                }}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}