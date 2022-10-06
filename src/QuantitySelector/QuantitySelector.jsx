import React from "react";
import {FaMinus, FaPlus} from 'react-icons/fa'
import './QuantitySelector.css'

class QuantitySelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quantity:1,
        }
    };
    handleChange = (e) => {
        if (e.target.value < 0) {
            this.setState({ quantity: 0})
            this.props.quantityState(0)
        }
        else if (e.target.value > 99) {
            this.setState({ quantity: 99})
            this.props.quantityState(99)
        }
        else {
            this.setState({ quantity: e.target.value})
            this.props.quantityState(e.target.value)
        }
    }
    minusQuant = () => {
        let currentVal=this.state.quantity
        let newVal= +currentVal -1;

        if (newVal <= 1) { 
            this.setState({quantity:1})
            this.props.quantityState(1)
        }
        else{
            this.setState({quantity:newVal})
            this.props.quantityState(newVal)
        }

    }
    addQuant = () => {
        let currentVal=this.state.quantity
        let newVal= +currentVal +1;
        if (newVal > 99) {
            this.setState({quantity:99})
            this.props.quantityState(99)
        } 
        else {
            this.setState({quantity:newVal})
            this.props.quantityState(newVal)
        } 
    }
    render() {
        return(
            <div className="quantity-elm">
                <FaMinus 
                    onClick={this.minusQuant} className="quantity-icon"/>
                <input 
                    value={this.state.quantity} 
                    min='0'
                    max='99'
                    type="number" 
                    onChange={this.handleChange}
                />
                <FaPlus 
                    onClick={this.addQuant}
                    className="quantity-icon"/>
            </div>
        )
    }
}
export default QuantitySelector