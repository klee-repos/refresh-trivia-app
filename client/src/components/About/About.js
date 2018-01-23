
import React, {Component} from 'react'

import './about.css'

class About extends Component {
    render() {
        return (
            <div className='aboutContainer'>
                <div className='aboutTitle'>
                <h1>About Refresh Labs</h1>
                </div>
                <div className='brief'>
                    <p>Founded in 2017, Refresh Labs specializes in building unique and platform agnostic voice and chat applications. </p>
                </div>
            </div>
        )
    }
}

export default About;