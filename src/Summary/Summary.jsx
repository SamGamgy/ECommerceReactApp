import React from 'react'
import './Summary.css'
import Promo from '../Promo/Promo'
import Button from '../Button/Button'
import CartSum from '../CartSum/CartSum'
import {cartItems} from '../data'
import PopUp from '../PopUp/PopUp'
import {CARDICON} from '../constants'

let total = 0;
for (const items of cartItems) {
    if (items.inCart) {
        total = total + items.price}
}

class Summary extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            shipping:'',
            subtotal:total, 
            cartQuantities:'',
            promo:0,
            disabled:false,
            promoPopUp:false,
            promoErrPopUp:false,
            trackErrPopUp:false,
        }
    }

    handleRender = () => {
        if(this.props.one) {
            this.props.handleScreenChange('cartScreen', 'shipScreen')
            this.setState({disabled:true})
        }
        else if(this.props.two) {
            this.props.handleScreenChange('shipScreen', 'payScreen')
            this.setState({disabled:true})
        }
        else if(this.props.three) {
            this.props.handleScreenChange('payScreen', 'confirmScreen')
            this.setState({disabled:true})
        }   
        if(this.props.four) {
            this.props.handleScreenChange('confirmScreen', 'logInScreen')
        }
    }

    grabPromo = (promo) => {
        if (promo === 'ten')  {
            this.props.promo('promoDiscount', 10)
            this.setState({promoPopUp:true}) 
        }
        else if (promo === 'twenty')  {
            this.props.promo('promoDiscount', 20)
            this.setState({promoPopUp:true})
        } 
        else {this.setState({promoErrPopUp:true})}
    }
    closePopUp =()=> {
        this.setState({promoPopUp:false, promoErrPopUp:false, trackErrPopUp:false,})
    }
    
    render() {

        let payOrConfirmScreen= this.props.three || this.props.four
        let summaryStyle= {}
        let buttonRender= ''
        let buttonName='Click'

        if (this.props.one){buttonName='Shipping info'}
        else if (this.props.two) {buttonName='Payment info'}
        else if (this.props.three) {buttonRender='hidden'}
        else if (this.props.four) {
            summaryStyle= {top:'16%', width:'47%'}
            buttonRender='hidden'};

        let cardType= this.props.cardType
        let lastFour= this.props.lastFour
        let cartTotal = this.props.totals ? 
            `$${this.props.totals - (this.props.promoDiscount ? this.props.promoDiscount : 0) + (this.props.shipType === 'express' ? 5 : 0) }` 
            : 
            `$${(this.state.subtotal-(this.props.promoDiscount ? this.props.promoDiscount : 0))}`

        return(
            <div style={summaryStyle} className='container summary'>
                <div className="header-sum">
                    <h3>SUMMARY</h3>
                </div>
                <hr />
                {!this.props.four && 
                    <Promo promo={this.grabPromo}/> }
                {this.props.two || this.props.three || this.props.four? 
                    <CartSum cart={this.props.cart} /> 
                    : null}  
                <hr />
                <div className="totals">
                    <div className='subtotals'>
                        <div className='label'>Cart Subtotal:</div>
                        <div className='attribute'>{this.props.totals ? `$${this.props.totals}` : `$${this.state.subtotal}`}</div>
                    </div>
                    <div className='subtotals'>
                        <div className='label'>Shipping & Handling:</div>
                        <div className='attribute'>{this.props.shipType === 'express' ? '$5.00' : '$0.00'}</div>
                    </div>
                    <div className='subtotals'>   
                        <div className='label'>Discount:</div>
                        <div className='attribute'>{this.props.promoDiscount ? `-$${this.props.promoDiscount}.00` : '-$0.00'}</div>
                    </div>
                    <div className='subtotals'>    
                        <div className='label'>Cart Total:</div>
                        <div className='attribute total'>{cartTotal}</div>
                    </div>
                </div>
                {this.props.three ?
                <div className='ship-address'>
                    <hr/>
                    <h4>SHIPMENT ADDRESS</h4>
                    <p className='address'>{(this.props.shipping.surName)}, {this.props.shipping.title}</p>
                    <p className='address'>{this.props.shipping.address}</p>
                    <p className='address'>{this.props.shipping.city}, {this.props.shipping.state} {this.props.shipping.zip} <br /> {this.props.shipping.country}</p>
                </div>
                :null}
                <hr />
                <div>
                    { (payOrConfirmScreen && this.props.shipType === 'standard' ) &&
                    
                    <div className='ship-type'>
                        <h4>SHIPMENT METHOD</h4>
                        <div className='flex'>
                            <div className='ship-method'>STANDARD</div>
                            <div className='ship-descript'>Deliver in 4-6 working days</div>
                        </div>
                    </div>
                    }
                     {(payOrConfirmScreen && this.props.shipType === 'express' ) &&
                    <div className='ship-type'>
                        <h4>SHIPMENT METHOD</h4>
                        <div className='flex'>
                            <div className='ship-method'>EXPRESS</div>
                            <div className='ship-descript'>Deliver in 1-3 working days</div>
                        </div>
                    </div>
                    }
                    {this.props.four &&
                    <div className='payment-sum'>
                        <hr />
                        <h4>PAYMENT</h4>
                        <div className='flex'>
                            <img 
                                style= {{ width:'50px',height:'33px'}}
                                src={CARDICON[cardType]} 
                                alt='card icon'
                            />
                            <div className='ship-method'> Ending in {lastFour}</div>
                            <div className='ship-descript'>Total Payment: {cartTotal}</div>
                        </div>
                    </div>
                    }
                </div>
                {this.props.formCheck || this.props.totals === '0.00' ? 
                <div className='btn-wrapper'>
                    <Button 
                        onClick={this.handleRender}
                        name= {buttonName}
                        className={`btn ${buttonRender}`}
                        isDisable={true}
                    />
                </div>
                :
                <div className='btn-wrapper'>
                    <Button 
                        onClick={this.handleRender}
                        name= {buttonName}
                        className={`btn ${buttonRender}`}
                    />
                </div>
                }
                {this.state.promoPopUp && 
                <PopUp 
                    popUp={this.closePopUp} 
                    titleStyle={{position:'relative', top:'0',left:'0', color:'rgb(66,103,178)'}} 
                    title='Discount Code Applied!' 
                    message={`Congratulations, you had $${this.props.promoDiscount} taken off your total`}
                />}

                {this.state.promoErrPopUp && 
                <PopUp 
                    popUp={this.closePopUp} 
                    titleStyle={{position:'relative', top:'0',left:'0', color:'rgb(192,67,67)'}} 
                    title='Invalid Promo Code' 
                    message='Hint: Try using 10OFF or 20OFF'
                />}
            </div>
        )
    }
} 

export default Summary