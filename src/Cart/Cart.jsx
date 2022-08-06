import React from 'react'
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import {cartItems} from '../data'

class Cart extends React.Component {
    constructor() {
        super()
        this.state= {

        }
    }

    render() {
        return(
            <div className='container main'>
                <div className= ' cart header'>
                    <div className='titles'>Product</div>
                    <div className='titles'>Price</div>
                    <div className='titles'>Quantity</div>
                    <div className='titles'>Total Price</div>
                </div>
                <hr/>
                {cartItems.map((item) => (
                    <CartItem 
                        img={item.img}
                        imgAlt={item.imgAlt}
                        sex={item.sex}
                        name={item.name}
                        color={item.color}
                        size={item.size}
                        price={item.price}
                    />
                ))}
                    

            </div>

        )
    }
} 

export default Cart