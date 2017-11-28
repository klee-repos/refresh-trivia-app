


import React, {Component} from 'react'

import ReactDOM from 'react-dom';

import { VictoryChart, VictoryLine,VictoryBar,VictoryAxis, VictoryTheme } from 'victory';


const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

class Vtest extends Component {

    constructor(props) {
        super(props)

        this.state = {
           newArray: this.props.priceHistory.slice()
        }

        this.transform = this.transform.bind(this);
    }

    transform() {
        for (var i in this.props.priceHistory) {
            this.setState(function() {
                newArray
            })
            NewArray[i]['price'] = parseFloat(NewArray[i]['price']);
        }
    }

    render() {
        return(
            <div>

    <VictoryChart
        // range={{ x: [0, 100], y: [0, 1000] }}
        // domain={{ y: [300,500] }}
    >
  <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={this.transform()}
    y='price'
    x='time'    
  />
</VictoryChart>

            </div>
        )
    }

}

export default Vtest;