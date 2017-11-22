import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard';

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.changeTwentyOne = this.changeTwentyOne.bind(this);
    }

    changeTwentyOne() {
        if (this.props.twentyOne) {
            this.props.setTwentyOne(false);
        } else {
            this.props.setTwentyOne(true);
        }
    }

    loadHome() {

    }

    render() {
        return (
            <div>
            {!this.props.sessionCode
                ? <p></p>
                : 
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container">
                        <div className="navbar-collapse">
                            <ul className="nav navbar-nav navbar-left">
                                <li>
                                    <NavLink exact to='/'><span className='alexa'>Go Home</span></NavLink>
                                </li>
                                <li>
                                    <a onClick={this.changeTwentyOne}>
                                        <span className='alexa'>Open Twenty One</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a>{this.props.sessionCode && 
                                    <div>Session code: <span className='alexa'>{this.props.sessionCode}</span></div>
                                }</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
        twentyOne: state.twentyOne,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);