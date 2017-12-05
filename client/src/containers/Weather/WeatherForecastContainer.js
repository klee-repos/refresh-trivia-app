import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherForecast} from '../../components/'

var weatherRequests = require('./requests.js');

class WeatherForecastContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: null,
            timer: null,
        }
        
        weatherRequests.today(this.props.lat,this.props.long).then(res => this.setState({weatherData:res.data}));
    }

    componentWillReceiveProps(nextProps){
        console.log("Next props: lat:" + nextProps.lat + " long: " +nextProps.long)
        if(nextProps.lat === this.props.lat && nextProps.long === this.props.long){
            return;
        }
        this.today(nextProps);
    }

    componentDidMount() {
        let timer = setInterval(this.today, 50000);
        this.setState({timer})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render(){
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <WeatherForecast {...this.state.weatherData}/> : <p>Loading</p>}
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        lat: weather.lat,
        long: weather.long
    }
}

export default connect(mapStateToProps)(WeatherForecastContainer)