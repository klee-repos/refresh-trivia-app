
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {TimeDate} from '../../components/'

class TimeDateContainer extends Component {

    render() {
        return (
            <div className={this.props.layoutClass}>
                <TimeDate time={this.props.time} date={this.props.date}/>
            </div>
        )
    }
}

function mapStateToProps({timeDate}) {
    return {
        time: timeDate.time,
        date: timeDate.date
    }
}

export default connect(mapStateToProps)(TimeDateContainer);