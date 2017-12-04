import React, {Component} from 'react'
import {connect} from 'react-redux';

import {Weather} from '../../components/'
import axios from 'axios'

class WeatherContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData: null
        }
        
        this.today = this.today.bind(this)
    }

    today(){
        axios.get('/apps/weather/forecast/today?' + "lat=" + this.props.lat +"&long=" + this.props.long)
            .then((function(res){
                    this.setState({weatherData:res.data})
                }).bind(this));
    }

    componentDidMount() {
       
    }

    render(){
        this.today();
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