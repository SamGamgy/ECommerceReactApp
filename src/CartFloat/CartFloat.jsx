import React from "react";
import './CartFloat.css'
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import {AiFillCloseCircle} from 'react-icons/ai'


class CartFloat extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            updatedCart: [],
            cartTotalPrice:0,
        }
    }
    handleClick = (e) => {
        this.props.handleButton(e.target.parentNode.id)
    }
    handleNewQuant = (newQuant, itemData) => {
        this.props.updatedCart(newQuant, itemData)
    }
    openCartScreen = () => {
        this.props.openCartScreen('homeScreen', 'cartScreen')
    }
    // calcTotal = () => {
    //     this.setState({cartTotalPrice:0})
    //     this.props.cartItems
    //         .map(item => {
    //             let itemTotal = (item.quantity * item.item.price)
    //             cartTotal += itemTotal
    //             return cartTotal
    //             }
    //         )
    //         this.setState({cartTotalPrice:cartTotal})
    //     }
    
    render() {
            const {cartItems} = this.props;

            const total = cartItems.reduce((total, cv) => total = total + ((cv.item.price * 1) * cv.quantity), 0)
        return(
            <div className="cart-float-container">
                <div className="cart-float-header">
                    <button 
                        id='cartFloatBtn'
                        onClick={this.handleClick}
                        className="pop-head close-btn"
                    >
                        <AiFillCloseCircle id='cartFloatBtn' />
                    </button>
                    <h3>Your Cart Summary</h3>
                </div>
                    <div className="cart-item-header">
                        <h4 style={{width:'120px'}}>Item</h4>
                        <h4>Price</h4>
                        <h4>Quantity</h4>
                        <h4>Total</h4>
                    </div>
                    <div className="cart-item-container">
                        {this.props.cartItems.length > 0 ?
                            this.props.cartItems.map((item) => (
                                <CartItem 
                                    key={item.item.id + 'inCart'} 
                                    newQuant={this.handleNewQuant} 
                                    data={item} 
                                />
                            ))

                        : <div className="empty-cart">Your Cart is Empty</div>}
                    </div>
                    <div className="cart-total">Cart Total: ${total.toFixed(2)}
                        {/* {this.props.cartItems.length > 0 ? 
                            this.props.cartItems
                                .map((item) => {
                                    // let cartItem = item.quantity * item.item.price
                                    cartTotal += cartItem
                                    // this.setState({cartTotalPrice:cartTotal})
                                    return cartTotal
                                })
                                
                            
                        :cartTotal */}
                        
                    </div>
                    {this.props.cartItems.length > 0 ?
                        <Button 
                            onClick={this.openCartScreen} 
                            className='btn checkout-btn'
                            name='Checkout' 
                        />
                    : 
                        <Button 
                            isDisable={true}
                            onClick={this.openCartScreen} 
                            className='btn checkout-btn'
                            name='Checkout' 
                        />
                    }
            </div>
        )
    }
}
 

export default CartFloat