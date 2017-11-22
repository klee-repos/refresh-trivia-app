
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TwentyOne} from '../../components'

class TwentyOneContainer extends Component {

    render() {
        return (
            <div>
            {this.props.twentyOne
                ? <div className='container'>
                    <h3>TwentyOne</h3>
                    <div className='row'><TwentyOne /></div>
                </div>
                : <p></p>         
            }
            </div>
        )
    }   
}

function mapStateToProps(state) {
    return {
        twentyOne: state.twentyOne,
    }
}

export default connect(mapStateToProps)(TwentyOneContainer);