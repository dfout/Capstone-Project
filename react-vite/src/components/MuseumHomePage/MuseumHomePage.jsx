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

    // const images = ["https://musee4.s3.us-east-2.amazonaws.com/exhibitions/xavier-von-erlach-g_2U9j6uIEw-unsplash.jpg", ""]
    // const expositionsArr = Object.values(expositions)
    //2,
    return(
        <>
        <div className='home-exhibitions-container'>
            {expositions[3] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[3].id}`}>
                    <div className='exposition-intro-container-one'>
                        <div className='expo-info'>
                        <h3 id="name" className="archivo-black-regular">{expositions[3].name}</h3>  
                        </div>

                    </div>
            
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src="https://musee4.s3.us-east-2.amazonaws.com/exhibitions/mahdis-mousavi-MJ-bloex-zs-unsplash.jpg"/>
                        </div>    
                    </NavLink>
                </div>
            )}
             {expositions[7] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[7].id}`}>
                    <div className='exposition-image-container'>
                            <img id='preview-image' src="https://musee4.s3.us-east-2.amazonaws.com/exhibitions/charlesdeluvio-ZBsqJwNOSoE-unsplash.jpg"/>
                        </div>    
                        <div className='exposition-intro-container-two'>
                            <div className='expo-info'>
                            <h3 id="name" className="archivo-black-regular">{expositions[7].name}</h3> 
                            </div>
 
                    </div>
                    </NavLink>
                </div>
            )}
            {expositions[9] && (
                <div className='exposition-tile'>
                    <NavLink className='exposition-link' to={`/exhibitions/${expositions[9].id}`}>
                    <div className='exposition-intro-container-three'>
                        <div className='expo-info'>
                        <h3 id="name"  className="archivo-black-regular">{expositions[9].name}</h3>
                        </div>
                    </div>
            
                    
                    <div className='exposition-image-container'>
                            <img id='preview-image' src="https://musee4.s3.us-east-2.amazonaws.com/exhibitions/roberto-contreras-KyFajImq1-A-unsplash.jpg"/>
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
        <section>
            <h4 className='archivo-black-regular h4home'>Collection</h4>
        </section>
        </>
    )
}

export default MuseumHomePage;