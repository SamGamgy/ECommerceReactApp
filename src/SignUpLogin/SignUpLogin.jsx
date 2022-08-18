import React from "react";
import Button from "../Button/Button";
import './SignUpLogin.css'
import {FaFacebookF} from "react-icons/fa"
import FormElement from "../FormElement/FormElement";
import PopUp from '../PopUp/PopUp'
import {isValidEmail, isValidName, isValidPass} from '../validations'

let userData=[
    
]
class SignUpLogin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle:'createNew',
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
            },
            userData: userData,
            error:{},
            logInError:{},
            popUp:false,
            fbPopUp:false,
            errorPopUp:false,
            existingUserPopUp:false,
        }
    }
    handleFormInput = (e) => {
        this.setState((prevState) => ({formValues: {...prevState.formValues, [`${e.target.name}`]: e.target.value }}))
    }   
    passErrors = (e) => {
        if (e.target.name === 'email') {
            if (!isValidEmail(e.target.value)) {
                this.setState((prevState) => ({error: {...prevState.error, emailErr:'Invalid Email'}}))
            } else {this.setState((prevState) => ({error: {...prevState.error, emailErr: false }}))}
        }
        if (e.target.name === 'pass1') {
            let error= isValidPass(e.target.value)
            if (error) {
                this.setState((prevState) => ({error: {...prevState.error, pass1Err:error}}))
            } else {this.setState((prevState) => ({error: {...prevState.error, pass1Err: false }}))}
        }
        if (e.target.name === 'pass2') {
            if (e.target.value !== this.state.formValues.pass1) {
                this.setState((prevState) => ({error: {...prevState.error, pass2Err:'Passwords don\'t match'}}))
            }  else {this.setState((prevState) => ({error: {...prevState.error, pass2Err: false }}))}
        }
        if (e.target.name === 'firstName' || e.target.name === 'lastName') {
            if (!isValidName(e.target.value)) {
                this.setState((prevState) => ({error: {...prevState.error, [`${e.target.name}Err`]:'Name must not include numbers'}}))
            }  else {this.setState((prevState) => ({error: {...prevState.error, [`${e.target.name}Err`]: false }}))}
        }
        if (e.target.name === 'zip') {
            if (e.target.value.length < 5) {
                this.setState((prevState) => ({error: {...prevState.error, [`${e.target.name}Err`]:'Zip Code must be at least 5 digits'}}))
            }  else {this.setState((prevState) => ({error: {...prevState.error, [`${e.target.name}Err`]: false }}))}
        }
    }
    handleLogInInput = (e) => {
        this.setState((prevState) => ({signInValues: {...prevState.signInValues, [`${e.target.name}`]: e.target.value }}))
    }

    handleToggle = (e) => {
        this.setState({toggle: e.target.value})
        this.setState({logInError:''})
    }
    testData = (e) => {
        e.preventDefault();

        if (userData.length === 0) {this.setState((prevState) => ({logInError: {...prevState.logInError, emailLogInErr:'Email is not Registered'}}))}
        
        for (let i=0; i < userData.length; i++) {
            let user = userData[i]
            if(user.email === (this.state.signInValues.emailLogIn)) {
                if (user.password === this.state.signInValues.passwordLogIn) {
                    this.nextPage()
                }  else {
                    this.setState((prevState) => ({logInError: {...prevState.logInError, passwordLogInErr:'Password is not Correct'}}))}
            } else {
                this.setState((prevState) => ({logInError: {...prevState.logInError, emailLogInErr:'Email is not Registered'}}))}
        }
    }
    nextPage = () => {
        this.props.logIn(`logInScreen`, `cartScreen`)
    }
    checkErrorBeforeSave = () => {
        let isError = false;

        for (let i = 0; i <userData.length; i++) {
            let user = userData[i]
            if (user.email === this.state.formValues.email) {
                this.setState({existingUserPopUp : true})
                this.setState({toggle:'signUp'})
                isError=true
            }
        }
        Object.keys(this.state.formValues).forEach((val) => {
            if (!this.state.formValues[val].length) {
                console.log(val)
                this.setState((prevState) => ({error: {...prevState.error, [`${val}Err`]:'Required'}}))
                isError = true;
            }
        });
        Object.keys(this.state.error).forEach((val) => {
            if (this.state.error[val].length) {
                isError = true;
            }
        });

        return isError;
    }
    handleAddUser = (e) => {
        e.preventDefault();

        const errorCheck = this.checkErrorBeforeSave();

       if (!errorCheck) {
        this.saveData()
       } else {
        this.setState({errorPopUp:true})
       }
    }
    saveData = () => {
        userData.push({email:this.state.formValues.email, firstName:this.state.formValues.firstName, lastName:this.state.formValues.lastName, password: this.state.formValues.pass1, zip:this.state.formValues.zip})
        
        this.setState({formValues: 
        {email:'',
        pass1:'',
        pass2:'',
        firstName:'',
        lastName:'',
        zip:''}})

        this.setState({popUp : true})
        this.setState({toggle:'signUp'})
    }
    openFacebook = (e) => {
        e.preventDefault();

        this.setState({fbPopUp:true})
    }
    closePopUp =()=> {
        this.setState({popUp:false, fbPopUp:false, errorPopUp:false, existingUserPopUp:false})
    }
    render () {
        const {formValues, signInValues, error, logInError} = this.state;
        let formData = [
            {key: 'Up1', label: 'Your Email Address*', name: 'email', type: 'input', maxLength: 'none'},
            {key: 'Up2', label: 'Create Password*', name: 'pass1', type: 'input', maxLength: 20, password: true},
            {key: 'Up3',label: 'Confirm Password*', name: 'pass2', type: 'input', maxLength: 20, password: true},
            {key: 'Up4',label: 'First Name*', name: 'firstName', type: 'input', maxLength: 'none'},
            {key: 'Up5',label: 'Last Name*', name: 'lastName', type: 'input', maxLength: 'none'},
            {key: 'Up6',label: 'Zip Code', name: 'zip', type: 'input-num', maxLength: 5},
        ];

        let signInData = [
            {key: 'In1', label: 'Enter your Email Address*', name: 'emailLogIn', type: 'input', maxLength: 'none'},
            {key: 'In2', label: 'Enter your Password*', name: 'passwordLogIn', type: 'input', maxLength: 20, password: true},
        ]
        let fbBanner= <FaFacebookF/> 

        if (this.state.toggle === 'createNew') {
            return (
                <div className='container login'>
                    <div className='toggle' >
                        <FormElement
                            type='radio'
                            label='sign In'
                            name='toggle'
                            value='signUp'
                            onChange={this.handleToggle}
                        />
                        <FormElement
                            type='radio'
                            label='create New'
                            checked='checked'
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
                            value={formValues[item.name]}
                            maxLength={item.maxLength}
                            onChange={this.handleFormInput}
                            onBlur={this.passErrors}
                            passwordHide={item.password}
                            errorM={error[`${item.name}Err`]}
                        />
                        ))}
                        <Button  
                            onClick= {this.handleAddUser}
                            className='btn' 
                            name='Save' />
                        <div className='or'>
                            <div className='line'></div>
                            <p>or</p>
                            <div className='line'></div>
                        </div>
                        <Button 
                            onClick= {this.openFacebook}
                            className='btn' 
                            icon={fbBanner} 
                            name= {'Sign Up with Facebook'}   
                            style={{background:'#4267B2'}}/>
                    </form>
                    {this.state.fbPopUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            titleStyle={{color:'rgb(66,103,178)'}} 
                            title='Facebook Integration Error' 
                            message='Sorry, but the developer has not learned this yet...try again later'
                        />}
                    {this.state.errorPopUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            titleStyle={{color:'rgb(66,103,178)'}} 
                            title='Cannot Save with Errors' 
                            message='Please fix any errors before trying to save'
                        />}
                </div>
            )
         } else {
            return (
                <div className='container login'>
                    {this.state.popUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            title='User Successfully Created' 
                            message='You can now use your email and password to sign in to your account'
                        />}
                    <div className='toggle'>
                        <FormElement
                            type='radio'
                            label='sign In'
                            checked='checked'
                            name='toggle'
                            value='signUp'
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
                            value={signInValues[item.name]}
                            maxLength={item.maxLength}
                            onChange={this.handleLogInInput}
                            passwordHide={item.password}
                            errorM={logInError[`${item.name}Err`]}
                            />
                        ))}
                        <Button 
                            onClick= {this.testData}
                            name='Sign In' 
                            className='btn'/>
                        <div className='or'>
                            <div className='line'></div>
                            <p>or</p>
                            <div className='line'></div>
                        </div>
                        <Button 
                            onClick= {this.openFacebook}
                            className='btn' 
                            icon={fbBanner} 
                            name= {'Sign In with Facebook'}   
                            style={{background:'#4267B2'}}/>
                    </form>
                    {this.state.fbPopUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            titleStyle={{color:'rgb(66,103,178)'}} 
                            title='Facebook Integration Error' 
                            message='Sorry, but the developer has not learned this yet...try again later'
                        />}
                    {this.state.existingUserPopUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            titleStyle={{color:'rgb(66,103,178)'}} 
                            title='Email already registered!' 
                            message='Try to Sign In instead'/>}
                </div>
                )
         }
    }
}

export default SignUpLogin