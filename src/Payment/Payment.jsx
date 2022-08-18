import React from 'react'
import './Payment.css'
import {monthArray, yearArray} from '../data'
import FormElement from '../FormElement/FormElement'
import Button from '../Button/Button'
import { OTHERCARDS } from '../constants';
import { cardExpireValidation, cardNumberValidation, onlyTextValidation, securityCodeValidation } from "../validations";
import PopUp from '../PopUp/PopUp'
import {cartItems} from '../data'

const INIT_CARD = {
    card:'',
    cardHolder:'',
    securityCode:'',
    exp:'',
}

let total = 0;
for (const items of cartItems) {
    total = total + items.price
}

class Payment extends React.Component {
    constructor() {
        super()
        this.state= {
            cardData:INIT_CARD,
            cardType:null,
            error:{},
            month:'',
            year:'',
            maxLength: OTHERCARDS.length,
            errPopUp:false,
            baseTotal:total,
        }
    }

    handleBlur = (e) => {
        this.handleValidations(e.target.name, e.target.value);
    }
    
    handleValidations = (type, value) => {
        let errorText;
        switch(type) {
            case 'card':
                errorText = cardNumberValidation(value)
                this.setState((prevState) => ({
                    cardType: this.findDebitCardType(value),
                    error: {
                        ...prevState.error,
                        cardError: errorText,
                    },
                }));
                break;
            case 'cardHolder':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {...prevState.error, cardHolderError:errorText}
                }))
                break;
            case 'year':
                errorText = cardExpireValidation(this.state.cardData.exp);
                this.setState((prevState) => ({
                    error: {...prevState.error, expError:errorText}
                }))
                break;
            case 'securityCode':
                errorText = securityCodeValidation(3, value);
                this.setState((prevState) => ({
                    error: {...prevState.error, securityCodeError:errorText}
                }))
                break;
            default:
                break;
        }
    }

    backPage = () => {
        this.props.back('payScreen', 'shipScreen')
    }

    findDebitCardType = (cardNumber) => {
        const regexPattern ={
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/
        };
        for (const card in regexPattern) {
            if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        }
        return '';
    }

    checkErrorBeforeSave = () => {
        let errorValue = {};
        let isError = false;
        Object.keys(this.state.cardData).forEach((val) => {
            if (!this.state.cardData[val].length) {
                errorValue= { ...errorValue, [`${val}Error`]: 'Required'};
                isError = true;
            }
        });
        Object.keys(this.state.error).forEach((val) => {
            if (this.state.error[val].length) {
                isError = true;
            }
        });

        this.setState({ error: errorValue });
        return isError;
    }

    handlePay = (e) => {
        e.preventDefault();

        const errorCheck = this.checkErrorBeforeSave();

        if(!errorCheck) {
            this.setState({
                cardData:INIT_CARD,
                cardType:null,
            })
            this.props.cardType('cardType', this.state.cardType);
            let cardLength= this.state.cardData.card.length;
            this.props.lastFour('lastFour', this.state.cardData.card.slice(cardLength-4));
            this.props.pay('payScreen', 'confirmScreen');

        } else {this.setState({errPopUp:true})}
    }

    closePopUp = () => {
        this.setState({errPopUp:false})
    }

    handleCardInput = (e) => {

        if (e.target.name === 'card') {
            let mask = e.target.value.split(' ').join('');
            if(mask.length) {
                let limit=19
                mask= mask.match(new RegExp('.{1,4}', 'g')).join(' ');

                this.setState((prevState) => ({cardData: {...prevState.cardData, [e.target.name]: mask.slice(0, limit)}}
                    )) 
            } else {
                this.setState((prevState) => ({cardData: {...prevState.cardData, [e.target.name]: ''}}
                    )) 
            }
        }
        else if (e.target.name === 'month' || e.target.name === 'year') {
            
            e.target.name === 'month' && this.setState({month: e.target.value}, this.handleExpDateConcat)
            if (e.target.name === 'year'){  
            let year=e.target.value
            let yearTwoDigit= year.slice(2,4)
            this.setState({year: yearTwoDigit}, this.handleExpDateConcat) ;
            }
        }
        else if(e.target.name === 'securityCode')
            {this.setState((prevState) => ({cardData: {...prevState.cardData, [e.target.name]: e.target.value.slice(0, 3)}}))}
        else {this.setState((prevState) => ({cardData: {...prevState.cardData, [e.target.name]: e.target.value}}))}
    }
    handleExpDateConcat = () => {
        let expDateString= `${this.state.month}/${this.state.year}`
        this.setState((prevState) => ({cardData: {...prevState.cardData, exp: expDateString}}))
    }
    render() {
        
        let cartTotal= `Pay $${this.props.cartTotal ? this.props.cartTotal : (this.state.baseTotal - (this.props.promoDiscount && this.props.promoDiscount))}`
        const {cardData, error} = this.state

        return(
            <div className='container main'>
                <div className= 'pay header'>
                    <div className='titles'>Payment Information</div>
                </div>
                    <form className='form-temp pay-form'>
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            name='cardHolder'
                            onChange={this.handleCardInput}
                            value= {cardData && cardData['cardHolder']}
                            label='Cardholders Name'
                            onBlur={this.handleBlur}
                            errorM={(error && error['cardHolderError'] && error['cardHolderError'].length > 1)
                                ? error['cardHolderError']
                                : null}
                        />
                        <FormElement 
                            className="name-inputs"
                            value= {cardData && cardData['card']}
                            name='card'
                            error='cardError'
                            onChange={this.handleCardInput}
                            type='input' 
                            label='Card Number'
                            cardType={this.state.cardType}
                            onBlur={this.handleBlur}
                            errorM={(error && error['cardError'] && error['cardError'].length > 1)
                                ? error['cardError']
                                : null}
                        />
                        <div className='pay-dropdowns'>
                            <FormElement 
                                type='input' 
                                label='Exp. Date'
                                className='hidden'
                            />
                            <FormElement 
                                type='select' 
                                array={monthArray}
                                className='dropdowns'
                                name='month'
                                placeholder='Month'
                                onChange={this.handleCardInput}
                                labelClass='drop-label'
                                onBlur={this.handleBlur}
                                
                            />
                            <FormElement 
                                type='select' 
                                array={yearArray}
                                className='dropdowns'
                                name='year'
                                placeholder='Year'
                                onChange={this.handleCardInput}
                                labelClass='drop-label'
                                onBlur={this.handleBlur}
                                errorM={(error && error['expError'] && error['expError'].length > 1)
                                ? error['expError']
                                : null}
                            />
                        </div>
                        <div className='payment'>
                                <FormElement 
                                    type='input' 
                                    label='CVV' 
                                    name='securityCode'
                                    error='cvvError'
                                    value= {this.state.cardData.securityCode}
                                    onChange={this.handleCardInput}
                                    className='cvv'
                                    onBlur={this.handleBlur}
                                    errorM={(error && error['securityCodeError'] && error['securityCodeError'].length > 1)
                                    ? error['securityCodeError']
                                    : null}
                                />
                        </div>
                        <div>
                            <Button 
                                onClick={this.handlePay}
                                className='btn pay-total' 
                                name= {cartTotal > 0 ? cartTotal : 'PAY $'+ this.state.baseTotal}/>
                        </div>
                    </form>
                <hr/>
                
                <div className='back-button'>
                <Button 
                    onClick={this.backPage}
                    className='btn clear sm-text'
                    name='Back to Address'/> 
                </div>
                {this.state.errPopUp && <PopUp popUp={this.closePopUp} titleStyle={{color:'rgb(175,0,0)'}} title='Payment Error' message='Please fix any errors before trying to pay'/>}
            </div>

        )
    }
} 

export default Payment