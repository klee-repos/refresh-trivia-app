import React from 'react';
import BlankQuadrant from './BlankQuadrant'

import './quadrant.css'

const QuadrantLayout = function(props){ 
    var apps = props.openApps.slice(0,props.openApps.length);
    if(!apps)
        apps = []

    while(apps.length < 4){
        apps.push(BlankQuadrant)
    }

    return (
        <div className="quadrantContainer">
        {apps.map(function(app, idx){
            //TODO: only render 4
            const App = app;
            return <App layoutClass="quadrantItem" key={idx}/>
        })}
        </div>
    )
}

 export default QuadrantLayout;