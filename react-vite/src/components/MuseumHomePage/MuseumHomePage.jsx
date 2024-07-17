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

    // const expositionsArr = Object.values(expositions)
    //2,
    return(
        <>
        <div className='home-exhibitions-container'>
            {expositions[3] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[3].id}`}>
                    <div className='exposition-intro-container-one'>
                    <h3 className="archivo-black-regular">{expositions[3].name}</h3>  
                    </div>
            
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src={expositions[3].Images[0].url}/>
                        </div>    
                    </NavLink>
                </div>
            )}
             {expositions[7] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[7].id}`}>
                    <div className='exposition-image-container'>
                            <img id='preview-image' src={expositions[7].Images[0].url}/>
                        </div>    
                        <div className='exposition-intro-container-two'>
                    <h3 className="archivo-black-regular">{expositions[7].name}</h3>  
                    </div>
                    </NavLink>
                </div>
            )}
            {expositions[9] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[9].id}`}>
                    <div className='exposition-intro-container-three'>
                    <h3 className="archivo-black-regular">{expositions[9].name}</h3>  
                    </div>
            
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src={expositions[9].Images[0].url}/>
                        </div>    
                    </NavLink>
                </div>
            )}
            {/* {expositions[6] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[6].id}`}>
                    <div className='exposition-intro-container'>
                    <h3 className="archivo-black-regular">{expositions[6].name}</h3>  
                    </div>
            
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src={expositions[6].Images[0].url}/>
                        </div>    
                    </NavLink>
                </div>
            )} */}



        </div>
        </>
    )
}

export default MuseumHomePage;