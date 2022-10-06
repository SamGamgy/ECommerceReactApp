import React from 'react'
import SignUpLogin from '../SignUpLogin/SignUpLogin';
import StatusBar from '../StatusBar/StatusBar';
import Summary from '../Summary/Summary';
import Cart from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment'
import Confirmation from '../Confirmation/Confirmation'
import {cartItems} from '../data'
import HomeScreen from '../HomeScreen/HomeScreen'


class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            homeScreen:true,
            logInScreen:false,
            cartScreen:false,
            shipScreen:false,
            payScreen:false,
            confirmScreen:false,
            shipping:'',
            cartQuantities:{},
            shipInfo:{},
            promoDiscount:0,
            isMissing:true,
        }
    }

    grabShipping = (shipType) => {
        this.setState({shipping: shipType}, this.calcTotal)
    }
    calcTotal = () => {
        if (this.state.shipping === 'express') {
            let total = this.state.adjustedSubtotal - this.state.promoDiscount + 5
            this.setState({cartTotal:total.toFixed(2)})
        } else {
            let total = this.state.adjustedSubtotal - this.state.promoDiscount
            this.setState({cartTotal:total.toFixed(2)})
        }
    }
    handleScreenChangeRender = (leaveScreen, GoToScreen) => {
        this.setState({[leaveScreen]:false, [GoToScreen]:true,})
    }
    handleStateInfo = (name, value) => {
        if (name === 'promoDiscount') {
            this.setState({[name]: value}, this.calcTotal)
        }
        else this.setState({[name]: value})
    }
    handleShipInfo = (name, value) => {
        this.setState((prevState) => ({shipInfo: {...prevState.shipInfo, [name]: value}}))
    }
    handleQuantity = (cartObject) => {
        let sum=0;
        let adjCartItems=[]
        let cart = cartObject
        for (const [key,value] of Object.entries(cart)) {
            let itemNum= (key.slice(4,5)-1)
            let cartItem= cartItems[itemNum].price
            let cartItemQuant = cartItem*value
            adjCartItems.push(cartItemQuant)
            sum = sum + cartItemQuant 
            }
        this.setState({cartQuantities: adjCartItems})
        this.setState({adjustedSubtotal:sum.toFixed(2)})
    }
    passFormCheck = (boolean) => {
            this.setState({isMissing:boolean})
    }
    handleButton=(btn)=>{
        btn ==='logInBtn' &&
        this.setState({homeScreen:false, logInScreen:true})
        btn === 'cartBtn' &&
        this.setState({homeScreen:false, cartScreen:true})
        btn === 'homeBtn' &&
        this.setState({homeScreen:true, logInScreen:false})
    }
    render() {
        return(
            <header className="App-header">
        {this.state.homeScreen && 
            <HomeScreen handleButton={this.handleButton}/>}
        {/* 1 */}
        {this.state.logInScreen && 
            <SignUpLogin handleButton={this.handleButton} logIn={this.handleScreenChangeRender}/>}
        {/* 2 */}
        {this.state.cartScreen &&
            <div className='cart-screen'>
                <StatusBar one={true}/>
                <Cart cartItemQuantity={this.handleQuantity}/>
                <Summary 
                    one={true}
                    cart={this.handleScreenChangeRender}
                    totals= {this.state.adjustedSubtotal} 
                    promo={this.handleStateInfo}
                    promoDiscount={this.state.promoDiscount}
                    cartCheck={this.state.adjustedSubtotal}
                />
            </div>
        }
        {/* 3 */}
        {this.state.shipScreen &&
            <div className='shipping-screen'>
                <StatusBar one={true} two={true}/> 
                <Shipping 
                    ship = {this.handleScreenChangeRender}
                    shippingType = {this.grabShipping}
                    values={this.handleShipInfo}
                    shipping= {this.state.shipInfo}
                    isFormFilled={this.passFormCheck}
                />
                <Summary 
                    two={true} 
                    cartQuantities= {this.state.cartQuantities}
                    ship = {this.handleScreenChangeRender} 
                    shippingType={this.state.shipping}
                     totals= {this.state.adjustedSubtotal}
                    promoDiscount={this.state.promoDiscount}
                    formCheck={this.state.isMissing}
                    promo={this.handleStateInfo}
                /> 
        </div> }
        {/* 4 */}
        {this.state.payScreen &&
            <div className='payment-screen'>
                <StatusBar one={true} two={true} three={true}/>
                <Payment 
                    cartTotal= {this.state.cartTotal} 
                    back= {this.handleScreenChangeRender} 
                    pay={this.handleScreenChangeRender}
                    promoDiscount={this.state.promoDiscount}
                    cardType={this.handleStateInfo}
                    lastFour={this.handleStateInfo}
                />
                <Summary  
                    three={true}
                    cartQuantities= {this.state.cartQuantities}
                    shipType= {this.state.shipping} 
                    pay= {this.handleScreenChangeRender} 
                    shipping= {this.state.shipInfo}
                    totals= {this.state.adjustedSubtotal}
                    promoDiscount={this.state.promoDiscount}
                    promo={this.handleStateInfo}
                />
            </div> }
        {/* 5 */}
        {this.state.confirmScreen && 
            <div className='confirmation-screen'>
                <StatusBar one={true} two={true} three={true} four={true}/>
                <Confirmation confirm={this.handleScreenChangeRender}/>
                <Summary 
                    four={true} 
                    shipType= {this.state.shipping}
                    totals= {this.state.adjustedSubtotal}
                    cartQuantities= {this.state.cartQuantities}
                    promoDiscount={this.state.promoDiscount}
                    promo={this.handleStateInfo}
                    lastFour={this.state.lastFour}
                    cardType={this.state.cardType}
                />
            </div>}
      </header>
        )
    }
}

export default Container