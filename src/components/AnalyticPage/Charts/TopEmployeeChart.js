import React, { Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


// const data = [
//     {
//         name: 'Page A', pv: 2400,
//     },
//     {
//         name: 'Page B', pv: 1398,
//     },
//     {
//         name: 'Page C', pv: 9800,
//     }

// ];

class TopEmployeeChart extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="owner" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                </BarChart>
            </div>
        )
    }
}

export default TopEmployeeChart;