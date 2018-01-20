
import React, {Component} from 'react'

// Team One images
import teamOneBarOne from '../../img/t1-coinBar100.png'
import teamOneBarThree from '../../img/t1-coinBar300.png'
import teamOneBarSeven from '../../img/t1-coinBar700.png'
import teamOneBarFifteen from '../../img/t1-coinBar1500.png'

// Team two images
import teamTwoBarOne from '../../img/t2-coinBar100.png'
import teamTwoBarThree from '../../img/t2-coinBar300.png'
import teamTwoBarSeven from '../../img/t2-coinBar700.png'
import teamTwoBarFifteen from '../../img/t2-coinBar1500.png'

import './coinBar.css'

class CoinBar extends Component {

    setImage(activeTeam){
        if (activeTeam === 'Team 1') {
            switch(this.props.questionIndex){
                case 2: return (<img className='pointBarImg' src={teamOneBarOne} alt='teamOneBarOne'/>)
                case 3: return (<img className='pointBarImg' src={teamOneBarThree} alt='teamOneBarThree'/>)
                case 4: return (<img className='pointBarImg' src={teamOneBarSeven} alt='teamOneBarSeven'/>)
                case 5: return (<img className='pointBarImg' src={teamOneBarFifteen} alt='teamOneBarFifteen'/>)
                default: return (<img className='pointBarImg' src={teamOneBarOne} alt='teamOneBarOne'/>)
            }
        } else {
            switch(this.props.questionIndex){
                case 2: return (<img className='pointBarImg' src={teamTwoBarOne} alt='teamTwoBarOne'/>)
                case 3: return (<img className='pointBarImg' src={teamTwoBarThree} alt='teamTwoBarThree'/>)
                case 4: return (<img className='pointBarImg' src={teamTwoBarSeven} alt='teamTwoBarSeven'/>)
                case 5: return (<img className='pointBarImg' src={teamTwoBarFifteen} alt='teamTwoBarFifteen'/>)
                default: return (<img className='pointBarImg' src={teamTwoBarOne} alt='teamTwoBarOne'/>)
            }
        }
    }

    render() {
        var image = this.setImage(this.props.activeTeam);
        return (
            <div className='coinBarContainer'>
                <div className='coinBar'>
                    {image}
                </div>
            </div>
        )
    }
}

export default CoinBar