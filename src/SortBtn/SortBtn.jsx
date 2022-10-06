import React from "react";
import './SortBtn.css'
import {BsSortAlphaDown,BsSortAlphaUp} from 'react-icons/bs'

class SortBtn extends React.Component {
    constructor (props) {
        super(props)
        this.state ={
            nameSort:'abc',
        }
    }

    toggleSort = () => {
        this.setState({nameSort: this.props.updateSortState})
        this.props.toggleClicked('nameSort', this.props.updateSortState)
    }

    render() {
        return(
            <div className="sort-btn" onClick={this.toggleSort}>
                <div>
                    {this.props.name}
                </div>
                    {this.props.updateSortState === 'abc' ?
                    <BsSortAlphaDown/> 
                    : <BsSortAlphaUp/>
                    }
            </div>
        )
    }
}

export default SortBtn