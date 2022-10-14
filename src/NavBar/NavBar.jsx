import React from 'react'
import './NavBar.css'
import Button from '../Button/Button'
import {BsCart} from 'react-icons/bs'
import {GiFarmer} from 'react-icons/gi'
import CartCounter from '../CartCounter/CartCounter'

class NavBar extends React.Component {

handleButton = (e) => {
    this.props.buttonPress(e.target.id)
}
handleIconButton = (e) => {
    this.props.buttonPress(e.target.parentNode.id)
}
    render () {
        return (
            <nav className='d-flex justify-content-between align-items-center container-fluid fixed-top '>
                <div className='brand'>
                    <div className='logo'>
                        <GiFarmer size={'80px'}/>
                    </div>
                    <h2>Farm to Table</h2>
                </div>
                <div className='nav-btns d-flex'>
                    {this.props.userData === '' ? 
                    <Button id='logInBtn' onClick={this.handleButton} className='log-in-btn btn' name='Log In / Sign Up'/> :
                     `Hello ${this.props.userData.firstName}!`
                    }  
                </div>
                <button id='cartBtn' onClick={this.handleButton} className='cart-icon'>
                    <BsCart onClick={this.handleIconButton}/>
                </button>
                <CartCounter cartTotal={this.props.cartTotal}/>
            </nav>
        )
    }
}
export default NavBar