
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

import './informationFooter.css'

import copyright from '../../img/copyright.png'

class InformationFooter extends Component {
    render() {
        return (
            <div className='informationFooterContainer'>
                <div className='footerBox'>
                    <div className='privacyPolicy'>
                        <NavLink to='/privacyPolicy'><span>Privacy policy</span></NavLink>
                    </div>
                    <div className='copyRight'>
                        <img className='copyrightIcon' src={copyright} alt='copyrightIcon'/>
                        <span>2018 Refresh Labs</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default InformationFooter