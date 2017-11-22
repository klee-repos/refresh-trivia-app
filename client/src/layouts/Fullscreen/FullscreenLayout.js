import React from 'react';

const FullscreenLayout = function(props){
    const App = props.apps[0];
    return (
        <div>
            <App />
        </div>
    )
}

 export default FullscreenLayout;