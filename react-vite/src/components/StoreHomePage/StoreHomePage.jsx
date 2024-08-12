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
const [storeItems, setStoreItems] = useState([])
const [sortedLowToHigh, setSortedLowToHigh] = useState([])
const [sortedHighToLow, setSortedHighToLow] = useState([])
const [timeCheck, setTimeCheck] = useState(true);


useEffect(()=>{

    dispatch(getItemsThunk())
   

},[dispatch])

useEffect(() => {
    let timeout;
   
    if (!items) {
        timeout = setTimeout(() => setTimeCheck(false), 3000);
        
    }else{
        setStoreItems(Object.values(items))
    }

    return () => clearTimeout(timeout);
}, [items]);

if (!items && timeCheck) return <h1>Loading...</h1>;
else if (!items && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

// console.log(sortedHighToLow,sortedLowToHigh)
const lowToHigh =()=>{
    setStoreItems(Object.values(items).slice().sort((a, b) => a.price - b.price))
}
    

const highToLow = () =>{
    setStoreItems(Object.values(items).slice().sort((a, b) => b.price - a.price));
}

const bestRated = () =>{
    setStoreItems(Object.values(items).slice().sort((a, b) => b.avgRating - a.avgRating))
} 

const featured = () =>{
    setStoreItems(Object.values(items))
}

// if(items){

//     setStoreItems(Object.values(items))
// }

// console.log(storeItems)

function handleChange(event) {
    const value = event.target.value;
    switch (value) {
        case 'lowToHigh':
            lowToHigh();
            break;
        case 'highToLow':
            highToLow();
            break;
        case 'bestRating':
            // Handle France selection
           bestRated()
            break;

        default:
            // Handle default case or no selection
            featured()
            break;
    }
}

// function updateSelectedOptionText(event){
//     const selectElement = event.target;
//     const target = event.value
//     const selectedText = selectElement.options[selectElement.selectedIndex].text;

//     if(target='lowToHigh'){

//         selectElement.options[selectElement.selectedIndex].text = `Sort by: ${lowToHigh}`;
//     }
// }

return(
    <div className='container'>
    <div className='sort-by-cont'>

    <form className='sort-by'>
        <label>Sort by:</label>

    <select onChange={(event)=>handleChange(event)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        
        <option selected value='featured'>Featured</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
        <option value="bestRating">Best Rating</option>
    </select>
    </form>
    </div>


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
    </div>
)

}

export default StoreHomePage