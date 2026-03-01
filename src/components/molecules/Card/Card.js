import './Card.scss'
import Image from "../../atoms/Image/Image";
import { GithubOutlined, LinkOutlined } from "@ant-design/icons";
import Label from "../../atoms/Lable/Label";
import IconButton from "../../atoms/Button/IconButton";

export default function Card(props) {
    return (
        <div className={`card ${props.className ? props.className : ""}`}
            style={{
                ...(props.style && props.style),
                ...(props?.blur && { backdropFilter: 'blur(3px)' })
            }}
        >
            <div className="card-header fade-effect"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {props.image && <Image image={props.image} />}
                {props.time && <h3><i>{props.time}</i></h3>}
            </div>
            <div className="card-body fade-effect">
                {
                    props?.title && <Label content={props.title} />
                }
                {
                    typeof props.body === 'string' || props.body == null
                        ? <p className={'body'}>{props.body}</p>
                        : <div className={'body body-structured'}>
                            {props.body?.role && <p className={'body-role'}>{props.body.role}</p>}
                            {Array.isArray(props.body?.highlights) && props.body.highlights.length > 0 && (
                                <ul className={'body-highlights'}>
                                    {props.body.highlights.map((text, idx) => (
                                        <li key={idx}><p>{text}</p></li>
                                    ))}
                                </ul>
                            )}

                            {Array.isArray(props.body?.projects) && props.body.projects.length > 0 && (
                                <div className={'body-projects'}>
                                    {props.body.projects.map((project, projectIdx) => (
                                        <div className={'body-project'} key={projectIdx}>
                                            {project?.title && <p className={'body-project-title'}>{project.title}</p>}
                                            {project?.summary && <p className={'body-project-summary'}>{project.summary}</p>}
                                            {project?.technologies && <p className={'body-project-tech'}><b>Technologies:</b> {project.technologies}</p>}

                                            {Array.isArray(project?.responsibilities) && project.responsibilities.length > 0 && (
                                                <>
                                                    <p className={'body-project-resp-title'}><b>Responsibility:</b></p>
                                                    <ul className={'body-project-resp'}>
                                                        {project.responsibilities.map((text, respIdx) => (
                                                            <li key={respIdx}><p>{text}</p></li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                }
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
                                icon={<a href={`${props.github}`}><GithubOutlined /> Github</a>}
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
                                icon={<a href={`${props.link}`}><LinkOutlined /> Link</a>}
                                handleAction={() => {
                                }}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}