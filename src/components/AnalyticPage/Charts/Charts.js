import React, { Component } from 'react';
import TopEmployeeChart from './TopEmployeeChart'
import ClientAcquisitionChart from './ClientAcquisitionChart'
import CountrySalesChart from './CountrySalesChart'
import SalesSinceMonthChart from './SalesSinceMonthChart'

class Charts extends Component {

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