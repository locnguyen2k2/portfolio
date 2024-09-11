import './Image.scss'

export default function Image(props) {
    return (
        <>
            <div className={`image ${props.type === 'circle' ? 'circle' : ''}`}>
                <img alt={`picture-${props.image}`} src={require(`./../../../assets/public/${props.image}`)}/>
            </div>
        </>
    )
}