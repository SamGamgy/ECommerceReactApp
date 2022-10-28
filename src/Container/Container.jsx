import React from 'react'
import SignUpLogin from '../SignUpLogin/SignUpLogin';
import StatusBar from '../StatusBar/StatusBar';
import Summary from '../Summary/Summary';
import Cart from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment'
import Confirmation from '../Confirmation/Confirmation'
// import {cartItems} from '../data'
import HomeScreen from '../HomeScreen/HomeScreen'
import PopUp from '../PopUp/PopUp';

// let cartQuant = 0
// let cartTotal = 0

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
            cart:[],
            cartTotalPrice:0,
            cartTotalItems:0,
            shipInfo:{},
            promoDiscount:0,
            isMissing:true,
            userData:'',
            logInPopUp:false,
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
        if (this.state.userData === '' && GoToScreen === 'cartScreen') {
            this.setState({[leaveScreen]:false, logInScreen:true, logInPopUp:true})
        }
        else {this.setState({[leaveScreen]:false, [GoToScreen]:true,})}
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
    handleCart = (quantity, data, add) => {
        let isInCart=false;
        let cart = this.state.cart;

        cart.map((item) => {
            if (item.item === data) {
                return isInCart = true
            }
            else {return ''}
        });

        this.setState((prevState) => {
            if (isInCart && add === 'add') {
                cart.map((item) => {
                    if (item.item === data) {
                        let index = cart.indexOf(item)
                        let newCart= Array.from(prevState.cart);
                        newCart[index].quantity += (quantity/2)
                        this.setState({cart:newCart, cartTotal: (newCart.reduce((total, cv) => total = total + ((cv.item.price * 1) * cv.quantity), 0))})
                    }
                    return ''
                })
            }
            else if (isInCart) {
                cart.map((item) => {
                    if (item.item === data) {
                        let index = cart.indexOf(item)
                        let newCart= Array.from(prevState.cart)
                        newCart[index].quantity = quantity 
                        let filteredCart = newCart.filter(items => 
                            items.quantity !== 0 
                        )
                        return this.setState({cart:filteredCart, cartTotal: (filteredCart.reduce((total, cv) => total = total + ((cv.item.price * 1) * cv.quantity), 0))})
                    }
                    else {return ''}
                })
            } 
            else {
                let input = {quantity: quantity, item: data};
                return {cart: [...prevState.cart,  input], cartTotal: (cart.reduce((total, cv) => total = total + ((cv.item.price * 1) * cv.quantity), 0))}
            }
        });

        cart.reduce((total, cv) => total = total + ((cv.item.price * 1) * cv.quantity), 0)

        // let cartTotal = 
        //     `$${(total - (this.props.promoDiscount ? this.props.promoDiscount : 0) + (this.props.shipType === 'express' ? 5 : 0)).toFixed(2) }`
        // this.setState({}) 
        // cartTotal =+ (quantity * data.price) 
        // this.setState((prevState) => ({cartTotalPrice: (prevState.cartTotalPrice + cartTotal)}))
        // this.handleQuantity()
    }
    // getTotals = (prop) => {
    //     const sum = this.state.cart.reduce((prev, curr, index, array) => prev + curr[prop], 0)
    //     console.log(curr)
    //     return sum
    // }
    handleQuantity = () => {
        // this.setState({cartTotalItems: this.getTotals('quantity'), cartTotalPrice: this.getTotals('item.price')})
        // let sum=0;
        // let adjCartItems=[]
        // let cart = cartObject
        // for (const [key,value] of Object.entries(cart)) {
        //     let itemNum= (key.slice(4,5)-1)
        //     let cartItem= cartItems[itemNum].price
        //     let cartItemQuant = cartItem*value
        //     adjCartItems.push(cartItemQuant)
        //     sum = sum + cartItemQuant 
        //     }
        // this.setState({cartQuantities: adjCartItems})
        // this.setState({adjustedSubtotal:sum.toFixed(2)})
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
        {this.state.logInPopUp && 
            <PopUp
                title='Please Log In'
                titleStyle={{color: '#349723f0'}}
                message='You must be logged in, in order to proceed to checkout'
                popUp={this.handleStateInfo}
            />}
        {this.state.homeScreen && 
            <HomeScreen 
                openCartScreen={this.handleScreenChangeRender}
                updateCart={this.handleCart}
                passDownCart={this.state.cart}
                cartTotal={this.state.cartTotalPrice}
                loadNewCart={this.handleStateInfo}
                userData={this.state.userData} 
                handleButton={this.handleButton}
            />}
        {/* 1 */}
        {this.state.logInScreen && 
            <SignUpLogin 
                userData= {this.handleStateInfo} 
                handleButton={this.handleButton} 
                logIn={this.handleScreenChangeRender}
            />}
        {/* 2 */}
        {this.state.cartScreen &&
            <div className='cart-screen'>
                <StatusBar one={true}/>
                <Cart 
                    cart={this.state.cart}
                    backToHome={this.handleScreenChangeRender}
                    updatedCart={this.handleCart}
                />
                <Summary 
                    one={true}
                    handleScreenChange={this.handleScreenChangeRender}
                    cart={this.state.cart}
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
                    handleScreenChange = {this.handleScreenChangeRender}
                    shippingType = {this.grabShipping}
                    values={this.handleShipInfo}
                    shipping= {this.state.shipInfo}
                    isFormFilled={this.passFormCheck}
                />
                <Summary 
                    two={true} 
                    cart= {this.state.cart}
                    handleScreenChange = {this.handleScreenChangeRender} 
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
                    cart= {this.state.cart} 
                    back= {this.handleScreenChangeRender} 
                    pay={this.handleScreenChangeRender}
                    promoDiscount={this.state.promoDiscount}
                    cardType={this.handleStateInfo}
                    lastFour={this.handleStateInfo}
                />
                <Summary  
                    three={true}
                    cart= {this.state.cart}
                    // cartQuantities= {this.state.cartQuantities}
                    shipType= {this.state.shipping} 
                    handleScreenChange= {this.handleScreenChangeRender} 
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
                    cart= {this.state.cart}
                    shipType= {this.state.shipping}
                    totals= {this.state.adjustedSubtotal}
                    // cartQuantities= {this.state.cartQuantities}
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