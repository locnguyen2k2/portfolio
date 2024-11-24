import Label from "../atoms/Lable/Label";

export default function PageNotFound() {
    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                transform: 'translate(-50%, -50%)',
            }}>
                <Label content={'Ops!'}/>
                <img src={require('./../../assets/public/windows.gif')} width={410} height={150}/>
            </div>
        </>
    )
}