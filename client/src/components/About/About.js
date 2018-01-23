
import React, {Component} from 'react'

import './about.css'

class About extends Component {
    render() {
        return (
            <div className='aboutContainer'>
                <div className='aboutTitle'>
                    <h1>Refresh Labs</h1>
                </div>
                <div className='brief'>
                    <p>Founded in 2017, Refresh Labs specializes in building platform agnostic conversational applications. </p>
                    <p>Our in-house tool kit lets us build voice and visual UIs into new and existing applications, that can be invoked from any AI chat provider (i.e Google, Alexa, etc.)</p>
                </div>
                <div className="aboutContact">
                    <h1>Contact Us</h1>
                    <p>founders@refreshlabs.co</p>
                </div>
            </div>
        )
    }
}

export default About;