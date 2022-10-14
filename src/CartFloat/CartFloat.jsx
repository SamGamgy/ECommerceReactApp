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
        }
    }
    handleClick = (e) => {
        this.props.handleButton(e.target.parentNode.id)
    }
    handleNewQuant = (newQuant, itemData) => {
        this.setState({updatedCart:this.props.cartItems})
        this.props.cartItems.map((item) => {
            if (itemData === item.item) {
                return item.quantity = newQuant
            }
            else{
                return ''
            }
        })
        
    }
    openCartScreen = () => {
        this.props.openCartScreen('homeScreen', 'cartScreen')
    }
    render() {
        return(
            <div className="cart-float-container">
                <div className="cart-float-header">
                    <h3>Your Cart Summary</h3>
                    <button 
                        id='cartFloatBtn'
                        onClick={this.handleClick}
                        className="pop-head close-btn"
                    >
                        <AiFillCloseCircle id='cartFloatBtn' />
                    </button>
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
                                    key={item.id} 
                                    newQuant={this.handleNewQuant} 
                                    data={item} 
                                />
                            ))

                        : <div className="empty-cart">Your Cart is Empty</div>}
                    </div>
                    <div className="cart-total">Cart Total:</div>
                    <Button onClick={this.openCartScreen} className='btn checkout-btn'name='Checkout' />
            </div>
        )
    }
}
 

export default CartFloat