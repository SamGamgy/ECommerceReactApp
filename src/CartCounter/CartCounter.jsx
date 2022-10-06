import React from "react";
import './CartCounter.css'

class CartCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className="counter">
                {this.props.cartTotal}
            </div>
        )
    }
}

export default CartCounter