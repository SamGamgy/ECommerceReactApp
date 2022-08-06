import React from "react";
import './Button.css'
class Button extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <button 
                style={this.props.style} 
                className= {this.props.className}
                onClick={this.props.onClick}
            >
                {this.props.icon}
                {this.props.name}
            </button>
        )
    }
}

export default Button