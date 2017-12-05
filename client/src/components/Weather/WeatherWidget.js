import React, {Component} from 'react';

class WeatherWidget extends Component{
    render(){
        return (
            <div >
                {this.props.summary}
                <div className="appDisclaimer">Powered By DarkSky</div>
            </div>
        )
    }
}

export default WeatherWidget;