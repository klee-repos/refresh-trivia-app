
import React, {Component} from 'react';


import './home.css'

import HomeNav from './HomeNav'

class Home extends Component {
    render() {
        return (
            
            <div className='home'>
                <HomeNav />
                <div className='homeNavMessage'>
                    <div className='homeContainer'>
                        <div className='message'>
                        <h1>Voice-Driven User Experience</h1>
                        </div>
                        </div>
                        <div className='homeContainer'>
                        <img src={require('./img/alexa-react.png')} alt='alexa-react'/>
                        </div>
                </div>
            </div>
        )
    }
}

export default Home;