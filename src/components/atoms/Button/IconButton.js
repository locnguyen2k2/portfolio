import './IconButton.scss';

export default function IconButton({...props}) {
    return (
        <div className={'icon-button'} style={{
            display: "flex",
            width: props.width,
            height: props.height,
            ...(props.border && {border: '2px solid #FFFFFF'}),
            borderRadius: '6px'
        }}>
            {props?.background && <div style={{
                width: props.width,
                height: props.height,
            }} className={'btn-bg'}></div>}
            <button
                onClick={props.handleAction}>
                {props.icon}
            </button>
        </div>
    )
}