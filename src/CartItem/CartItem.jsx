import React from 'react'
import './CartItem.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import QuantitySelector from '../QuantitySelector/QuantitySelector'

class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            quantity:1,
            display:true,
            itemPrice: this.props.price,
            newQuant: this.props.data.quantity,

        }
    }

    handleChange = (e) => {
        this.setState({quantity: e.target.value})

        this.setState({itemPrice: (this.props.price * e.target.value).toFixed(2)}) 

        let index = this.props.index 
        this.props.itemPrice(e.target.value, index)
    }

    removeItem = () => {
        this.setState({display:false,})

        let data = this.props.data.item
        this.props.newQuant(0, data)
    }
    grabNewQuant = (newQuant) => {
        this.setState({newQuant: newQuant})
        let data = this.props.data.item
        this.props.newQuant(newQuant, data)
    }
    render() {


        const data = this.props.data
        return(
            this.state.display &&
                <div className='cart-item'>
                        <button className='remove-icon circle' onClick={this.removeItem}>
                            <AiFillCloseCircle />
                        </button>
                    <div className='cart-item-name'>
                        <div className='item-info'>
                            <div className='category'>{data.item.category}</div>
                            <h3>{data.item.name}</h3>
                        </div>
                        <div className='item-img'>
                            <img src={data.item.image} alt= ''/>
                        </div>
                    </div>
                    <div className='attribute'>${data.item.price}</div>
                    <div className='quantity'>
                        <QuantitySelector quantityState={this.grabNewQuant} currentQuantity={data.quantity}/>
                    </div>
                    <div className='attribute'>${(data.item.price * data.quantity).toFixed(2)}</div>
                </div>
            )
        }
            
} 

export default CartItem