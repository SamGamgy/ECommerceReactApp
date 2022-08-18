import React from 'react'
import Button from '../Button/Button'
import {BsCheck2Circle} from 'react-icons/bs'
import './Confirmation.css'
import PopUp from '../PopUp/PopUp'

class Confirmation extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            trackErrPopUp:false,
        }
    }
   backPage = () => {
    this.props.confirm('confirmScreen', 'logInScreen')
   }
   closePopUp =() => {
    this.setState({trackErrPopUp:false})
   }
   openPop =() => {
    this.setState({trackErrPopUp:true})
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
                            onClick={this.openPop}
                            className='btn'
                            name='Track Order'/> 
                    </div>
                    <div className='back-button'>
                        <Button 
                            onClick={this.backPage}
                            className='btn bw'
                            name='Back to Home Page'/> 
                    </div>
                    {this.state.trackErrPopUp && 
                        <PopUp 
                            popUp={this.closePopUp} 
                            titleStyle={{position:'relative', top:'0',left:'0', color:'rgb(192,67,67)'}} 
                            title='Tracking Error' 
                            message='We encountered an unknown error. Please try again later'
                        />}
                </div>    
            </div>
        )
    }
} 

export default Confirmation