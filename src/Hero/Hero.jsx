import React from "react";
import './Hero.css'
import Button from "../Button/Button";

class Hero extends React.Component {
    render () {
        return(
            <section className="hero">
                <h1 className="hero-header">Farm to Table</h1>
                <h2 className="hero-sub-header">A Revolutionary Way of Ordering Food Online</h2>
                {/* <Button className='btn' name='Meet Your Local Farmers'></Button> */}
            </section>
        )
    }
}
export default Hero