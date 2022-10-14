import React from 'react'
import { cartItems } from '../data'
import './CartSum.css'

class CartSum extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render () {

        let cart= this.props.cart

        return(
            <div className='cart-items-sum'>
                {cart.map((item) => 
                    // item.inCart &&
                (
                <div className='cart-item'>
                    
                    <div className='item-img'>
                        <img src={item.item.image} alt=''/>
                    </div>
                    <div className='item-info'>
                        <div className='category'>{item.item.category}</div>
                        <h3>{item.item.name}</h3>
                        <div className='sub-info'>
                            <div className='label-item'>Color:</div>
                            <div className='attribute'></div>
                        </div>
                        <div className='sub-info'>
                            <div className='label-item'>Size:</div>
                            <div className='attribute'></div>
                        </div>
                    </div>
            
                    {cart.quantity > 0 ?
                    <div className='attribute'>
                        ${item.price} x {(this.props.cart && [cart.indexOf(item)] / item.price)} 
                        = ${this.props.cart && [cart.indexOf(item)]}
                    </div>
                        :
                    <div className='attribute'>${item.item.price} </div>}

                </div>
                ))}
            </div>
        )
    }
}

export default CartSum