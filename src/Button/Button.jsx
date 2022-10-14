import React from "react";
import './Button.css'
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        if (this.props.isDisable){ 
        return (
            
            <button 
                id={this.props.id}
                className= {this.props.className}
                onClick={this.props.onClick}
                disabled
            >
                {this.props.icon}
                {this.props.name}
            </button>  
        )}
        else {
            return(
            <button 
                id={this.props.id}
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
}

export default Button