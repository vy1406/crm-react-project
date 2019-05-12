import React, { Component } from 'react';
const axios = require('axios') 
class ActionForm extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            surname: "",
            email: "",
            emailType: "",
            sold: false,
            owner: "",
            country: ""
        }
    }
    getOwners = () => {
        let result = []
        let arr = ['owner1', 'owner2', 'owner3']
        result.push(<option>Owner</option>)
        arr.forEach(owner => {
            let curOwner = <option value={owner}>{owner}</option>
            result.push(curOwner)
        })
        return result
    }
    getEmailTypes = () => {
        let result = []
        let arr = ['A', 'B', 'C', 'D']
        result.push(<option>Email Type</option>)

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
    declareSale = async () => {
        let params = {
            user_id: "user_id1"
        }
        await axios.put("http://localhost:8080/declareSale", params)
    }
    changeOwner = async () => {
        let params ={
            user_id: "user_id1",
            newOwner: "newOwner1"
        }
        await axios.put("http://localhost:8080/changeOwner", params)
    }
    changeEmailType = async () => {
        let params ={
            user_id: "user_id1",
            emailType: "emailType1"
        }
        await axios.put("http://localhost:8080/changeEmailType", params)
    }
    handleChange = (event) =>  this.setState({ [event.target.name]: event.target.value })

    renderUpdateClient = () => {
        return (
            <div className="Update-Client">
                <h4>Update Client</h4>
                <span>Client</span> <input type="text" name="name" onChange={this.handleChange} placeholder="Client Name" />
                <div className="modify-client">
                    <div>
                        <span>Transfer ownership to</span>
                        <select>{this.getOwners()}</select>
                        <button onClick={this.changeOwner}>Transfer</button>
                    </div>
                    <div>
                        <span>Send email</span>
                        <select>{this.getEmailTypes()}</select>
                        <button onClick={this.changeEmailType}>Send Email</button>
                    </div>
                    <div>
                        <span>Declare sale</span>
                        <button onClick={this.declareSale}>declare!</button>
                    </div>

                </div>
            </div>
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
                    <input type="text" name="country" onChange={this.handleChange} placeholder="Input Country" />
                </div>
                <div>
                    <span>Owner</span>
                    <input type="text" name="owner" onChange={this.handleChange} placeholder="Input Owner" />
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