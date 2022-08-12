import React from 'react'
import Button from '../Button/Button'
import {BsCheck2Circle} from 'react-icons/bs'
import './Confirmation.css'

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
                <hr />
                <div className='confirm-content'>
                    <div className='icon-wrapper'>
                        <BsCheck2Circle/>
                    </div>
                    <h3>Congratulations</h3>
                    <h3>Your order is accepted</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit nihil, non dolorum cupiditate, harum fugit minus exercitationem voluptate accusamus tenetur minima deleniti error. Sapiente mollitia quam repudiandae placeat ab? Ratione.

                    </p>


                    <div className='track-button'>
                        <Button 
                            onClick={this.backPage}
                            className='btn'
                            name='Track Order'/> 
                    </div>
                    <div className='back-button'>
                        <Button 
                            onClick={this.backPage}
                            className='btn bw'
                            name='Back to Home Page'/> 
                    </div>
                </div>    
                
                
            </div>

        )
    }
} 

export default Confirmation