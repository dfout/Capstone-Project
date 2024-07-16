import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getExhibitionThunk } from "../../redux/exhibition"
import { useState } from "react"

function ExhibitionDetail(){
    const dispatch = useDispatch()
    let {id} = useParams()
    id = Number(id)
   
    const exhibition = useSelector((state)=>state.exhibitions[id])
   
    
    const [timeCheck, setTimeCheck] = useState(true);

    useEffect(()=>{
        dispatch(getExhibitionThunk(id))

    },[dispatch,id])

    useEffect(() => {
        let timeout;
       
        if (!exhibition || !exhibition.Images || ! exhibition.Gallery) {
            timeout = setTimeout(() => setTimeCheck(false), 3000);
            
        }
    
        return () => clearTimeout(timeout);
    }, [exhibition]);

    if (!exhibition || !exhibition.Images || ! exhibition.Gallery && timeCheck) return <h1>Loading...</h1>;
    else if (!exhibition || !exhibition.Images || ! exhibition.Gallery && !timeCheck) return <h1>Sorry, please refresh the page</h1>;

    return(
        <>
        {exhibition.Images.map((image)=>(
        <img key={image.id}src={image.url}/>
        ))}   
        <h2>{exhibition.name}</h2>
        <h3>{exhibition.showingStartDate} - {exhibition.showingEndDate}</h3>
        <h4>{exhibition.Gallery.name}</h4>
        <div>
            <span>{exhibition.description}</span>

        </div>
        </>
    )

}



export default ExhibitionDetail