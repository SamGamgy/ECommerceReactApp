import React from 'react'
import './Shipping.css'
import {countryArray, cityArray, stateArray} from '../data'
import FormElement from '../FormElement/FormElement'
import Button from '../Button/Button'

class Shipping extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            shipping:'',


        }
    }
    captureShipping = (e) => {
        this.setState({shipping: e.target.value})
        this.props.shippingType(e.target.value)
    }

    handleChange = (e) => {
        let state= e.target.name
        this.setState({[state]: e.target.value})

        this.props.values(e.target.name, e.target.value)
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
                            value={this.props.shipping.title}
                            name='title'
                            onChange={this.handleChange}
                        />
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Name - Surname'
                            value={this.props.shipping.name}
                            name='name'
                            onChange={this.handleChange}
                        />
                        <FormElement 
                            className="address-inputs"
                            type='input' 
                            label='Your Address'
                            value={this.props.shipping.address}
                            name='address'
                            onChange={this.handleChange}
                        />
                        <div className='ship-dropdowns'>
                            <FormElement 
                                type='input' 
                                label='Zip Code'
                                value={this.props.shipping.zip}
                                className='zip'
                                labelClass='zip-label'
                                name='zip'
                                onChange={this.handleChange}
                            />
                            <FormElement 
                                type='select' 
                                label='Country' 
                                value={this.props.shipping.country}
                                array={countryArray}
                                className='dropdowns'
                                labelClass='drop-label'
                                name='country'
                                onChange={this.handleChange}
                            />
                            <FormElement 
                                type='select' 
                                label='City'
                                value={this.props.shipping.city}
                                array={cityArray}
                                className='dropdowns'
                                labelClass='drop-label'
                                name='city'
                                onChange={this.handleChange}
                            />
                            <FormElement 
                                type='select' 
                                label='State'
                                value={this.props.shipping.state}
                                array={stateArray}
                                className='dropdowns'
                                labelClass='drop-label'
                                name='state'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='phone-input'>
                            <div className='area-code'>
                                <FormElement 
                                    type='input' 
                                    label='Cell Phone' 
                                    placeholder='0'
                                    className='country-code'
                                    name='cell-country-code'
                                    onChange={this.handleChange}
                                />
                                <FormElement 
                                    type='input'
                                    className='area'
                                    labelClass='none'
                                    name='cell-area-code'
                                    onChange={this.handleChange}
                                />
                            </div>
                            <FormElement 
                                type='input' labelClass='none'
                                className='phone-num-input'
                                name='cell-number'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='phone-input'>
                            <div className='area-code'>
                                <FormElement 
                                    type='input' 
                                    label='Telephone'
                                    placeholder='0'
                                    className='country-code'
                                    name='tele-country-code'
                                    onChange={this.handleChange}
                                />
                                <FormElement 
                                    type='input'
                                    className='area'
                                    labelClass='none'
                                    name='tele-area-code'
                                    onChange={this.handleChange}
                                />
                            </div>
                            <FormElement 
                                type='input' labelClass='none'
                                className='phone-num-input'
                                name='tele-number'
                                onChange={this.handleChange}
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
                            Delivery in 4-6 Business Days - Free ($40 min)
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