import React from 'react';
import BlankQuadrant from './BlankQuadrant'

import './quadrant.css'

const QuadrantLayout = function(props){ 
    if(!props.apps)
        props.apps = []

    while(props.apps.length < 4){
        props.apps.push(BlankQuadrant)
    }

    return (
        <div className="quadrantContainer">
        {props.apps.map(function(app, idx){
            const App = app;
            return <App layoutClass="quadrantItem" key={idx}/>
        })}
        </div>
    )
}

 export default QuadrantLayout;