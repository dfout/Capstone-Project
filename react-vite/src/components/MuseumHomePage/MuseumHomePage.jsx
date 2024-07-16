import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExhibitionThunk } from "../../redux/exhibition";



function MuseumHomePage(){
    const dispatch = useDispatch()
    const expositions = useSelector((state))
    useEffect(()=>{
        dispatch(getExhibitionThunk())
    }, [dispatch])


    return(
        <>
        <div className='home-exhibitions-container'>
            {Object.values(expositions).map((exposition)=>(
                <div key={exposition.id} className='exposition'>
                    <NavLink className='exposition-link' to={`/exhibitions/${exposition.id}`}>
                    <h3>{exposition.name}</h3>  
                    {exposition.Images.map((image)=>(
                        <img src={image.url}/>
                    ))}            
                    </NavLink>
                    </div>
                ))}
        </div>
        </>
    )
}

export default MuseumHomePage;