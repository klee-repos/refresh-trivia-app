
import React, {Component} from 'react'

import './timeDate.css'

class TimeDate extends Component {

    render() {
        return (
            <div className='timeDate'>
                {this.props.time
                    ? <div className='timeDateContainer'>
                        <div className='timeDateColumn'>
                            <h1>{this.props.time.hours}:{this.props.time.minutes}:{this.props.time.seconds} {this.props.time.timeOfDay}</h1>
                        </div>
                    </div>
                    : <p>Loading...</p>
                }
                {this.props.date
                    ? <div className='timeDateContainer'>
                        <div className='timeDateColumn'>
                            <span>{this.props.date.dayOfWeek}, {this.props.date.monthName} {this.props.date.day} {this.props.date.year}</span>
                        </div>
                    </div>
                    : <p>Loading...</p>
                }
            </div>
        )
    }
}

export default TimeDate;