import React, { Component } from 'react';
import HottestCountryBadge from './HottestCountryBadge';
import EmailSentBadge from './EmailSentBadge';
import NewClientsBadge from './NewClientsBadge';
import TopClientsBadge from './TopClientsBadge';

const axios = require('axios')

class Badges extends Component {
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

    getNumberOfUnsentEmails = () => this.state.clients.filter(c => c.emailType === null).length

    getNumberOfUnsoldClients = () => this.state.clients.filter(c => c.sold == true).length

    getNumberOfNewClients = () => {
        const curDate = new Date()
        let arrNewClients = []
        this.state.clients.forEach(c => {
            const clientYear = c.firstContact.split("T")[0].split("-")[0]
            const clientMonth = c.firstContact.split("T")[0].split("-")[1]

            if (clientYear == curDate.getFullYear() && clientMonth == curDate.getMonth())
                arrNewClients.push(c)
        })
        return arrNewClients.length
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

    getNameOfHottestCountry = (arrCountryAndCounter) => {
        let hottestCountry = ""
        let curMax = 0
        let keys = Object.keys(arrCountryAndCounter)

        for (let key of keys)
            if (arrCountryAndCounter[key] > curMax)
                hottestCountry = key

        return hottestCountry
    }

    calculateHottestCountry = () => {
        let countries = this.state.clients.map(c => { return c.country })
        let arrCountryAndCounter = this.createCountryAndCounterObject(countries)
        return this.getNameOfHottestCountry(arrCountryAndCounter)
    }

    render() {
        this.calculateHottestCountry()
        return (
            <div>
                <h4>Badges:</h4>
                <HottestCountryBadge hottestCountry={this.calculateHottestCountry()} />
                <EmailSentBadge clientNumber={this.getNumberOfUnsentEmails()} />
                <NewClientsBadge clinetNumber={this.getNumberOfNewClients()} />
                <TopClientsBadge clientNumber={this.getNumberOfUnsoldClients()} />
            </div>
        )
    }
}

export default Badges;