import './Label.scss'
export default function Label(props) {
    return (
        <h1 className={'label'}>{props.content}</h1>
    )
}