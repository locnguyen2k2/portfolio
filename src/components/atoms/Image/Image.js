import './Image.scss'

export default function Image(props) {
    return (
        <>
            <div className={`image ${props.type === 'circle' ? 'circle' : ''}`}>
                <img className={`${props?.border ? 'border' : ''}`}
                     style={{
                         ...(props?.style && props.style),
                         ...(props?.blur && {
                             'backdrop-filter': 'blur(8px)'
                         })
                     }}
                     alt={`picture-${props.image}`} src={require(`./../../../assets/public/${props.image}`)}/>
            </div>
        </>
    )
}