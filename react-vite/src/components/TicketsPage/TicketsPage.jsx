

import './TicketsPage.css'

function TicketsPage(){


    return(
        <div className='tickets-page'>
            <h2>Purchase Tickets</h2>

        <div className='calendar-container'>Container
            <div className='calendar'>
            Calendar
            </div>
        </div>
        <div className='tickets-container'>
            <h3>Ticket Types</h3>
        </div>
        <div className='purchase'>
            <span>Total Price</span>
            <span>Discount</span>
            <button>Purchase</button>
        </div>

        </div>

    )
}

export default TicketsPage