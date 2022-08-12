import React from 'react'
import './Summary.css'
import Promo from '../Promo/Promo'
import Button from '../Button/Button'
import CartSum from '../CartSum/CartSum'
import {cartItems} from '../data'


let total = 0;
for (const items of cartItems) {
    total = total + items.price
}


class Summary extends React.Component {
    constructor() {
        super()
        this.state= {
            shipping:'',
            subtotal:total, 
            cartQuantities:'',
            promo:0,
        }
    }

    handleRender = () => {
        if(this.props.one) {
            this.props.cart('cartScreen', 'shipScreen')
        }
        else if(this.props.two) {
            this.props.ship('shipScreen', 'payScreen')
        }
        else if(this.props.three) {
            this.props.pay('payScreen', 'confirmScreen')
        }
        if(this.props.four) {
            this.props.cart('confirmScreen', 'logInScreen')
        }
    }

    grabPromo = (promo) => {
        // this.setState({isPromo:boolean})
        if (promo === 'ten')  {this.props.promo('promoDiscount', 10)} 
        else if (promo === 'twenty')  {this.props.promo('promoDiscount', 20)} 
        else {alert('Invalid Promo Code')}
    }
    render() {

        let payOrConfirmScreen= this.props.three || this.props.four
        // Conditional renders
        let summaryStyle= {}
        let buttonRender= ''
        let buttonName='Click'

        if (this.props.one){buttonName='Shipping info'}
        else if (this.props.two) {buttonName='Payment info'}
        else if (this.props.three) {buttonName='Pay'}
        else if (this.props.four)
        {   summaryStyle= {top:'16%', width:'47%'}
            buttonRender='hidden'};

        return(
            <div 
                style={summaryStyle}
                className='container summary'>
                <div className="header-sum">
                    <h3>SUMMARY</h3>
                </div>
                <hr />
                {this.props.one ? <Promo promo={this.grabPromo}/> : null } 
                {this.props.two || this.props.three || this.props.four? <CartSum/> : null}  
                <hr />
                {/* <Totals quantities={this.props.totals}/> */}
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
                        <div className='attribute total'>{
                            
                        this.props.totals ? 
                        `$${this.props.totals - (this.props.promoDiscount ? this.props.promoDiscount : 0) + (this.props.shipType === 'express' ? 5 : 0) }` : 
                        (this.props.promoDiscount ? 
                        `$${this.state.subtotal-this.props.promoDiscount}`: 
                        this.state.subtotal)
                        }</div>
                    </div>
                </div>
                {this.props.three ?
                <div className='ship-address'>
                    <hr/>
                    <h4>SHIPMENT ADDRESS</h4>
                    <p className='address'>{(this.props.shipping.name)}, {this.props.shipping.title}</p>
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
                    
                </div>
                <div className='btn-wrapper'>
                    <Button 
                    onClick={this.handleRender}
                    name= {buttonName}
                    className={`btn ${buttonRender}`}/>
                </div>

            </div>

        )
    }
} 

export default Summary