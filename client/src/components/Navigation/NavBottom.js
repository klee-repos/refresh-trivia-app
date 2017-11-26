import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as iexActionCreators from '../../redux/modules/iex'

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.twentyOne = this.twentyOne.bind(this);
        this.gdax = this.gdax.bind(this);
        this.iex = this.iex.bind(this);
    }

    twentyOne() {
        this.props.setApp("blackjack");
    }

    gdax() {
        this.props.setApp("gdax");
    }

    iex() {
        this.props.setApp("iex");
    
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
                                    <a onClick={this.twentyOne}>
                                        <span className='alexa'>Open Twenty One</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.gdax}>
                                        <span className='alexa'>Open Coinbase</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.iex}>
                                        <span className='alexa'>Open IEX</span>
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

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...dashboardActionCreators,
            ...iexActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);