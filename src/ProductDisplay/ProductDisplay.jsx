import React from "react";
import './ProductDisplay.css'
import ProductCard from "../ProductCard/ProductCard";
import { PRODUCTS_URL , PRODUCTS_API } from '../constants.js'
import ProductFilters from "../ProductFilters/ProductFilters";

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            loading:false,
            error:false,
            productData:[],
            categoryFilter: 'All Products',
            searchValue:'',
            nameSort:'abc',
            cart:[],
        }
    }

    async componentDidMount() {
        this.setState({loading:true})
        try {
            const response = await fetch (`${PRODUCTS_URL}`, {
                    headers: {
                        'X-Authorization':`${PRODUCTS_API}`,
                    }
                });
            if (response.ok) {
                const json = await response.json();
                const productData = json.data
                    .map(item => ({
                        id: item.id,
                        category: item.categories[0].name,
                        description: item.description,
                        image: item.image.url,
                        name: item.name,
                        price: item.price.formatted,
                    }))
                    this.setState({productData, loading:false,})
            } else {
                this.setState({
                    error:true, 
                    loading:false, 
                    errStatus:response.status, 
                    errText:response.statusText});
                    
            }
        } catch(err) {
            console.log('Error', err); 
        }
    }

    handleFilterValue = (type, value) => {
        if (type === 'nameSort' && value === 'abc') {
            this.setState({[type]:'cba'})
        } 
        else if (type === 'nameSort' && value === 'cba') {
            this.setState({[type]:'abc'})
        }
        else if (type === 'priceSort' && value === '123') {
            this.setState({[type]:'321'})
        } 
        else if (type === 'priceSort' && value === '321') {
            this.setState({[type]:'123'})
        }
        else {
            this.setState({[type]:value})
        }
        
    }
    grabQuantity = (quantity, data) => {
        this.props.cartQuantityUpdate(quantity, data)
    }
    render () {
        const {loading, productData, categoryFilter, searchValue, nameSort} = this.state
        return(
            <div className="products-body">
                <ProductFilters 
                    filters={this.handleFilterValue} 
                    updateSortState={nameSort}
                    updateCategoryState={categoryFilter}
                />
                <div className="product-container">
                    {loading && <div>Loading...</div>}
                    
                    { searchValue && categoryFilter !== 'All Products' ? 
                        productData
                            .filter(product => 
                                product.name.toLowerCase().includes(searchValue.toLowerCase())
                                ||
                                product.description.toLowerCase().includes(searchValue.toLowerCase()))
                            .filter(product => 
                                product.category === categoryFilter)
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))
                    
                    : searchValue && categoryFilter === 'All Products' ? 
                        productData
                            .filter(product => 
                                product.name.toLowerCase().includes(searchValue.toLowerCase())
                                ||
                                product.description.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))
                    : categoryFilter === 'All Products' && nameSort === 'abc' ?
                        productData
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))
                    : categoryFilter === 'All Products' && nameSort === 'cba' ?
                        productData
                            .sort((a, b) => b.name.localeCompare(a.name))
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))
                    : nameSort==='abc' ?
                        productData   
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter(product => 
                                product.category === categoryFilter)  
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))  
                    : productData   
                            .sort((a, b) => b.name.localeCompare(a.name))
                            .filter(product => 
                                product.category === categoryFilter)  
                            .map((item) => (
                                <ProductCard cardQuantity={this.grabQuantity} data={item} related={productData}/>
                            ))  
                    }

                </div>
            </div>
        )
    }
}

export default ProductDisplay