import './IconButton.scss';

export default function IconButton(props) {
    return (
        <div className={'icon-button'} style={{
            width: props.width,
            height: props.height,
        }}>
            {props?.background && <div style={{
                width: props.width,
                height: props.height,
            }} className={'btn-bg'}></div>}
            <button onClick={props.handleAction}>
                {props.icon}
            </button>
        </div>
    )
}