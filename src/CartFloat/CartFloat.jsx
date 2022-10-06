import React from "react";
import './CartFloat.css'
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import {AiFillCloseCircle} from 'react-icons/ai'

class CartFloat extends React.Component {
    constructor(props){
        super(props)
        this.state ={

        }
    }
    handleClick = (e) => {
        this.props.handleButton(e.target.parentNode.id)
        console.log(e.target.parentNode.id)
    }
    render() {
        const {item} = this.props.cartItems
        console.log(this.props.items)
        return(
            <div className="cart-float-container">
                <div className="cart-float-header">
                    <h3>Your Cart Summary</h3>
                    <button 
                        id='cartFloatBtn'
                        onClick={this.handleClick}
                        className="pop-head"
                    >
                        <AiFillCloseCircle id='cartFloatBtn' />
                    </button>
                </div>
                    <div className="cart-item-header">
                        <h4>Item</h4>
                        <h4>Price</h4>
                        <h4>Quantity</h4>
                        <h4>Total</h4>
                    </div>
                    <div className="cart-item-container">
                        {this.props.cartItems ?
                            this.props.cartItems.map((item) => (
                                <CartItem data={item} />
                            ))

                        : ''}
                    </div>
                    <div className="cart-total">Cart Total:</div>
                    <Button className='btn checkout-btn'name='Checkout' />
            </div>
        )
    }
}

export default CartFloat