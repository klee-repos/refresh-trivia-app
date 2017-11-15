import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: "name"
    }

    this.getSomeData();
  }

  render() {
    return (
      <div>
        <FlipComponent user={this.state.user}/>
      </div>
    );
  }

  getSomeData(){
    axios.get("http://localhost:8080/test/gavin")
      .then(res => {

        this.setState(function(){
          return {user:res.data.user}
        })
      })
  }
}

function FlipComponent(props) {
  return (
    <div>{props.user} wants to do a flip </div>
  )
}

export default App;
