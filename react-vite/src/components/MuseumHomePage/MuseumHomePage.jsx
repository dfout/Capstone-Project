import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExhibitionsThunk } from "../../redux/exhibition";
import { NavLink } from "react-router-dom";
import './MuseumHomePage.css'



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
                <div key={exposition.id} className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${exposition.id}`}>
                    <div className='exposition-intro-container'>
                    <h3 className="archivo-black-regular">{exposition.name}</h3>  
                    </div>
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src={exposition.Images[0].url}/>
                        </div>    
                    </NavLink>
                </div>
                ))}
        </div>
        </>
    )
}

export default MuseumHomePage;