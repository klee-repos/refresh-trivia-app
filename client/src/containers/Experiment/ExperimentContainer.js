
import React, {Component} from 'react';

import {connect} from 'react-redux';

import socket from '../../config/socket'


class ExperimentContainer extends Component {

    constructor(props) {
        super(props)

        socket.on('gdaxData', function(data) {
            console.log(data);
        }.bind(this));
        socket.emit("gdax-subscribe");
    }

    render() {
        return (
            <div>
                {/* Hello {this.props.data
                        ? <span>{this.props.data.price}</span>
                        : <p>no data</p>
                    } */}
                    </div>
        )
    }
}

function mapStateToProps({dashboard}){
    return {
        data: dashboard.data
    };
}


export default connect(mapStateToProps)(ExperimentContainer);