import React from 'react'
import { cartItems } from '../data'

let total = 0;
for (const items of cartItems) {
    total = total + items.price
}

let sum=0

class Totals extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            subtotal:total,
            adjustedSubtotal:0,
            shipping:0,
            discount:0,
            total:0,
            
        }
    }
   

    handleNewTotal = () => {
        let cart = this.props.quantities
        for (const [key,value] of Object.entries(cart)) {
            let itemNum= (key.slice(4,5)-1)
            let cartItem= cartItems[itemNum].price
            let cartItemQuant = cartItem*value
            sum = sum + cartItemQuant 
            console.log(sum)
            }
        this.setState({adjustedSubtotal:sum})
    }

    render() {
        let cart = this.props.quantities
        if (cart.item1Quantity) {
            
            // console.log(cart)
            // let total=0;
            
                // this.handleNewTotal()
                // this.setState({subtotal:sum})
            // for (const items of cartItems) {
            //     let index=cartItems.indexOf(items)
            //     total= total + (items.price * cart[index][1])
            //     console.log(total)
            //     this.setState({subtotal:total})
            // }
        }
        return(
            <div className="totals">
                    <div className='subtotals'>
                        <div className='label'>Cart Subtotal:</div>
                        <div className='attribute'>{this.state.subtotal}</div>
                    </div>

                    <div className='subtotals'>
                        <div className='label'>Shipping & Handling:</div>
                        <div className='attribute'>{this.state.shipping}</div>
                    </div>
                    
                    <div className='subtotals'>   
                        <div className='label'>Discount:</div>
                        <div className='attribute'>{this.state.discount}</div>
                    </div>

                    <div className='subtotals'>    
                        <div className='label'>Cart Total:</div>
                        <div className='attribute total'>{this.state.total}</div>
                    </div>
            </div>
        )
    }
}

export default Totals