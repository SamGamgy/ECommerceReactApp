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
            cart:{
                item1Quantity:1,
                item2Quantity:1,
                item3Quantity:1,
                item4Quantity:1,
            }
        }
    }

    updateTotal = (quantity, index) => {
        let cartItem= `item${index + 1}Quantity`
        this.setState((prevState) => ({cart: {...prevState.cart, [cartItem]: quantity}}), this.updateProp)
    }
    updateProp = () => {
        this.props.cart(this.state.cart)
    }
    handleDisplay = (boolean, index) => {
        cartItems[index].inCart = boolean

        let cartItem= `item${index + 1}Quantity`
        cartItems[index].inCart === false && 
        this.setState((prevState) => ({cart: {...prevState.cart, [cartItem]: 0}}),this.updateProp)
    }
    backToHome = () => {
        this.props.backToHome('cartScreen', 'homeScreen')
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
                {this.props.cart.map((item) => 
                    // item.inCart &&
                (
                    <CartItem 
                        key={item.item.id} 
                        newQuant={this.handleNewQuant} 
                        data={item} 
                    />
                ))}
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