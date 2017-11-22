import React from 'react';

const FullscreenLayout = function(props){
    const App = props.blah.apps;
    console.log(App);
    return (
        <div>
            <App />
        </div>
    )
}

 export default FullscreenLayout;