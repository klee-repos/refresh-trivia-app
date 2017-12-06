import React, {Component} from 'react';

class WeatherForecast extends Component{

    render(){
        return (
            <div className="weather">
                <div className="weather">
                    <div className="largeDisplay"></div>
                    <div className="small display">
                        <div className="appDisclaimer">Powered By DarkSky</div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherForecast;