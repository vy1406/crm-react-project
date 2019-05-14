import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Table from './components/TablePage/Table'
import ActionForm from './components/ActionPage/ActionForm'

import './App.css';
import AnalyticContainer from './components/AnalyticPage/AnalyticContainer';

const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchText: "",
      showPopup: false,
      data: []
    }
  }

  componentDidMount = async () => {
    let data = await axios.get("http://localhost:8080/clients")
    this.setState({ data: data.data })
  }

  consoleLogToDos = () => {
    let arr = [
      'uncomment c.save() in clientDao',
      'make util helper for createCountryAndCounterObject',
      'in action-form, before updating, check that htere is no empty string',
      'show current owner of found client in action, before changing so ill know what is the current'
    ]
    console.log(arr)
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
  handleChange = event => {
    this.setState({
      searchText: event.target.value
    })

  }
  showPopup = (argID) => {
    
    
  }
  getFilteredClients = () => {
    let result = []
    result = this.state.data.filter(c => c.name.toLocaleLowerCase().includes(this.state.searchText.toLocaleLowerCase()))
    return result
  }
  render() {
    this.consoleLogToDos()

    return (

      <Router>
        <div className="App">
          <div id="main-links">
            <Link to="/">Table</Link>
            <Link to="/action">Action form</Link>
            <Link to="/analytics">Charts</Link>
          </div>
        </div>

        <Route exact path="/" render={() => <Table clients={this.state.searchText === "" ?
          this.state.data
          :
          this.getFilteredClients()}
          handleChange={this.handleChange} 
          showPopup={this.showPopup}/>}
          text={this.state.searchText}
        />
        <Route exact path="/action" render={() => <ActionForm clients={this.getClientsForTable()} />} />
        <Route exact path="/analytics" component={AnalyticContainer} />

      </Router>
    );
  }
}

export default App;

