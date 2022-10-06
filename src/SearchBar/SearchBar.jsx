import React from "react";
import './SearchBar.css'
import { BsSearch } from "react-icons/bs";


class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue:'',
        }
    }

    handleChange=(e)=>{
        this.props.value(e.target.value)
    }
    render() {
        return (
            <div className="search-container">
                <input 
                    className='search-bar' 
                    placeholder={this.props.placeholder} 
                    type="text" 
                    // value={this.props.value}
                    onChange={this.handleChange}
                />

                <div className="search-icon">
                    <BsSearch/>
                </div>
            </div>
        )
    }
}
export default SearchBar