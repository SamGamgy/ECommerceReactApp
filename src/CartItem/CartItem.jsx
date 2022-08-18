import React from 'react'
import './CartItem.css'
import {ImCross} from 'react-icons/im'
import Dropdown from '../Dropdown/Dropdown'

class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            quantity:1,
            display:true,
            itemPrice: this.props.price,

        }
    }

    handleChange = (e) => {
        this.setState({quantity: e.target.value})

        this.setState({itemPrice: (this.props.price * e.target.value).toFixed(2)}) 

        let index = this.props.index 
        this.props.itemPrice(e.target.value, index)
    }

    removeItem = () => {
        let index = this.props.index
        this.setState({display:false,})
        this.props.display(false, index)
    }
    render() {

        let totalPrice = (this.props.price * this.state.quantity).toFixed(2)


        let optionArray= [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return(
            this.state.display &&
                <div className='cart-item'>
                    <div className='remove-icon circle' onClick={this.removeItem}>
                        <ImCross/>
                    </div>
                    <div className='item-img'>
                        <img src={this.props.img} alt={this.props.imgAlt} />
                    </div>
                    <div className='item-info'>
                        <div className='category'>{this.props.sex}</div>
                        <h3>{this.props.name}</h3>
                        <div className='sub-info'>
                            <div className='label-item'>Color:</div>
                            <div className='attribute'>{this.props.color}</div>
                        </div>
                        <div className='sub-info'>
                            <div className='label-item'>Size:</div>
                            <div className='attribute'>{this.props.size}</div>
                        </div>
                    </div>
                    <div className='attribute'>${this.props.price.toFixed(2)}</div>
                    <div className='quantity'>
                        <Dropdown 
                            array={optionArray} 
                            placeholder='1' 
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='attribute'>${totalPrice}</div>
                </div>
            )
        }
            
} 

export default CartItem