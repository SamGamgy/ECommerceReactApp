import React from 'react'
import SignUpLogin from '../SignUpLogin/SignUpLogin';
import StatusBar from '../StatusBar/StatusBar';
import Summary from '../Summary/Summary';
import Cart from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment'
import Confirmation from '../Confirmation/Confirmation'

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
        }
    }

    grabShipping = (shipType) => {
        this.setState({shipping: shipType})
    }

    handleScreenChangeRender = (leaveScreen, GoToScreen) => {
        this.setState({[leaveScreen]:false, [GoToScreen]:true,})
    }
    // handleCartRender = (false) => {
    //     this.setState({cartScreen:false, shipScreen:true})
    // }
    // handleBackToCartRender = (false) => {
    //     this.setState({shipScreen:false, cartScreen:true})
    // }
    // handleShipRender = (false) => {
    //     this.setState({shipScreen:false, payScreen:true})
    // }
    // handleBackToShipRender = (false) => {
    //     this.setState({payScreen:false, shipScreen:true})
    // }
    // handlePayRender = (false) => {
    //     this.setState({payScreen:false, confirmScreen:true})
    // }
    // handleBackToHomeRender = (false) => {
    //     this.setState({confirmScreen:false, logInScreen:true})
    // }
    render() {
        return(
            <header className="App-header">
        {/* 1 */}
        {this.state.logInScreen && <SignUpLogin logIn={this.handleScreenChangeRender}/>}
        {/* 2 */}
        {this.state.cartScreen &&
        <div className='cart-screen'>
            <StatusBar one={true}/>
            <Cart/>
            <Summary cart= {this.handleScreenChangeRender} one={true}/>
        </div>
        }
        {/* 3 */}
        {this.state.shipScreen &&
         <div className='shipping-screen'>
             <StatusBar one={true} two={true}/> 
              <Shipping 
                ship = {this.handleScreenChangeRender}
                shippingType = {this.grabShipping}
                />
             <Summary 
                ship = {this.handleScreenChangeRender} 
                two={true} 
                shippingType={this.state.shipping}
            /> 
        </div> 
        }
        {/* 4 */}
        {this.state.payScreen &&
        <div className='payment-screen'>
            <StatusBar one={true} two={true} three={true}/>
            <Payment back= {this.handleScreenChangeRender} pay={this.handleScreenChangeRender}/>
            <Summary  pay= {this.handleScreenChangeRender} three={true}/>
        </div>
        }
        {/* 5 */}
        {this.state.confirmScreen && 
        <div className='confirmation-screen'>
            <StatusBar one={true} two={true} three={true} four={true}/>
            <Confirmation confirm={this.handleScreenChangeRender}/>
            <Summary four={true}/>
        </div>
        }

      </header>
        )
    }
}

export default Container