import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';



class SalesSinceMonthChart extends Component {
    constructor(props) {
        super(props)
    }

    renderLineChart = () =>
        (
            <div >
                <LineChart width={800} height={400} data={this.props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        )

    render() {
        return (
            <div>
                {this.renderLineChart()}
            </div>
        )
    }
}

export default SalesSinceMonthChart;