import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getItemsThunk } from "../../redux/item"
import { NavLink } from "react-router-dom"
import './StoreHomePage.css'



function StoreHomePage(){
const dispatch= useDispatch()
const items = useSelector((state)=>state.items)


useEffect(()=>{

    dispatch(getItemsThunk())

},[dispatch])


return(
    <>

    <div className='all-items'>
    {Object.values(items).map((item)=>(
        <div key={item.id} className="item-tile">
            <NavLink className='item-link' to={`/store/items/${item.id}`}>
            <div className='item-image-container'>
                <img id='store-preview-image'src={item.Images[0].url}/>
            </div>
                
           <div className='item-details'>

            <h3>{item.name}</h3>
            <span>{item.price.toFixed(2)}</span>
            {item["avgRating"] && (

            <span>{`${item.avgRating.toFixed(2)}`}</span>
            )}
           </div>
            </NavLink>
        </div>
    ))}
    </div>
    </>
)

}

export default StoreHomePage