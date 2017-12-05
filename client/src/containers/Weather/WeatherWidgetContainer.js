import React, {Component} from 'redux'
import {connect} from 'react-redux';
import {WeatherWidget} from '../../components'

import * as weatherRequests from './requests'
class WeatherWidgetConatiner {

    constructor(props){
        super(props);

        this.state = {
            weatherData:null
        }

        weatherRequests.today(this.props.lat,this.props.long).then(res => this.setState({weatherData:res.data}));        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.lat === this.props.lat && nextProps.long === this.props.long){
            return;
        }
        this.today(nextProps);
    }
    render(){
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <WeatherWidget {...this.state.weatherData}/> : <p></p>}
            </div>
        )
    }
}