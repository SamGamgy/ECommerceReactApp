import React from 'react'
import SignUpLogin from '../SignUpLogin/SignUpLogin';
import StatusBar from '../StatusBar/StatusBar';
import Summary from '../Summary/Summary';
import Cart from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment'
import Confirmation from '../Confirmation/Confirmation'
import {cartItems} from '../data'



class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            logInScreen:true,
            cartScreen:false,
            shipScreen:false,
            payScreen:false,
            confirmScreen:false,
            shipping:'',
            cartQuantities:{},
            shipInfo:{},
            promoDiscount:0,
        }
    }

    grabShipping = (shipType) => {
        this.setState({shipping: shipType}, this.calcTotal)
    }
    calcTotal = () => {
        if (this.state.shipping === 'express') {
            let total = this.state.adjustedSubtotal - this.state.promoDiscount + 5
            this.setState({cartTotal:total})
        } else {
            let total = this.state.adjustedSubtotal - this.state.promoDiscount
            this.setState({cartTotal:total})
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
    
        let cart = cartObject
        for (const [key,value] of Object.entries(cart)) {
            let itemNum= (key.slice(4,5)-1)
            let cartItem= cartItems[itemNum].price
            let cartItemQuant = cartItem*value
            sum = sum + cartItemQuant 
            console.log(sum)
            }
        this.setState({adjustedSubtotal:sum.toFixed(2)})
    }
    render() {
        return(
            <header className="App-header">
        {/* 1 */}
        {this.state.logInScreen && <SignUpLogin logIn={this.handleScreenChangeRender}/>}
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
                />
             <Summary 
                two={true} 
                ship = {this.handleScreenChangeRender} 
                shippingType={this.state.shipping}
                totals= {this.state.adjustedSubtotal}
                promoDiscount={this.state.promoDiscount}
                
            /> 
        </div> 
        }
        {/* 4 */}
        {this.state.payScreen &&
        <div className='payment-screen'>
            <StatusBar one={true} two={true} three={true}/>
            <Payment cartTotal= {this.state.cartTotal} back= {this.handleScreenChangeRender} pay={this.handleScreenChangeRender}/>
            <Summary  
                three={true}
                shipType= {this.state.shipping} 
                pay= {this.handleScreenChangeRender} 
                shipping= {this.state.shipInfo}
                totals= {this.state.adjustedSubtotal}
                promoDiscount={this.state.promoDiscount}
            />
        </div>
        }
        {/* 5 */}
        {this.state.confirmScreen && 
        <div className='confirmation-screen'>
            <StatusBar one={true} two={true} three={true} four={true}/>
            <Confirmation confirm={this.handleScreenChangeRender}/>
            <Summary 
                four={true} 
                shipType= {this.state.shipping}
                totals= {this.state.adjustedSubtotal}
                promoDiscount={this.state.promoDiscount}
            />
        </div>
        }

      </header>
        )
    }
}

export default Container