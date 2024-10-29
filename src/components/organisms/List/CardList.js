import Card from "../../molecules/Card/Card";
import './CardList.scss'
import Label from "../../atoms/Lable/Label";

export default function CardList(props) {
    return (
        <div>
            {props.title && <Label content={props.title}/>}
            <div className={'cards'}>
                {
                    props.data.map((item, key) => {
                        return (<Card key={key} image={item.image}
                                      title={item.title}
                                      body={item.body}
                                      github={item.github}
                                      link={item.link}
                                      tags={item?.tags ? item.tags : []}
                        />)
                    })

                }
            </div>
        </div>
    )
}