import './Card.scss'
import Image from "../../atoms/Image/Image";
import {GithubOutlined, LinkOutlined} from "@ant-design/icons";
import Label from "../../atoms/Lable/Label";
import IconButton from "../../atoms/Button/IconButton";

export default function Card(props) {
    return (
        <div className={`card ${props.className ? props.className : ""}`}
             style={{
                 ...(props.style && props.style),
                 ...(props?.blur && {backdropFilter: 'blur(3px)'})
             }}
        >
            <div className="card-header fade-effect"
                 style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                 }}
            >
                {props.image && <Image image={props.image}/>}
                {props.time && <h3><i>{props.time}</i></h3>}
            </div>
            <div className="card-body fade-effect">
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