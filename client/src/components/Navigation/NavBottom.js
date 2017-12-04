import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.twentyOne = this.twentyOne.bind(this);
        this.gdax = this.gdax.bind(this);
        this.weather = this.weather.bind(this);
        this.iex = this.iex.bind(this);
        this.timeDate = this.timeDate.bind(this);
        this.hackerNews = this.hackerNews.bind(this);
    }

    twentyOne() {
        this.props.setApp("blackjack");
    }

    gdax() {
        this.props.setApp("gdax");
    }

    weather() {
        this.props.setApp("weather");
    }
    iex() {
        this.props.setApp("iex");
    }

    timeDate() {
        this.props.setApp("timeDate");
    }

    hackerNews() {
        this.props.setApp("hackerNews");
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
                                    <NavLink exact to='/'><span className='alexa'>Home</span></NavLink>
                                </li>
                                <li>
                                    <a onClick={this.twentyOne}>
                                        <span className='alexa'>Twenty One</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.gdax}>
                                        <span className='alexa'>Coinbase</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.iex}>
                                        <span className='alexa'>IEX</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.timeDate}>
                                        <span className='alexa'>Time/Date</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.hackerNews}>
                                        <span className='alexa'>Hacker News</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.weather}>
                                        <span className='alexa'>Open Weather</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a>{this.props.connectCode && 
                                    <div>Connect code: <span className='alexa'>{this.props.connectCode}</span></div>
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
        sessionCode: dashboard.sessionCode,
        connectCode: dashboard.connectCode
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...dashboardActionCreators,
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);