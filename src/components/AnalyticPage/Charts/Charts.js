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
        return data.slice(0, 3)
    }
    // bubble sort
    sort = listOfOwners => {

        let result = listOfOwners
        for (let i = 0; i < listOfOwners.length; i++) {
            let curOwner = listOfOwners[i]
            for (let j = 0; j < i; j++) {
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
    createDayAndNumberObject = () => {
        let curMonth = new Date().getMonth()
        if (curMonth < 10)
            curMonth = "0" + curMonth
        let objOfDaysSoldByMonth = {}
        let arrDates = []
        this.state.clients
            .filter(c => c.sold === true)
            .filter(c => c.firstContact.split("T")[0].split("-")[1] === curMonth)
            .map(c => {
                arrDates.push({ day: c.firstContact.split("T")[0].split("-")[2] })
            })
        for (let i = 0; i < arrDates.length; i++) {
            if (objOfDaysSoldByMonth[arrDates[i].day] === undefined)
                objOfDaysSoldByMonth[arrDates[i].day] = 0
            else
                objOfDaysSoldByMonth[arrDates[i].day] += 1
        }
        return objOfDaysSoldByMonth
    }
    arrayOfSalesPerDay = dayAndNumberObj => {
        let result = []
        let keys = Object.keys(dayAndNumberObj)
        keys.forEach(key => {
            let tempKey = key.split("")[0] === "0" ? key.split("")[1] : key
            result.push({
                day: tempKey,
                pv: dayAndNumberObj[key]
            })
        })

        return result
    }
    sortByKey = arrToSort => {
        let daysOfMonthHardCoded = this.getStringOfdays()
        let result = []
        daysOfMonthHardCoded.forEach(day => {
            if (arrToSort[day])
                result.push({ day, pv: arrToSort[day].pv })
        })
        return result
    }
    getStringOfdays = () => {
        let result = []
        for (let i = 1; i <= 31; i++)
            result.push(i)
        return result
    }
    getSalesSinceMonthChart = () => {
        let dayAndNumberObj = this.createDayAndNumberObject()
        let arraySalesPerDay = this.arrayOfSalesPerDay(dayAndNumberObj)
        let sorted = this.sortByKey(arraySalesPerDay)
        console.log(sorted)
        return sorted
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
            <div>
                <TopEmployeeChart data={this.getTopEmployeeData()} />
                <ClientAcquisitionChart data={this.getClientAcquisitionChart()} />
                <SalesSinceMonthChart data={this.getSalesSinceMonthChart()} />
                <CountrySalesChart data={this.getCountrySalesChart()} />
            </div>
        )
    }
}

export default Charts;