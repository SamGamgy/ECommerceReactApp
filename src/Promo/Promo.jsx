import React from 'react'

class Promo extends React.Component {
    constructor(props) {
        super(props) 
        
        this.state= {

        }
    }

    render() {
        return(
            <div className='promo-container'>
                    <div>Do you have a promo code?</div>
                    <div className='promo'>
                        <input type="text" placeholder='Code'/>
                        <button className='inline-btn'>apply</button>
                    </div>
                </div>
        )
    }
}

export default Promo