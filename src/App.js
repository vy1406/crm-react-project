import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Table from './components/TablePage/Table'
import ActionForm from './components/ActionPage/ActionForm'
import ChartContainer from './components/ChartPage/ChartContainer'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: require('../src/utils/data')
    }
  }


  getClientsForTable = () => {
    let arr = []
    arr = this.state.data.map(c => {
      return {
        _id: c._id,
        name: c.name.split(" ")[0],
        surname: c.name.split(" ")[1],
        emailType: c.emailType,
        firstContact: c.firstContact,
        sold: c.sold,
        owner: c.owner,
        country: c.country
      }
    })

    return arr
  }

  render() {
    return (

      <Router>
        <div className="App">
          <div id="main-links">
            <Link to="/">Table</Link>
            <Link to="/action">Action form</Link>
            <Link to="/analytics">Charts</Link>
          </div>
        </div>

        <Route exact path="/" render={() => <Table clients={this.getClientsForTable()} />} />
        <Route exact path="/action" render={() => <ActionForm clients={this.getClientsForTable()} />} />
        <Route exact path="/analytics" component={ChartContainer} />

      </Router>
    );
  }
}

export default App;

