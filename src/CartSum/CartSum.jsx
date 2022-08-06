import React from 'react'
import { cartItems } from '../data'
import CartItem from '../CartItem/CartItem'
import './CartSum.css'

class CartSum extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render () {
        return(
            <div className='cart-items-sum'>
                {cartItems.map((item) => (
                <div className='cart-item'>
                    
                    <div className='item-img'>
                        <img src={item.img} alt={item.imgAlt} />
                    </div>
                    <div className='item-info'>
                        <div className='category'>{item.sex}</div>
                        <h3>{item.name}</h3>
                        <div className='sub-info'>
                            <div className='label-item'>Color:</div>
                            <div className='attribute'>{item.color}</div>
                        </div>
                        <div className='sub-info'>
                            <div className='label-item'>Size:</div>
                            <div className='attribute'>{item.size}</div>
                        </div>
                    </div>
            
                    <div className='attribute'>${item.price.toFixed(2)}</div>

                </div>
                ))}
            </div>
        )
    }
}

export default CartSum