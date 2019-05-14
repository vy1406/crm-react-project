import React, { Component } from 'react';

class ClientRow extends Component {
    showPopup = () => {
        this.props.showPopup(this.props.client._id)
    }
    render() {
        return (
            <tr onClick={this.showPopup}>  
                <td>{this.props.client.name}</td>
                <td>{this.props.client.surname}</td>
                <td>{this.props.client.emailType}</td>
                <td>{this.props.client.firstContact.split("T")[0]}</td>
                <td>{this.props.client.sold ? "SOLD" : "NOT_SOLD"}</td>
                <td>{this.props.client.owner}</td>
                <td>{this.props.client.country}</td>
            </tr>
        )
    }
}

export default ClientRow;