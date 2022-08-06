import React from 'react'
import './Shipping.css'
import {countryArray, cityArray, stateArray} from '../data'
import FormElement from '../FormElement/FormElement'
import Button from '../Button/Button'

class Shipping extends React.Component {
    constructor() {
        super()
        this.state= {
            shipping:''
        }
    }
    captureShipping = (e) => {
        console.log(e.target.label)
        this.setState({shipping: e.target.value})
        this.props.shippingType(e.target.value)
    }

    handleChange = (e) => {
        console.log(e.target.la)
    }
    handleRender = () => {

        this.props.ship('shipScreen', 'cartScreen')
    }
    render() {
        

        return(
            <div className='container main'>
                <div className= 'header'>
                    <div className='titles'>Shipping Information</div>
                </div>
                    <form className='form-temp'>
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Address Title'
                        />
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Name - Surname'
                        />
                        <FormElement 
                            className="address-inputs"
                            type='input' 
                            label='Your Address'
                        />
                        <div className='ship-dropdowns'>
                            <FormElement 
                                type='input' 
                                label='Zip Code'
                                className='zip'
                                labelClass='zip-label'
                            />
                            <FormElement 
                                type='select' 
                                label='Country' 
                                array={countryArray}
                                className='dropdowns'
                                labelClass='drop-label'
                            />
                            <FormElement 
                                type='select' 
                                label='City'
                                array={cityArray}
                                className='dropdowns'
                                labelClass='drop-label'
                            />
                            <FormElement 
                                type='select' 
                                label='State'
                                array={stateArray}
                                className='dropdowns'
                                labelClass='drop-label'
                            />
                        </div>
                        <div className='phone-input'>
                            <div className='area-code'>
                                <FormElement 
                                    type='input' 
                                    label='Cell Phone' 
                                    placeholder='0'
                                    className='country-code'
                                />
                                <FormElement 
                                    type='input'
                                    className='area'
                                    labelClass='none'
                                />
                            </div>
                            <FormElement 
                                type='input' labelClass='none'
                                className='phone-num-input'
                            />
                        </div>
                        <div className='phone-input'>
                            <div className='area-code'>
                                <FormElement 
                                    type='input' 
                                    label='Telephone'
                                    placeholder='0'
                                    className='country-code'
                                />
                                <FormElement 
                                    type='input'
                                    className='area'
                                    labelClass='none'
                                />
                            </div>
                            <FormElement 
                                type='input' labelClass='none'
                                className='phone-num-input'
                            />
                        </div>
                    </form>
                <hr/>
                <div>
                    <div className= 'header'>
                        <div className='titles'>Shipping Method</div>
                    </div>
                    <div className='flex-wrapper'>
                        <FormElement 
                            type='radio' 
                            name='shipping'
                            label='Standard'
                            value='standard'
                            onChange={this.captureShipping}
                            contClass='ship'
                            inputClass='ship-radio'
                        />
                        <span className='ship-info'>
                            Delivery in 4-6 Business Days - Free($40min)
                        </span>
                    </div>
                    
                    <div className='flex-wrapper'>
                        <FormElement 
                            type='radio' 
                            name='shipping'
                            label='Express'
                            value='express'
                            onChange={this.captureShipping}
                            contClass='ship'
                            inputClass='ship-radio'
                        />
                        <span className='ship-info'>
                            Delivery in 1-3 Business Days - $5.00
                        </span>
                    </div>
                <div className='back-button'>
                <Button 
                    onClick={this.handleRender}
                    className='btn clear'
                    name='Back to Cart'
                    />
                </div>
                </div>

            </div>

        )
    }
} 

export default Shipping