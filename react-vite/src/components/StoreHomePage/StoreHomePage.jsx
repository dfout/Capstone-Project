import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getItemsThunk } from "../../redux/item"
import { NavLink } from "react-router-dom"
import './StoreHomePage.css'
import { IoIosStar } from "react-icons/io";

import { useState } from "react"

function StoreHomePage(){
const dispatch= useDispatch()
const items = useSelector((state)=>state.items)
const [sortedLowToHigh, setSortedLowToHigh] = useState([])
const [sortedHighToLow, setSortedHighToLow] = useState([])
const[storeItems, setStoreItems] = useState(Object.values(items))

useEffect(()=>{

    dispatch(getItemsThunk())
   

},[dispatch])


const lowToHigh =()=>{
    setStoreItems(Object.values(items).slice().sort((a, b) => a.price - b.price))
}
    

const highToLow = () =>{
    setStoreItems(Object.values(items).slice().sort((a, b) => b.price - a.price));
}

const bestRated = () =>{
    setStoreItems(Object.values(items).slice().sort((a, b) => b.avgRating - a.avgRating))
} 



return(
    <>
    <button onClick={lowToHigh}>Sort Low to High</button>
    <button onClick={highToLow}>Sort High to Low</button>
    <button onClick={bestRated}>Sort by Best Ratings</button>

    <div className='all-items'>
    {storeItems?.map((item)=>(
        <div key={item.id} className="item-tile">
            <NavLink className='item-link' to={`/store/items/${item.id}`}>
            <div className='item-image-container'>
                <img id='store-preview-image'src={item.Images[0].url}/>
            </div>
                
           <div className='item-details'>

            <h3>{item.name}</h3>
            <span>${item.price.toFixed(2)}</span>
            <div className='rating-previews'>
                <IoIosStar/>
                
            
            {item["avgRating"] && (

            <span>{`${item.avgRating.toFixed(2)}`}</span>
            )}
            </div>
           </div>
            </NavLink>
        </div>
    ))}
    </div>
    </>
)

}

export default StoreHomePage