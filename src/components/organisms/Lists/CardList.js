import Card from "../../molecules/Card/Card";
import './CardList.scss'
import Label from "../../atoms/Lable/Label";

export default function CardList(props) {
    return (
        <div className={'list-card'}>
            {props.title && <Label content={props.title}/>}
            <div className={`cards`}>
                {
                    props.data.map((item, key) => {
                        return (<Card key={key} image={item.image}
                                      {...item}
                                      blur={true}
                                      style={props?.trans && {
                                          transform: `translateX(${props.trans})`
                                      }}
                        />)
                    })

                }
            </div>
        </div>
    )
}