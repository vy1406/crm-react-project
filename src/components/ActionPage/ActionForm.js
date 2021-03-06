import React, { Component } from 'react';
const axios = require('axios')
class ActionForm extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            surname: "",
            email: "",
            emailType: "",
            sold: false,
            owner: "",
            country: "",
            inputName: "",
            clients: []
        }
    }
    getAllOwners = () => {
        let result = []
        this.state.clients.forEach(c => result.push(c.owner))
        result = [...new Set(result)] // make unique
        return result
    }
    getOwners = () => {
        let result = []
        let arr = this.getAllOwners()
        result.push(<option disabled selected value="">Choose Owner</option>)
        arr.forEach(owner => {
            let curOwner = <option value={owner}>{owner}</option>
            result.push(curOwner)
        })
        return result
    }
    getEmailTypes = () => {
        let result = []
        let arr = ['A', 'B', 'C', 'D']
        result.push(<option selected disabled>Email Type</option>)

        arr.forEach(E => {
            let curEmailType = <option value={E}>{E}</option>
            result.push(curEmailType)
        })
        return result
    }
    saveUser = async () => {
        let params = {
            name: this.state.name,
            surname: this.state.surname,
            email: "",
            emailType: "",
            sold: false,
            owner: this.state.owner,
            country: this.state.country,
        }
        await axios.post("http://localhost:8080/client", params)
    }
    componentDidMount = async () => {
        let data = await axios.get("http://localhost:8080/clients")
        this.setState({ clients: data.data })
    }

    declareSale = async () => {
        let user_id = this.findIdByName(this.state.inputName)
        await axios.put("http://localhost:8080/declareSale", {user_id})
    }

    changeOwner = async () => {
        let newOwner = this.state.owner
        let user_id = this.findIdByName(this.state.inputName)

        await axios.put("http://localhost:8080/changeOwner", {user_id,newOwner})
    }

    changeEmailType = async () => {
        const emailType = this.state.emailType
        const user_id = this.findIdByName(this.state.inputName)

        await axios.put("http://localhost:8080/changeEmailType",  {user_id, emailType})
    }

    handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

    getListOfSuggestions = () => {
        let result = this.state.clients.filter(c => c.name.toLocaleLowerCase().includes(this.state.name.toLocaleLowerCase()) ||
            c.surname.toLocaleLowerCase().includes(this.state.name.toLocaleLowerCase()))
        let arrOptions = []
        for (let i = 0; i < result.length; i++) {
            let fullName = result[i].name + " " + result[i].surname
            let curName = <option key={result[i]} value={fullName}></option>
            arrOptions.push(curName)
        }
        if (arrOptions.length > 10)
            arrOptions = arrOptions.slice(0, 10)
        return (
            <datalist id="clientList">
                {arrOptions}
            </datalist>
        )
    }
    getListOfSuggestedCountries = () => {
        let result = this.state.clients.filter(c => c.country.toLocaleLowerCase().includes(this.state.country.toLocaleLowerCase()))
        result = result.map(c => { return c.country })
        result = [...new Set(result)]
        let arrOptions = []

        for (let i = 0; i < result.length; i++) {
            let country = <option value={result[i]}></option>
            arrOptions.push(country)
        }

        if (arrOptions.length > 10)
            arrOptions = arrOptions.slice(0, 10)

        return (
            <datalist id="countries">
                {arrOptions}
            </datalist>
        )
    }
    findIdByName = (fullName) => {
        let name = fullName.split(" ")[0]
        let surname = ""
        if (fullName.split(" ").length > 1) 
            surname = fullName.split(" ")[1]

        let client = this.state.clients.filter(c => c.name === name && c.surname === surname) 
        let id =  client[0] ? client[0]._id : ""
        return id
    }
    handleInput = event => this.setState( {inputName : event.target.value})
    
    renderUpdateClient = () => {
        return (
            <div className="Update-Client">
                <h4>Update Client</h4>
                <span>Client</span>
                <input list="clientList" name="name" onChange={this.handleInput} placeholder="Client Name" />
                {this.getListOfSuggestions()}
                <div className="modify-client">
                    <div>
                        <span>Transfer ownership to</span>
                        <select name="owner" onChange={this.handleChange}>{this.getOwners()}</select>
                        <button onClick={this.changeOwner}>Transfer</button>
                    </div>
                    <div>
                        <span>Send email</span>
                        <select name="emailType" onChange={this.handleChange}>{this.getEmailTypes()}</select>
                        <button onClick={this.changeEmailType}>Send Email</button>
                    </div>
                    <div>
                        <span>Declare sale</span>
                        <button onClick={this.declareSale}>declare!</button>
                    </div>

                </div>
            </div >
        )
    }
    renderNewClient = () => {
        return (
            <div className="Add-Client">
                <h4>Add Client</h4>
                <div>
                    <span>First name</span>
                    <input type="text" name="name" onChange={this.handleChange} placeholder="Input Name" />
                </div>
                <div>
                    <span>Surname</span>
                    <input type="text" name="surname" onChange={this.handleChange} placeholder="Input Surname" />
                </div>
                <div>
                    <span>Country</span>
                    <input list="countries" name="country" onChange={this.handleChange} placeholder="Input Country" />
                    {this.getListOfSuggestedCountries()}
                </div>
                <div>
                    <span>Owner</span>
                    <select name="owner" onChange={this.handleChange}>{this.getOwners()}</select>
                </div>
                <div>
                    <button onClick={this.saveUser}>Add client</button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderUpdateClient()}
                <hr></hr>
                {this.renderNewClient()}
            </div>
        )
    }
}

export default ActionForm;