export default function Skeleton({props}) {
    return (
        <div className={'skeleton'}>
            <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                    <p className={'body'}></p>
                    <div className="card-footer"></div>
                </div>
            </div>
        </div>
    )
}