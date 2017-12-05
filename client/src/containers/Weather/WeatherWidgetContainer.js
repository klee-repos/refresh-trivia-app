import React, {Component} from 'react'
import {connect} from 'react-redux';

import {WeatherWidget} from '../../components'
import * as weatherRequests from './requests'

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
            weatherRequests.today(nextProps.lat, nextProps.long)
            .then((res) => {
                console.log(res.data)
                this.setState({weatherData:res.data})
            })
            
    }
    render(){
        
        return (
            <div className='weather'>
                 {this.state.weatherData ? <WeatherWidget {...this.state.weatherData}/> : <p></p>}
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

export default connect(mapStateToProps)(WeatherWidgetContainer)