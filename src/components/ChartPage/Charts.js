import React, { Component } from 'react';
import SingleChart from './SingleChart'
class Charts extends Component {

    render() {
        return (
             <div>CHARTS:
                 <SingleChart />
                 <SingleChart />
                 <SingleChart />
             </div>
        )
    }
}

export default Charts;