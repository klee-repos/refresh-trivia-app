import React, {Component} from 'react';

class Weather extends Component{

    summary(){
        if(!this.props.hourly)
            return ""
        return this.props.hourly.summary
    }
    render(){
        console.log(this.props)
        return (
            <div className="Weather">
                {this.summary()}
                <div className="appDisclaimer">Powered By DarkSky</div>
            </div>
        )
    }
}

export default Weather;