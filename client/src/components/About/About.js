
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
                    <p>A project team formed in 2017, we are a group of developers and designers creating new and exciting multi-modal experiences for all voice assistants.</p>
                    <p>This mult-modal trivia demo was created using our open-source cross-platform framework, Ayva.</p>
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