import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExhibitionsThunk } from "../../redux/exhibition";
import { NavLink } from "react-router-dom";



function MuseumHomePage(){
    const dispatch = useDispatch()
    const expositions = useSelector((state)=>state.exhibitions)
    useEffect(()=>{
        dispatch(getExhibitionsThunk())
    }, [dispatch])


    return(
        <>
        <div className='home-exhibitions-container'>
            {Object.values(expositions).map((exposition)=>(
                <div key={exposition.id} className='exposition'>
                    <NavLink className='exposition-link' to={`/exhibitions/${exposition.id}`}>
                    <h3>{exposition.name}</h3>  
                    {exposition.Images.map((image)=>(
                        <img key={image.id}src={image.url}/>
                    ))}            
                    </NavLink>
                    </div>
                ))}
        </div>
        </>
    )
}

export default MuseumHomePage;