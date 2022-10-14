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
        if (id==='cartBtn') {this.setState({cartFloat:true,})}
        else if (id === 'cartFloatBtn') { this.setState({cartFloat:false})}
        else {this.props.handleButton(id)}
        
    }
    handleUpdateCart = (quantity, data) => {
        let input = {quantity: quantity, item: data};
        this.setState((prevState) => ({cart: [...prevState.cart,  input]}))

        cartTotal += quantity
        this.setState({cartTotal:cartTotal})
        this.props.cartTotal(quantity, data)
    }
    openCartScreen = (initial, target) => {
        this.props.openCartScreen(initial, target)
    }
    render() {
        return (
            <div>
                {this.state.cartFloat && <CartFloat openCartScreen={this.openCartScreen} cartItems={this.state.cart} handleButton={this.handleButton}/>}
                <NavBar userData={this.props.userData} buttonPress={this.handleButton} cartTotal={this.state.cartTotal}/>
                <Hero />
                <ProductDisplay cartQuantityUpdate={this.handleUpdateCart}/>
            </div>
        )
    }
}

export default HomeScreen