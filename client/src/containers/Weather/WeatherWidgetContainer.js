import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'
import  {WeatherRequests} from '../../requests'

class WeatherWidgetContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            weatherData:null
        }
    }

    hasChanged(nextProps){
        return !(nextProps.lat === this.props.lat && nextProps.long === this.props.long)
    }

    componentWillReceiveProps(nextProps){
        if(this.hasChanged(nextProps))
            WeatherRequests.today(nextProps.lat, nextProps.long)
            .then((res) => this.setState({weatherData:res.data}));
    }
    render(){
        
        return (
            <div className={this.props.layoutClass}>
                 {this.state.weatherData ? <WeatherWidget {...this.state.weatherData}/> : <p></p>}
            </div>
        )
    }
}


function mapStateToProps({weather}) {
    return {
        lat: weather.location.lat,
        long: weather.location.long
    }
}

export default connect(mapStateToProps)(WeatherWidgetContainer)