import React, {Component} from 'react';

class WeatherWidget extends Component{

    summary(){
        if(!this.props.hourly)
            return ""
        return this.props.hourly.summary
    }
    render(){
        return (
            <div >
                {this.summary()}
                <div className="appDisclaimer">Powered By DarkSky</div>
            </div>
        )
    }
}

export default WeatherWidget;