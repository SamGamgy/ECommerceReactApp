import React from 'react'

class Promo extends React.Component {
    constructor(props) {
        super(props) 
        
        this.state= {
            promoInput:'',

        }
    }
    updateState = (e) => {
        this.setState({promoInput:e.target.value})
    }
    checkPromo = () => {
       if (this.state.promoInput === '10OFF') { this.props.promo('ten') } 
       else if (this.state.promoInput === '20OFF') { this.props.promo('twenty') } 
       else {this.props.promo(false)}
    }
    render() {
        return(
            <div className='promo-container'>
                    <div>Do you have a promo code?</div>
                    <div className='promo'>
                        <input 
                            value={this.state.promoInput}
                            onChange={this.updateState}
                            type="text" 
                            placeholder='Code'
                        />
                        <button 
                            onClick={this.checkPromo}
                            className='inline-btn'>apply</button>
                    </div>
                </div>
        )
    }
}

export default Promo