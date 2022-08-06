import React from "react";
import Button from "../Button/Button";
import './SignUpLogin.css'
import {FaFacebookF} from "react-icons/fa"
import FormElement from "../FormElement/FormElement";

class SignUpLogin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle:'',
            formValues: {
                email:'',
                pass1:'',
                pass2:'',
                firstName:'',
                lastName:'',
                zip:'',
            },
            signInValues: {
                emailLogIn:'',
                passwordLogIn:'',
            }
        }
    }
    handleFormInput = (e) => {
        this.setState((prevState) => ({formValues: {...prevState.formValues, [`${e.target.name}`]: e.target.value }}))
    }   
     
    handleLogInInput = (e) => {
        this.setState((prevState) => ({signInValues: {...prevState.signInValues, [`${e.target.name}`]: e.target.value }}))
    }

    handleToggle = (e) => {
        this.setState({toggle: e.target.value})
    }
    nextPage = (e) => {
        e.preventDefault();

        this.props.logIn(`logInScreen`, `cartScreen`)
    }
    render () {
        const {formValues, signInValues} = this.state;
        let formData = [
            {key: 'Up1', label: 'Your Email Address*', name: 'email', type: 'input', maxLength: 'none'},
            {key: 'Up2', label: 'Create Password*', name: 'pass1', type: 'input', maxLength: 20},
            {key: 'Up3',label: 'Confirm Password*', name: 'pass2', type: 'input', maxLength: 20},
            {key: 'Up4',label: 'First Name*', name: 'firstName', type: 'input', maxLength: 'none'},
            {key: 'Up5',label: 'Last Name*', name: 'lastName', type: 'input', maxLength: 'none'},
            {key: 'Up6',label: 'Zip Code', name: 'zip', type: 'input', maxLength: 5},
        ];

        let signInData = [
            {key: 'In1', label: 'Enter your Email Address*', name: 'emailLogIn', type: 'input', maxLength: 'none'},
            {key: 'In2', label: 'Enter your Password*', name: 'passwordLogIn', type: 'input', maxLength: 20},
        ]
        let fbBanner= <FaFacebookF/> 

        if (this.state.toggle === 'createNew') {
            return (
                <div className='container login'>
                    <div className='toggle' >
                        <FormElement
                            type='radio'
                            label='sign Up'
                            name='toggle'
                            value='signUp'
                            onChange={this.handleToggle}
                        />
                        <FormElement
                            type='radio'
                            label='create New'
                            name='toggle'
                            value='createNew'
                            onChange={this.handleToggle}
                        />
                    </div>
                    <form>
                        {formData.map((item) => (
                            <FormElement
                            type={item.type} 
                            label= {item.label} 
                            name= {item.name} 
                            state= {item.state}
                            // value=''
                            maxLength={item.maxLength}
                            onChange={this.handleFormInput}
                            // onBlur={}
                            />
                        ))}
                        <Button  
                            onClick= {this.nextPage}
                            className='btn' 
                            name='Save' />
                        <div className='or'>
                            <div className='line'></div>
                            <p>or</p>
                            <div className='line'></div>
                        </div>
                        <Button 
                            onClick= {this.nextPage}
                            className='btn' 
                            icon={fbBanner} 
                            name= {'Sign Up with Facebook'}   
                            style={{background:'#4267B2'}}/>
                    </form>
                </div>
            )
         } else {
            return (
                <div className='container login'>
                    <div className='toggle'>
                        <FormElement
                            type='radio'
                            label='sign Up'
                            name='toggle'
                            value='signUp'
                            checked='checked'
                            onChange={this.handleToggle}
                        />
                        <FormElement
                            type='radio'
                            name='toggle'
                            label='create New'
                            value='createNew'
                            onChange={this.handleToggle}
                        />
                    </div>
                    <form>
                        {signInData.map((item) => (
                            <FormElement
                            type={item.type} 
                            label= {item.label} 
                            name= {item.name} 
                            state= {item.state}
                            // value=''
                            maxLength={item.maxLength}
                            onChange={this.handleLogInInput}
                            // onBlur={}
                            />
                        ))}
                        <Button 
                            onClick= {this.nextPage}
                            name='Sign In' 
                            className='btn'/>
                        <div className='or'>
                            <div className='line'></div>
                            <p>or</p>
                            <div className='line'></div>
                        </div>
                        <Button 
                            onClick= {this.nextPage}
                            className='btn' 
                            icon={fbBanner} 
                            name= {'Sign In with Facebook'}   
                            style={{background:'#4267B2'}}/>
                    </form>
                </div>
                )
         }
    }
}

export default SignUpLogin