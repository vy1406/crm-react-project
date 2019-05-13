import React, { Component } from 'react';
import TopEmployeeChart from './TopEmployeeChart'
import ClientAcquisitionChart from './ClientAcquisitionChart'
import CountrySalesChart from './CountrySalesChart'
import SalesSinceMonthChart from './SalesSinceMonthChart'

const axios = require('axios')

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
    getAllOwners = () => {
        let result = []
        this.state.clients.forEach(c => result.push(c.owner))
        result = [...new Set(result)] // make unique
        return result
    }
    getTopEmployeeData = () => {
        let data = [{ name: 'Page A', pv: 2400, }, { name: 'Page B', pv: 1398, }, { name: 'Page C', pv: 9800 }];
        let listOfOwners = this.getAllOwners()
        data = []
        listOfOwners.forEach(owner => {
            let clientsByCurrentOwner = this.state.clients.filter(c => c.owner === owner).length
            data.push({ owner: owner, pv: clientsByCurrentOwner })
        })

        listOfOwners = this.sort(data)
        return data.slice(0,3)
    }
    // bubble sort
    sort = listOfOwners => {
        
        let result = listOfOwners
        for (let i = 0; i < listOfOwners.length; i++) {
            let curOwner = listOfOwners[i]
            for (let j = 0; j < i; j++) {
                console.log(curOwner.pv + " : " + listOfOwners[j])
                if (curOwner.pv > listOfOwners[j].pv) {
                    result[i] = result[j]
                    result[j] = curOwner
                }
            }
        }
        return result
    }
    getClientAcquisitionChart = () => {

    }
    getSalesSinceMonthChart = () => {

    }
    createCountryAndCounterObject = (countries) => {
        let arrCountryAndCounter = {}
        for (let i = 0; i < countries.length; i++) {
            if (arrCountryAndCounter[countries[i]] === undefined)
                arrCountryAndCounter[countries[i]] = 0
            else
                arrCountryAndCounter[countries[i]] += 1
        }
        return arrCountryAndCounter
    }
    calculateHottestCountry = () => {
        let countries = this.state.clients.map(c => { return c.country })
        let arrCountryAndCounter = this.createCountryAndCounterObject(countries)
        return this.getNameOfHottestCountry(arrCountryAndCounter)
    }
    getCountrySalesChart = () => {
        let countries = this.state.clients.map(c => { return c.country })
        let arrCountryAndCounter = this.createCountryAndCounterObject(countries)
        let keys = Object.keys(arrCountryAndCounter)
        const data = []
        for (let key of keys) {
            data.push({
                country: key,
                pv: arrCountryAndCounter[key]
            })
        }
        return data
    }
    render() {
        return (
            <div>CHARTS:
                <TopEmployeeChart data={this.getTopEmployeeData()} />
                <ClientAcquisitionChart data={this.getClientAcquisitionChart()} />
                <SalesSinceMonthChart data={this.getSalesSinceMonthChart()} />
                <CountrySalesChart data={this.getCountrySalesChart()} />
            </div>
        )
    }
}

export default Charts;