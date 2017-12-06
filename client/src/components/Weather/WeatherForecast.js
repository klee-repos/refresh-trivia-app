import React, {Component} from 'react';

class WeatherForecast extends Component{

    render(){
        return (
            <div className="forecastContainer">
                <div className="forecastContainer">
                    <div className="largeDisplay">Test</div>
                    <div className="smallDisplay">
                        <div className="appDisclaimer">Powered By DarkSky</div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherForecast;