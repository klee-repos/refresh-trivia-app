import React from 'react';
import BlankQuadrant from './BlankQuadrant'

const QuadrantLayout = function(props){
    if(!props.apps)
        props.apps = []

    while(props.apps.length < 4){
        props.apps.push(BlankQuadrant)
    }

    return (
        <div>
        {props.apps.map(function(app, idx){
            const App = app;
            return <App key={idx}/>
        })}
        </div>
    )
}

 export default QuadrantLayout;