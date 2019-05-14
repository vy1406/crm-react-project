import React, { Component } from 'react';
import ClientRow from './ClientRow'

class Table extends Component {

    render() {
        return (
            <div>
                <input type="text" name="search" onChange={this.props.handleChange} placeholder="Search by" />
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>surname</th>
                            <th>emailType</th>
                            <th>date</th>
                            <th>sold</th>
                            <th>owner</th>
                            <th>country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.clients.map(c => <ClientRow key={c._id} client={c} showPopup={this.props.showPopup} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;