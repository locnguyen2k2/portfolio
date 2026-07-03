import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import './Draggable.scss'

export const DraggableForm = (props) => {
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef(null);
    const [bounds, setBounds] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    });

    const onStart = (_event, uiData) => {
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) return;

        setBounds({
            left: -targetRect.left + uiData.x,
            right: window.innerWidth - targetRect.right + uiData.x,
            top: -targetRect.top + uiData.y,
            bottom: window.innerHeight - targetRect.bottom + uiData.y,
        });
    };

    return (
        <>
            {props?.onClose && <div
                className="widget-overlay"
                onClick={props.onClose}
            />}
            <div className={`draggable-form ${props?.startAt ? props.startAt : 'topRight'}`} style={{ zIndex: "9999", }}>
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggleRef}>
                        <div
                            className={'draggable-area'}
                            title={'Draggable area'}
                            onMouseOver={() => {
                                if (disabled) {
                                    setDisabled(false);
                                }
                            }}
                            onMouseOut={() => {
                                setDisabled(true);
                            }}
                        ></div>
                        {props.children}
                    </div>
                </Draggable>
            </div>
        </>
    );
};