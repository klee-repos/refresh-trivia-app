import React, {Component} from 'react'

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
        axios.get('/apps/weather/forecast/today?' + "lat=" + this.props.location.lat +"&lon=" + this.props.location.lon)
            .then(function(data){
                this.setState({weatherData:data})
            })
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