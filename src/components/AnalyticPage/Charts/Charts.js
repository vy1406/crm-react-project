import React, { Component } from 'react';
import TopEmployeeChart from './TopEmployeeChart'
import ClientAcquisitionChart from './ClientAcquisitionChart'
import CountrySalesChart from './CountrySalesChart'
import SalesSinceMonthChart from './SalesSinceMonthChart'

class Charts extends Component {

    constructor() {
        super()
        this.state = {
            clients: []
        }
    }

    componentDidMount = async () => {
        let data = await axios.get("http://localhost:8080/clients")
        this.setState({ clients: data.data })
    }
    
    render() {
        return (
            <div>CHARTS:
                <TopEmployeeChart />
                <ClientAcquisitionChart />
                <SalesSinceMonthChart />
                <CountrySalesChart />
            </div>
        )
    }
}

export default Charts;