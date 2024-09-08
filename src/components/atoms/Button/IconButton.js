import './IconButton.scss';

export default function IconButton(props) {
    return (
        <div className={'icon-button'}>
            <button onClick={props.handleAction}>
                {props.icon}
            </button>
        </div>
    )
}