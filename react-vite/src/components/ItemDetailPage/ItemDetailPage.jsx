import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { getItemThunk } from "../../redux/item"

function ItemDetailPage(){
    const dispatch = useDispatch()
    let {id} = useParams()
    id = Number(id)

    const item = useSelector((state)=>state.items[id])
    const [timeCheck, setTimeCheck] = useState(true);

    useEffect(()=>{
        dispatch(getItemThunk(id))

    },[dispatch,id])

    useEffect(() => {
        let timeout;
       
        if (!item || !item.Images || !item.Reviews) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [item]);

    if (!item || !item.Images || !item.Reviews && timeCheck) return <h1>Loading...</h1>;
    else if (!item || !item.Images || !item.Reviews && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    return(
        <>
        {item.Images && item.Images.map((image)=>(
            <img key={image.id} src={image.url}/>
        ))}
        <h2>{item.name}</h2>
        <span>{item.avgRating}</span>
        <span>{item.price}</span>
        <p>{item.description}</p>
        <section>

        </section>
        
        </>
    )

}
export default ItemDetailPage