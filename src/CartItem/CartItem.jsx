import React from 'react'
import './CartItem.css'
import {ImCross, ImDatabase} from 'react-icons/im'
import QuantitySelector from '../QuantitySelector/QuantitySelector'

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

        const data = this.props.data
        let optionArray= [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return(
            this.state.display &&
                <div className='cart-item'>
                    <div className='cart-item-name'>
                        <div className='remove-icon circle' onClick={this.removeItem}>
                            <ImCross/>
                        </div>
                        <div className='item-img'>
                            <img src={data.item.image} alt= ''/>
                        </div>
                        <div className='item-info'>
                            <div className='category'>{data.item.category}</div>
                            <h3>{data.item.name}</h3>
                        </div>
                    </div>
                    <div className='attribute'>${data.item.price}</div>
                    <div className='quantity'>
                        <QuantitySelector quantity={data.quantity}/>
                    </div>
                    <div className='attribute'>${totalPrice}</div>
                </div>
            )
        }
            
} 

export default CartItem