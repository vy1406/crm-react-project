import React, { Component } from 'react';

class ActionForm extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
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
    renderUpdateClient = () => {
        return (
            <div className="Update-Client">
                <h4>Update Client</h4>
                <span>Client</span> <input type="text" name="name" onChange={this.handleChange} placeholder="Client Name" />
                <div className="modify-client">
                    <div>
                        <span>Transfer ownership to</span>
                        <select>{this.getOwners()}</select>
                        <button>Transfer</button>
                    </div>
                    <div>
                        <span>Send email</span>
                        <select>{this.getEmailTypes()}</select>
                        <button>Send Email</button>
                    </div>
                    <div>
                        <span>Declare sale</span>
                        <button>declare!</button>
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