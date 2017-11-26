import React, {Component} from 'react'
import {connect} from 'react-redux';

import Weather from '../../components'
import axios from 'axios'

class WeatherContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: {}
        }
    }

    componentDidMount(){
        this.Today();
    }

    Today(){
        // axios.get('/apps/weather/forecast/today?' + "lat=" + this.props.location.lat +"&lon=" + this.props.location.lon)
        axios.get('/apps/weather/forecast/today?' + "lat=" + 42 +"&lon=" + -70)
        .then((function(res){
                console.log(res.data);
                this.setState({weatherData:res.data})
            }).bind(this));
    }

    render(){
        return (
            <div className={this.props.layoutClass}>
                {/* <Weather weatherData={this.state.weatherData}/> */}
                {this.state.weatherData.timeZone}
            </div>
        )
    }
}

function mapStateToProps({weather}) {
    return {
        location: weather.location
    }
}

export default connect(mapStateToProps)(WeatherContainer)