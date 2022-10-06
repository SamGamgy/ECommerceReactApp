import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import './ProductFilters.css'
import SortBtn from '../SortBtn/SortBtn'

class ProductFilters extends React.Component {
    constructor() {
        super()
        this.state ={
            categoryFilter:'All Products'
        }
    }

    categoryChange=(e)=>{
        this.props.filters('categoryFilter', e.target.innerHTML)
        this.setState({categoryFilter: e.target.innerHTML})
        
    }
    handleSearchValue=(value)=> {
        this.props.filters('searchValue', value);
    }
    toggleClicked=(name, type)=>{
        this.props.filters( name, type)
    }
    render() {
        return(
            <div className="filter-container">
                
                <div className="search-nav">
                    <div className="current-category">
                        <div>
                            Current Category:
                        </div>
                        {this.state.categoryFilter}
                    </div>
                    <SearchBar placeholder='Search by Keyword' value={this.handleSearchValue}/>
                    <SortBtn toggleClicked={this.toggleClicked} updateSortState={this.props.updateSortState} name='Sort'/> 
                </div>
                <h4>Sort by Category</h4>
                <ul className="categories-nav">
                    <li onClick={this.categoryChange}>All Products</li>
                    <li onClick={this.categoryChange}>Produce</li>
                    <li onClick={this.categoryChange}>Fruits</li>
                    <li onClick={this.categoryChange}>Dairy</li>
                    <li onClick={this.categoryChange}>Meat</li>
                    <li onClick={this.categoryChange}>Herbs</li>
                </ul>
            </div>
        )
    }
}

export default ProductFilters