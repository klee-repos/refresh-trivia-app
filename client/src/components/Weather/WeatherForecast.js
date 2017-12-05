import React, {Component} from 'react';

class WeatherForecast extends Component{

    render(){
        return (
            <div className="Weather">
                {this.props.summary}
                <div className="appDisclaimer">Powered By DarkSky</div>
            </div>
        )
    }
}

export default WeatherForecast;