import React from "react";
import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import CartFloat from '../CartFloat/CartFloat'

let cartTotal = 0

class HomeScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state ={
            cart:[],
            cartTotal:0,
            cartFloat:false,
        }
    }
    handleButton = (id) => {
        console.log(id)
        if (id==='cartBtn') {this.setState({cartFloat:true,})}
        else if (id === 'cartFloatBtn') { this.setState({cartFloat:false})}
        else {this.props.handleButton(id)}
        
    }
    handleUpdateCart = (quantity, data) => {
        let input = {quantity: quantity, item: data};
        this.setState((prevState) => ({cart: [...prevState.cart,  input]}))

        cartTotal += quantity
        this.setState({cartTotal:cartTotal})
    }
    render() {
        return (
            <div>
                {this.state.cartFloat && <CartFloat cartItems={this.state.cart} handleButton={this.handleButton}/>}
                <NavBar buttonPress={this.handleButton} cartTotal={this.state.cartTotal}/>
                <Hero />
                <ProductDisplay cartQuantityUpdate={this.handleUpdateCart}/>
            </div>
        )
    }
}

export default HomeScreen