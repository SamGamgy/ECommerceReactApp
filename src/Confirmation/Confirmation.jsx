import React from 'react'
import Button from '../Button/Button'

class Confirmation extends React.Component {
    constructor() {
        super()
        this.state= {

        }
    }

   backPage = () => {
    this.props.confirm('confirmScreen', 'logInScreen')
   }

    render() {
        

        return(
            <div 
                style={{width:'48%', top:'16%', overflowY:'auto'}}
                className='container main'>
                <div className= 'pay header'>
                    <div className='titles'>CONFIRMATION</div>
                </div>
                    
                
                
                <div className='back-button'>
                <Button 
                    onClick={this.backPage}
                    className='btn clear sm-text'
                    name='Back to Home'/> 
                </div>
            </div>

        )
    }
} 

export default Confirmation