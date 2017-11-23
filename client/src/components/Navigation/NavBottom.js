import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as twentyOneActionCreators from '../../redux/modules/twentyOne';
import * as gdaxActionCreators from '../../redux/modules/gdax';

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.twentyOne = this.twentyOne.bind(this);
        this.gdax = this.gdax.bind(this);
    }

    twentyOne() {
        this.props.changeTwentyOne(this.props.twentyOne);
    }

    gdax() {
        this.props.changeGdax(this.props.gdax);
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
                                        <span className='alexa'>Open Investments</span>
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

function mapStateToProps({dashboard, twentyOne, gdax}) {
    return {
        sessionCode: dashboard.sessionCode,
        twentyOne: twentyOne.twentyOne,
        gdax: gdax.gdax,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...twentyOneActionCreators,
            ...gdaxActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);