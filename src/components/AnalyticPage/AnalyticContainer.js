import React, { Component } from 'react';
import Badges  from './Badges/Badges';
import Charts  from './Charts/Charts';


const axios = require('axios')

class AnalyticContainer extends Component {
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
    calculateBadges = () => {
        let result = []
        return result
    }
    getArrayOfCharts = () => {
        let result = []
        return result
    }
    render() {
        return (
            <div>
                <Badges badges={this.calculateBadges}/>
                <Charts charts={this.getArrayOfCharts} />
            </div >
        )
    }
}


export default AnalyticContainer;