import { useDispatch, useSelector } from "react-redux"
import { getEventsThunk } from "../../redux/events";
import { useEffect } from "react";
import { useState } from "react";

import './EventsPage.css'




function EventsPage(){

    const [timeCheck, setTimeCheck] = useState(true);
    const dispatch = useDispatch();
    const events = useSelector((state)=>state.events)


    const [pageNumbers, setPageNumbers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
  
    const [loadingMain, setLoadMain] = useState(false)
  
    const numProductsForPage = 4
  
    const parseNum = 3

    
        useEffect(()=>{
            dispatch(getEventsThunk())
        },[dispatch])
    
        useEffect(()=>{
            let timeout;
    
            if(!events){
                timeout = setTimeout(()=>setTimeCheck(false),3000)
            }
    
            return ()=> clearTimeout(timeout)
        },[events])
    
    
        if(!events && timeCheck){
            return <h2>Loading ...</h2>
        }else if(!events && !timeCheck){
            return <h2>Sorry, please refresh the page</h2>
        }
    async function sortArrNow() {
        if (Object.values(events).length) {
          let arr = filterById(questions,userId)
          let arr2 = []
          for (let event of arr) {
            if(event?.id){
              arr2.push(event)
            }
          }
          setPages(arr2, currentPage)
        }
      }
    
      function setPages(arr, page = 1) {
        if (arr.length && arr.length < 2) {
            userQuestions = arr
            setPageNumbers([1])
            return
        }
    
        let val = arr.length / numProductsForPage;
    
        let arr2 = arr.slice((numProductsForPage * (page - 1)), numProductsForPage * page)
        userQuestions = arr2;
        let pageArr = []
    
        for (let i = 0; i < val; i++) {
            pageArr.push(i + 1)
        }
    
        setPageNumbers(pageArr)
    
        if(page > pageArr[pageArr.length-1]){
          setCurrentPage(pageArr[pageArr.length-1])
        }
    
    }



    return(
        <div className='page-container'>
            <h2>Events</h2>
            <div className='events-container'>
            {events && Object.values(events).map((event=>{
                console.log(event)
                // Location is currently empty--seeder data only has galleries

                // date includes time (datetime in GMT)
                let {title, description, location, gallery, date, members_only, duration } = event;
                return(
                    <div className='event-tile' key={event.id}>
                        <span className='image-container'>img</span>
                        <div className='event-information'>
                            <span><h3>{title}</h3></span>
                            <span>{date}</span>
                            <span>{duration}</span>
                            <span>{description}</span>
                        </div>
                        <div className='event-buttons'>
                            <button>See Details</button>
                            <button>Book</button>
                        </div>
                    </div>
                
                )
            }))}
            <div className='paginationNav'>
        {
                pageNumbers.length && currentPage !== 1
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(1)
                }}
                className='decoratorPageNums'
                >{'<<'}</p>
                :
                null
            }
            {
                pageNumbers.length && currentPage > 1
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(currentPage-1)
                }}
                className='decoratorPageNums'
                >{'<'}</p>
                :
                null
            }
            {
                pageNumbers.map((number, index) => {
                    if (number >= currentPage -(parseNum-1) && number < currentPage + parseNum) {
                        return (
                            <p key={index}
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setCurrentPage(number)
                                }}
                                className={number === currentPage ? 'Active':'inActive'}
                            >{number}</p>
                        )
                    }
                })
            }
            {
                pageNumbers.length && currentPage < pageNumbers[pageNumbers.length-1]
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(currentPage+1)
                }}
                className='decoratorPageNums'
                >{'>'}</p>
                :
                null
            }
            {
                pageNumbers.length && currentPage !== pageNumbers[pageNumbers.length-1]
                ?
                <p
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentPage(pageNumbers[pageNumbers.length-1])
                }}
                className='decoratorPageNums'
                >{'>>'}</p>
                :
                null
            }

            </div>
            </div>
        </div>
    )




}


export default EventsPage