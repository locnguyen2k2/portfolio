import './Image.scss'

export default function Image(props) {
    return (
        <>
            <div className={`image ${props.type === 'circle' ? 'circle' : ''}`}>
                <img className={`${props?.border && 'border'}`} style={{...(props?.style && props.style)}}
                alt={`picture-${props.image}`} src={require(`./../../../assets/public/${props.image}`)}/>
            </div>
        </>
    )
}