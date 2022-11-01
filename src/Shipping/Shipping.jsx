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
            inputsMissing:true,
            errorsPresent:true,
            formValues:{
                title:'',
                surName:'',
                address:'',
                zip:'',
                country:'',
                city:'',
                state:'',
                cellCountryCode:'',
                cellAreaCode:'',
                cellNumber:'',
                shippingType:'',
            },
            error: {}
        }
    }
    captureShipping = (e) => {
        this.setState((prevState) => ({formValues: {...prevState.formValues, shippingType:e.target.value}}), this.checkErr())
        this.props.shippingType(e.target.value)
    }

    handleChange = (e) => {
        if (e.target.name === 'cellCountryCode') {
            const limit = 1;
            this.setState((prevState) => ({formValues: {...prevState.formValues, [e.target.name]:e.target.value.slice(0, limit)}}))
            this.props.values(e.target.name, e.target.value)
        }
        else if (e.target.name === 'cellAreaCode') {
            const limit = 3;
            this.setState((prevState) => ({formValues: {...prevState.formValues, [e.target.name]:e.target.value.slice(0, limit)}}))
            this.props.values(e.target.name, e.target.value)
        }
        else if (e.target.name === 'cellNumber') {
            const limit = 7;
            this.setState((prevState) => ({formValues: {...prevState.formValues, [e.target.name]:e.target.value.slice(0, limit)}}))
            this.props.values(e.target.name, e.target.value)
        }
        else{
            this.setState((prevState) => ({formValues: {...prevState.formValues, [e.target.name]:e.target.value}}))

            this.props.values(e.target.name, e.target.value)
        }
       this.checkErr()
    }
    checkErr = () => {
        let inputsMissing=false
        Object.keys(this.state.formValues).forEach((val) => {
            if (this.state.formValues[val].length === 0) {
                inputsMissing = true
            } 
        });
        this.setState({errorsPresent:inputsMissing}, this.passProp(inputsMissing))
        
       
    }
    passProp =(boolean) => {
        this.props.isFormFilled(boolean)
    }
    handleRender = () => {
        this.props.ship('shipScreen', 'cartScreen')
    }

    checkForValue = (e) => {
        if( e.target.name === 'cellAreaCode' || e.target.name === 'cellCountryCode') {
            if (!e.target.value.length > 0) {
                this.setState((prevState) => ({error: {...prevState.error, cellNumber:'Required'}}))
        } else {
            this.setState((prevState) => ({error: {...prevState.error, [e.target.name]:''}}))
        } 
    }
    //     else if( e.target.name === 'teleAreaCode' || e.target.name === 'teleCountryCode') {
    //         if (!e.target.value.length > 0) {
    //             this.setState((prevState) => ({error: {...prevState.error, teleNumber:'Required'}}))
    //     } else {
    //         this.setState((prevState) => ({error: {...prevState.error, [e.target.name]:''}}))
    //     } 
    // }
        else if (!e.target.value.length > 0) {
            this.setState((prevState) => ({error: {...prevState.error, [e.target.name]:'Required'}}))
        } else {
            this.setState((prevState) => ({error: {...prevState.error, [e.target.name]:''}}))
        }
        
        this.checkErr()
    }

    render() {
        return(
            <div className='container main'>
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
                            Delivery in 4-6 Business Days - FREE 
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
                            errorM={this.state.error.title}
                            onBlur={this.checkForValue}
                        />
                        <FormElement 
                            className="name-inputs"
                            type='input' 
                            label='Name - Surname'
                            value={this.props.shipping.surName}
                            name='surName'
                            onChange={this.handleChange}
                            errorM={this.state.error.surName}
                            onBlur={this.checkForValue}
                        />
                        <FormElement 
                            className="address-inputs"
                            type='input' 
                            label='Your Address'
                            value={this.props.shipping.address}
                            name='address'
                            onChange={this.handleChange}
                            errorM={this.state.error.address}
                            onBlur={this.checkForValue}
                        />
                        <FormElement 
                            type='input-num' 
                            label='Zip Code'
                            value={this.props.shipping.zip}
                            className='zip'
                            labelClass='zip-label'
                            name='zip'
                            onChange={this.handleChange}
                            errorM={this.state.error.zip}
                            onBlur={this.checkForValue}
                        />
                        <div className='ship-dropdowns'>
                            <FormElement 
                                type='select' 
                                label='Country' 
                                value={this.props.shipping.country}
                                array={countryArray}
                                className='dropdowns'
                                labelClass='drop-label'
                                name='country'
                                onChange={this.handleChange}
                                errorM={this.state.error.country}
                                onBlur={this.checkForValue}
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
                                errorM={this.state.error.city}
                                onBlur={this.checkForValue}
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
                                errorM={this.state.error.state}
                                onBlur={this.checkForValue}
                            />
                        </div>
                        <div className='phone-input'>
                            <div className='area-code'>
                                <FormElement 
                                    type='input-num' 
                                    label='Cell Phone' 
                                    placeholder='0'
                                    value={this.state.formValues.cellCountryCode}
                                    className='country-code'
                                    name='cellCountryCode'
                                    onChange={this.handleChange}
                                    onBlur={this.checkForValue}
                                />
                                <FormElement 
                                    type='input-num'
                                    className='area'
                                    value={this.state.formValues.cellAreaCode}
                                    labelClass='none'
                                    name='cellAreaCode'
                                    onChange={this.handleChange}
                                    onBlur={this.checkForValue}
                                />
                            </div>
                            <FormElement 
                                type='input-num' labelClass='none'
                                className='phone-num-input'
                                name='cellNumber'
                                value={this.state.formValues.cellNumber}
                                onChange={this.handleChange}
                                errorM={this.state.error.cellNumber}
                                onBlur={this.checkForValue}
                                
                            />
                        </div>
                    </form>
                <div>
                    
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