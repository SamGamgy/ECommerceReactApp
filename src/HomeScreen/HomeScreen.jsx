import React from "react";
import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import CartFloat from '../CartFloat/CartFloat'



class HomeScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state ={
            cartFloat:false,
        }
    }
    handleButton = (id) => {
        if (id === 'logInBtn') {
            this.props.handleButton(id)
        }
        else if(!this.state.cartFloat) {
            this.setState({cartFloat:true,})
        }
        else if(this.state.cartFloat) { 
            this.setState({cartFloat:false})
        }
            
    }
    handleUpdateCart = (quantity, data, add) => {
        // console.log(quantity, data)
        // let input = {quantity: quantity, item: data};
        // this.setState((prevState) => ({cart: [...prevState.cart,  input]}))
        
        // cartTotal += quantity
        // this.setState({cartTotal:cartTotal})
        if (add === 'add') {
            this.props.updateCart(quantity, data, 'add')
        }
        else {
            this.props.updateCart(quantity, data)
        }
    }
    // handleNewCart = (newCart) => {
    //     this.setState({cart:newCart})
    //     let newCartTotal = 0;
    //     newCart.map(item => {
    //         return newCartTotal += item.quantity
    //     })
    //     this.setState({cartTotal:newCartTotal})
    //     this.props.loadNewCart('cart', newCart)
    // }
    openCartScreen = (initial, target) => {
        this.props.openCartScreen(initial, target)
    }
    render() {
        return (
            <div>
                {this.state.cartFloat && 
                <CartFloat 
                    openCartScreen={this.openCartScreen} 
                    cartItems={this.props.passDownCart}
                    cartTotal={this.props.cartTotal} 
                    handleButton={this.handleButton}
                    updatedCart={this.handleUpdateCart}
                />}
                <NavBar userData={this.props.userData} buttonPress={this.handleButton} cart={this.props.passDownCart}/>
                <Hero />
                <ProductDisplay cartQuantityUpdate={this.handleUpdateCart}/>
            </div>
        )
    }
}

export default HomeScreen