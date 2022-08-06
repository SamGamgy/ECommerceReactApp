import React from "react";
import './FormElement.css'

class FormElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        } 

        
    }

    render () {
        if (this.props.type === 'input'){
            
            return(
            <div className={"inputs"}>
                <label className={this.props.labelClass}>{this.props.label}</label>
                <input 
                    className={this.props.className}
                    type="text" 
                    value= {this.props.value} 
                    name = {this.props.name} 
                    placeholder = {this.props.placeholder}
                    onBlur={this.props.onBlur}
                    onChange={this.props.onChange}
                />
            </div>
            )
        }
        else if (this.props.type === 'select'){

            return (
            <div className="selector">
                <label className={this.props.labelClass}>{this.props.label}</label>
                <select 
                    className={this.props.className}
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
        else if (this.props.type==='radio') {
            return (
                <div className={this.props.contClass}style= {{display:'flex', gap:'1rem', alignItems:'center'}}>
                        <input 
                            onChange={this.props.onChange}
                            type={this.props.type} 
                            name={this.props.name} 
                            value= {this.props.value} 
                            checked={this.props.checked} 
                            className={this.props.inputClass}
                        />
                        <label style= {{textTransform: 'uppercase'}}
                        >{this.props.label}
                        </label>
                </div>
            )
        }

    }
}

export default FormElement