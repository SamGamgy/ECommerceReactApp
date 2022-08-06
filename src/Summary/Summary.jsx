import React from 'react'
import './Summary.css'
import Promo from '../Promo/Promo'
import Totals from '../Totals/Totals'
import Button from '../Button/Button'
import CartSum from '../CartSum/CartSum'

class Summary extends React.Component {
    constructor() {
        super()
        this.state= {
            shipping:'',
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

    render() {

        // Conditional renders
        let summaryStyle= {}
        let buttonRender= ''
        let buttonName='Click'
        if (this.props.one) 
        {buttonName='Shipping info'}
        else if (this.props.two) 
        {buttonName='Payment info'}
        else if (this.props.three) 
        {buttonName='Pay'}
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
                {this.props.one ? <Promo/> : null} 
                {this.props.two ? <CartSum/> : null}  
                <hr />
                <Totals/>
                
                {this.props.three ?
                <div>
                    <h3>SHIPMENT ADDRESS</h3>
                    <p className='address'></p>
                    <p className='address'></p>
                    <p className='address'></p>
                </div>
                :null}
                <hr />
                <div>
                    
                    { (this.props.shippingType === 'standard' && this.props.three) &&
                    
                    <div>
                        <h3>SHIPMENT METHOD</h3>
                        <div className='ship-method'>STANDARD</div>
                        <div className='ship-descript'>Deliver in 4-6 working days</div>
                    </div>
                    }
                     {(this.props.shippingType === 'express' && this.props.three) &&
                    <div>
                        <h3>SHIPMENT METHOD</h3>
                        <div className='ship-method'>EXPRESS</div>
                        <div className='ship-descript'>Deliver in 1-3 working days</div>
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