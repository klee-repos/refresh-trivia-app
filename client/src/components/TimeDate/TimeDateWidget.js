 
 import React, {Component} from 'react'

 import './timeDate.css'

 class TimeDateWidget extends Component {

    render() {
        return (
            <div>
                <div className='timeDate'>
                {this.props.time
                    ? <div className='timeDateContainer'>
                        <div className='timeDateColumn'>
                            <h1>{this.props.time}</h1>
                        </div>
                    </div>
                    : null
                }
                {this.props.date
                    ? <div className='timeDateContainer'>
                        <div className='timeDateColumn'>
                            <span>{this.props.date}</span>
                        </div>
                    </div>
                    : null
                }
                </div>
            </div>
        )
    }
 }

 export default TimeDateWidget;