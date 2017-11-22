import React from 'react';

const FullscreenLayout = function(props){
    if(!props.apps.length >=1 )
        return <div></div>
        
    const App = props.apps;
    return (
        <div>
            <App />
        </div>
    )
}

 export default FullscreenLayout;