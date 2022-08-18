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

        let cartQuantities= this.props.cartQuant

        return(
            <div className='cart-items-sum'>
                {cartItems.map((item) => 
                    item.inCart &&
                (
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
            
                    {cartQuantities.length > 0 ?
                    <div className='attribute'>
                        ${item.price.toFixed(2)} x {(this.props.cartQuant && cartQuantities[cartItems.indexOf(item)] / item.price).toFixed(0)} 
                        = ${this.props.cartQuant && cartQuantities[cartItems.indexOf(item)]}
                    </div>
                        :
                    <div className='attribute'>${item.price.toFixed(2)} </div>}

                </div>
                ))}
            </div>
        )
    }
}

export default CartSum