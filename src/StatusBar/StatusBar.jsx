import React from 'react'
import './StatusBar.css'
import {TbTruckDelivery} from 'react-icons/tb'
import {BsCartCheck} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import {AiOutlineCheckCircle} from 'react-icons/ai'
class StatusBar extends React.Component {
    constructor() {
        super()
        this.state= {

        }
    }

    render() {

        let confirmScreen={}
        if (this.props.four) {
            confirmScreen= {width:'98%'}
        }
        return(
            <div 
                style={confirmScreen}
                className='container status-bar'>
                <div className='bubble'>
                    <div 
                        className={this.props.one ? 'circle active': 'circle'}> <BsCartCheck/> 
                    </div>
                    <div 
                    className={this.props.one ? 'label active': 'label'}>
                        Cart
                    </div>
                </div>
                <div className={this.props.two ? 'line active-one': 'line'}></div>
                <div className='bubble'>
                    <div className={this.props.two ? 'circle active': 'circle'}>    <TbTruckDelivery/> 
                    </div>
                    <div className={this.props.two ? 'label active': 'label'}>
                        Delivery
                    </div>
                </div>
                <div className={this.props.three ? 'line active-two': 'line'}></div>
                <div className='bubble'>
                    <div className={this.props.three ? 'circle active': 'circle'}>  
                        <MdPayment/> 
                    </div>
                    <div className={this.props.three ? 'label active': 'label'}>
                        Payment
                    </div>
                </div>
                <div className={this.props.four ? 'line active-three': 'line'}></div>
                <div className='bubble'>
                    <div className={this.props.four ? 'circle active': 'circle'}> 
                        <AiOutlineCheckCircle/> 
                    </div>
                    <div className={this.props.four ? 'label active': 'label'}>
                        Confirmation
                    </div>
                </div>

            </div>

        )
    }
} 

export default StatusBar