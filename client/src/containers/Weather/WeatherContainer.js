import React, {Component} from 'react'
import {connect} from 'react-redux';

import {Weather} from '../../components/'
import axios from 'axios'

// import socket from '../../config/socket'

class WeatherContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: null,
            timer: null,
        }
        
        this.today();
        this.today = this.today.bind(this)
        
    }

    componentWillReceiveProps(nextProps){
        console.log("Next props: lat:" + nextProps.lat + " long: " +nextProps.long)
        if(nextProps.lat === this.props.lat && nextProps.long === this.props.long){
            return;
        }
        this.today(nextProps);
    }

    today(loc){
        if(!loc) return;
        axios.get('/apps/weather/forecast/today?' + 'lat=' + loc.lat + '&long=' + loc.long)
            .then(function(res){
                this.setState({weatherData:res.data});        
            }.bind(this));
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
                 {this.state.weatherData ? <Weather {...this.state.weatherData}/> : <p>Loading</p>}
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

export default connect(mapStateToProps)(WeatherContainer)