import './Input.scss';

export default function CustomInput(props) {
    return (
        <div className={'custom-input'} style={{
            display: "flex",
            width: props.width,
            height: props.height,
            flexDirection: 'column',
            margin: '10px 0',
        }}>
            <p>{props?.title}</p>
            <textarea
                {...props}
                value={props.value} onChange={props.onChange} type={props.type} style={{
                width: props.width,
                lineHeight: '1.5em',
                height: `${(props?.lines ? props.lines : 3) * 12}px`
            }}/>
        </div>
    )
}