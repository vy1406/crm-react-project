import React, { Component } from 'react';
import { PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
class ClientAcquisitionChart extends Component {

    constructor(props) {
        super(props)
    }
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
    RADIAN = Math.PI / 180;
    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    generateColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
        const y = cy + radius * Math.sin(-midAngle * this.RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    render() {
        const data = [
            { name: '1-qrtr', value: 270 },
            { name: '2-qrtr', value: 156 },
            { name: '3-qrtr', value: 87 },
            { name: '4-qrtr', value: 200 },
        ];
        const data01 = [
            { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
        ];
        const data02 = [
            { name: 'A1', value: 100 },
            { name: 'A2', value: 300 },
            { name: 'B1', value: 100 },
            { name: 'B2', value: 80 },
            { name: 'B3', value: 40 },
            { name: 'B4', value: 30 },
            { name: 'B5', value: 50 },
            { name: 'C1', value: 100 },
            { name: 'C2', value: 200 },
            { name: 'D1', value: 150 },
            { name: 'D2', value: 50 },
        ];

        return (

            <PieChart width={730} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={1}
                    isAnimationActive={false}
                    label
                >
                    {
                        data.map((entry, index) => <Cell fill={this.COLORS[index % this.COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>


            // <PieChart width={400} height={400}>
            //     <Pie
            //         data={data}
            //         cx={200}
            //         cy={200}
            //         labelLine={false}
            //         label={this.renderCustomizedLabel}
            //         outerRadius={80}
            //         fill="#8884d8"
            //         dataKey="value"
            //         isAnimationActive={false}
            //     >
            //         {
            //             data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
            //         }
            //     </Pie>
            // </PieChart>


            // <PieChart width={400} height={400}>
            //     <Pie data={data01} isAnimationActive={false} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
            //     <Pie data={data02} isAnimationActive={false} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
            // </PieChart>


            /*
                    dunno if works.
                    render() {
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
            */
        )
    }
}

export default ClientAcquisitionChart;
