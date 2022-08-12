import React from 'react'
import './Cart.css'
import CartItem from '../CartItem/CartItem'
import {cartItems} from '../data'




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
        this.props.cartItemQuantity(this.state.cart)
    }
    handleDisplay = (boolean, index) => {
        cartItems[index].inCart = boolean

        // update quantity state to 0
        let cartItem= `item${index + 1}Quantity`
        cartItems[index].inCart === false && 
        this.setState((prevState) => ({cart: {...prevState.cart, [cartItem]: 0}}),this.updateProp)
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
                {cartItems.map((item) => 
                    item.inCart &&
                (
                    <CartItem 
                        index={cartItems.indexOf(item)}
                        img={item.img}
                        imgAlt={item.imgAlt}
                        sex={item.sex}
                        name={item.name}
                        color={item.color}
                        size={item.size}
                        price={item.price}
                        itemPrice={this.updateTotal}
                        display={this.handleDisplay}
                    />
                ))}
                    

            </div>

        )
    }
} 

export default Cart