import React from "react";
import './Dropdown.css'
import {BiCaretDown} from 'react-icons/bi'

class Dropdown extends React.Component {
    constructor(props) {
        super(props) 
        this.state= {

        }
    }
    render() {
        

        return(
            <div className="selector">
                <select 
                    onChange={this.props.onChange} 
                    name={this.props.name} 
                    id="">

                    <option 
                        value='' 
                        disabled 
                        selected 
                        hidden> 
                        {this.props.placeholder}
                    </option>  

                    ({this.props.array.map((item)=> (
                        <option value={item}>{item}</option>
                    ))})
                            
                </select>
            </div>
        )
    }
}

export default Dropdown