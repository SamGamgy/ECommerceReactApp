import React from 'react'
import './Payment.css'
import {monthArray, yearArray} from '../data'
import FormElement from '../FormElement/FormElement'
import Button from '../Button/Button'

class Payment extends React.Component {
    constructor() {
        super()
        this.state= {

        }
    }

    handleChange = (e) => {
        console.log(e.target.value)
    }

    backPage = () => {
        this.props.back('payScreen', 'shipScreen')
    }
    handlePay = (e) => {
        e.preventDefault();
        this.props.pay('payScreen', 'confirmScreen')
    }

    render() {
        

        return(
            <div className='container main'>
                <div className= 'pay header'>
                    <div className='titles'>Payment Information</div>
                </div>
                    <form className='form-temp pay-form'>
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Cardholders Name'
                        />
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Card Number'
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
                                placeholder='Month'
                                labelClass='drop-label'
                            />
                            <FormElement 
                                type='select' 
                                array={yearArray}
                                className='dropdowns'
                                placeholder='Year'
                                labelClass='drop-label'
                            />
                        </div>
                        <div className='payment'>
                                <FormElement 
                                    type='input' 
                                    label='CVV' 
                                    className='cvv'
                                />
                        </div>
                        <div>
                            <Button 
                                onClick={this.handlePay}
                                className='btn pay-total' 
                                name='Pay {this.state.total}'/>
                        </div>
                    </form>
                <hr/>
                
                <div className='back-button'>
                <Button 
                    onClick={this.backPage}
                    className='btn clear sm-text'
                    name='Back to Address'/> 
                </div>
            </div>

        )
    }
} 

export default Payment