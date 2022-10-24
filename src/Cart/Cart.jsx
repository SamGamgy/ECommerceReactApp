import React from 'react'
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import {cartItems} from '../data'
import Button from '../Button/Button'




class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            sumTotal:0,
        }
    }

    // updateTotal = (quantity, index) => {
    //     let cartItem= `item${index + 1}Quantity`
    //     this.setState((prevState) => ({cart: {...prevState.cart, [cartItem]: quantity}}), this.updateProp)
    // }
    backToHome = () => {
        this.props.backToHome('cartScreen', 'homeScreen')
    }
    handleNewQuant = (newQuant, itemData) => {
        this.props.updatedCart(newQuant, itemData)
    }
    render() {
        return(
            <div className='container main'>
                <div className= 'cart header'>
                    <div className='titles'>Product</div>
                    <div className='titles'>Price</div>
                    <div className='titles'>Quantity</div>
                    <div className='titles'>Total Price</div>
                </div>
                <hr/>
                <div className='cart-items-container'>
                    {this.props.cart.length > 0 ? 
                        this.props.cart.map((item) => (
                            <CartItem 
                                key={item.item.id} 
                                newQuant={this.handleNewQuant} 
                                data={item} 
                            />
                        ))
                    :
                    <div className="empty-cart">Your Cart is Empty</div>
                    }
                </div>
                <Button 
                    name='Home Screen' 
                    className='btn home-btn cart-back-btn'
                    onClick={this.backToHome}
                />
            </div>
        )
    }
} 

export default Cart