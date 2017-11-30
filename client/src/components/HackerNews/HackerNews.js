
import React, {Component} from 'react'

import './hackerNews.css'

class HackerNews extends Component {
    render() {
        return (
            <div className='hackerNews'>
                <div className='hackerNewsContainer'>
                    <table className='table borderless'>
                        <thead>
                            <tr>
                                <th>Latest Hacker News</th>
                                <th>Score</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.headlines.map(function(headline, idx) {
                            return (
                                <tr key={idx}>
                                    <td>{headline.title}</td>
                                    <td className='centeredColumn'>{headline.score}</td>
                                    <td className='centeredColumn'>{headline.totalComments}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default HackerNews;