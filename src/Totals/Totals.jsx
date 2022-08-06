import React from 'react'

class Totals extends React.Component {
    constructor() {
        super()

        this.state={

        }
    }

    render() {

        return(
            <div className="totals">
                    <div className='subtotals'>
                        <div className='label'>Cart Subtotal:</div>
                        <div className='attribute'>-</div>
                    </div>

                    <div className='subtotals'>
                        <div className='label'>Shipping & Handling:</div>
                        <div className='attribute'>-</div>
                    </div>
                    
                    <div className='subtotals'>   
                        <div className='label'>Discount:</div>
                        <div className='attribute'>-</div>
                    </div>

                    <div className='subtotals'>    
                        <div className='label'>Cart Total:</div>
                        <div className='attribute total'>-</div>
                    </div>
            </div>
        )
    }
}

export default Totals