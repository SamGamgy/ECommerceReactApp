import React from "react";
import './PopUp.css'
import {AiFillCloseCircle} from 'react-icons/ai'

class PopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        } 
    }
    handleClick = () => {
        this.props.popUp(false)
    }

    render() {

        return (
            <div className="container pop-up">
                <div className="pop-head"><AiFillCloseCircle onClick={this.handleClick}/></div>
                <h3 style={this.props.titleStyle} className="pop-title">{this.props.title}</h3>
                <p className="pop-body">{this.props.message}</p>
                
            </div>

        )
    }
}

export default PopUp

        
