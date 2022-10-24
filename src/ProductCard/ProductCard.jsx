import React from "react";
import Button from "../Button/Button"
import './ProductCard.css'
import QuantitySelector from '../QuantitySelector/QuantitySelector'

class ProductCard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            productPage:false,
            successMessage:false,
            productQuantity:1,
            relatedProductPage:false,
        }
    }
    openProductPage= (e) => {
        this.setState({productPage:true})
    }
    backToProducts = () => {
        this.setState({productPage:false, relatedProductPage:false})
    }
    grabQuantity = (quantity) => {
        this.setState({productQuantity: quantity})
    }
    passQuantity = () => {
        this.props.cardQuantity(this.state.productQuantity, this.props.data)
        this.setState({successMessage:true})
        setTimeout(() => this.setState({successMessage:false}), 3000)
    }
    passNewQuantity = () => {
        this.props.cardQuantity(this.state.productQuantity, this.state.newPageData)
        this.setState({successMessage:true})
        setTimeout(() => this.setState({successMessage:false}), 3000)
    }
    sendProductData = (e, data) => {
        this.setState({relatedProductPage:true, productPage:false, newPageData: data, productQuantity:1})
        
    }
    render () {
        const {name, price, description, image, category, id} = this.props.data
        const { productPage, successMessage, relatedProductPage, newPageData} =this.state
        let descriptionFormatted= description.length - 4;
        
        
        return(
            <div>
                {relatedProductPage ?
            
            <div key={newPageData.id + newPageData.name} className='product-page'>
                <div className="product-page-header">
                            <Button onClick={this.backToProducts} className='back-products-btn btn' name='Back to Products'></Button>
                            <p>All Product > {newPageData.category} > {newPageData.name}</p>
                </div>
                <div className="product-page-body">
                    <div>
                        <div className="product-header">
                            <div className="product-img-wrap">
                                <img  src={newPageData.image} alt="" />
                            </div>
                            <div className='product-info'>
                                <div className="card-header">
                                    <h3>{newPageData.name}</h3>
                                    <h3>${newPageData.price}</h3>
                                </div>
                                <p>{newPageData.description.slice(3, (newPageData.description.length - 4))}</p>
                                <div className="add-to-cart" style={{position:'relative'}}>
                                    <QuantitySelector quantityState={this.grabQuantity} currentQuantity={this.state.productQuantity}/>
                                    <Button onClick={this.passNewQuantity} className='btn' name='Add to Cart'></Button>
                                </div>
                            </div>
                        </div>
                        <div className="card-info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum ipsam ea natus consequatur voluptatem accusantium. Aliquam labore praesentium numquam vel incidunt nam laborum, corrupti earum deleniti debitis quidem libero?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum ipsam ea natus consequatur voluptatem accusantium. Aliquam labore praesentium numquam vel incidunt nam laborum, corrupti earum deleniti debitis quidem libero?</p>
                            
                        </div>
                    </div>
                    <div className="side-bar">
                        <h2>Related Products</h2>
                        { this.props.related
                            .filter(product=> 
                            product.category === newPageData.category && product.name !== newPageData.name)
                            .map((item) => (
                                
                        <div key={item.id + category} onClick={e => this.sendProductData(e,item)}className="related-products">
                            <div className="product-header">
                                <div className="product-img-wrap">
                                    <img  src={item.image} alt="" />
                                </div>
                                <div className='product-info'>
                                    <div className="card-header">
                                        <h3>{item.name}</h3>
                                        <h3>${item.price}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                            ))  
                        }
                    </div>
                </div>
            </div> :
            productPage ?
            
            <div key={id+name} className='product-page'>
                <div className="product-page-header">
                            <Button onClick={this.backToProducts} className='back-products-btn btn' name='Back to Products'></Button>
                            <p>All Product > {category} > {name}</p>
                </div>
                <div className="product-page-body">
                    <div>
                        <div className="product-header">
                            <div className="product-img-wrap">
                                <img  src={image} alt="" />
                            </div>
                            <div className='product-info'>
                                <div className="card-header">
                                    <h3>{name}</h3>
                                    <h3>${price}</h3>
                                </div>
                                <p>{description.slice(3, descriptionFormatted)}</p>
                                <div className="add-to-cart" style={{position:'relative'}}>
                                    <QuantitySelector quantityState={this.grabQuantity} currentQuantity={this.state.productQuantity}/>
                                    <Button onClick={this.passQuantity} className='btn' name='Add to Cart'></Button>
                                </div>
                            </div>
                        </div>
                        <div className="card-info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum ipsam ea natus consequatur voluptatem accusantium. Aliquam labore praesentium numquam vel incidunt nam laborum, corrupti earum deleniti debitis quidem libero?</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum ipsam ea natus consequatur voluptatem accusantium. Aliquam labore praesentium numquam vel incidunt nam laborum, corrupti earum deleniti debitis quidem libero?</p>
                            
                        </div>
                    </div>
                    <div className="side-bar">
                        <h2>Related Products</h2>
                        { this.props.related
                            .filter(product=> 
                            product.category === category && product.name !== name)
                            .map((item) => (
                                
                        <div key={item.id + category + 'related'} onClick={e => this.sendProductData(e,item)}className="related-products">
                            <div className="product-header">
                                <div className="product-img-wrap">
                                    <img  src={item.image} alt="" />
                                </div>
                                <div className='product-info'>
                                    <div className="card-header">
                                        <h3>{item.name}</h3>
                                        <h3>${item.price}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                            ))  
                        }
                    </div>
                </div>
            </div>
            
            :
            
            <div key={id} className='product-card'>
                <div className="img-wrap-card">
                    <img onClick={this.openProductPage} src={image} alt="" />
                </div>
                <div className="card-info">
                    <div onClick={this.openProductPage} className="card-header">
                        <h3>{name}</h3>
                        <h3>${price}</h3>
                    </div>
                    <p>{description.slice(3, descriptionFormatted)}</p>
                    <div className="add-to-cart">
                        <QuantitySelector quantityState={this.grabQuantity} currentQuantity={this.state.productQuantity}/>
                        <Button onClick={this.passQuantity} className='btn' name='Add to Cart'></Button>
                    {successMessage ?
                    <div className="success-message">Successfully added to your Cart</div>
                    : ''}
                    </div>
                </div>
            </div>
            }
            
            </div>
        )
    }
}

export default ProductCard