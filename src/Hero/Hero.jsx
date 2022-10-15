import React from "react"
import './Hero.css'
import video from '../assets/farm-slideshow.mp4'
import {GiFarmer} from 'react-icons/gi'

class Hero extends React.Component {
    render () {
        return(
            <section className="hero">
                <video playsInline autoPlay muted loop src={video}>
                    Your Browser Does not Support This Video
                </video>
                <div className="video-overlay"></div>
                <h1 className="hero-header">Farm Table</h1>
                <div className='logo'>
                        <GiFarmer size={'550px'}/>
                </div>
                <h2 className="hero-sub-header">A New Way of <br/>Ordering Food Online</h2>
                {/* <Button className='btn' name='Meet Your Local Farmers'></Button> */}
            </section>
        )
    }
}
export default Hero