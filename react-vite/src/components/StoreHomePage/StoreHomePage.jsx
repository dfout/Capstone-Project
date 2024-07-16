import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getItemsThunk } from "../../redux/item"
import { NavLink } from "react-router-dom"



function StoreHomePage(){
const dispatch= useDispatch()
const items = useSelector((state)=>state.items)


useEffect(()=>{

    dispatch(getItemsThunk())

},[dispatch])


return(
    <>
    {Object.values(items).map((item)=>(
        <div key={item.id} className="item-tile">
            <NavLink className='item-link' to={`/store/items/${item.id}`}>
            {item.Images.map((image)=>(
                <img key={image.id} src={image.url}/>
            ))}
            <h3>{item.name}</h3>
            <span>{item.price}</span>
            <span>{item.avgRating}</span>
            </NavLink>
        </div>
    ))}
    </>
)

}

export default StoreHomePage