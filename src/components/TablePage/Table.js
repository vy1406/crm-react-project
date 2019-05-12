import React, { Component } from 'react';
import ClientRow from './ClientRow'

class Table extends Component {

    render() {
        return (
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
                    {this.props.clients.map(c => <ClientRow key={c._id} client={c} />)}
                </tbody>
            </table>
        )
    }
}

export default Table;