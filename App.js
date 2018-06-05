import React, { Component } from 'react'

import './App.css'

import SideBar from './components/SideBar'

// import Table from './components/Table'

class App extends Component {
  render() {
    return (
      <div className="text-center">
      <SideBar/>
      <div className="main-content">
        {this.props.children}     
      </div>
      {/* <Table ne="3"
            ce="3"
            indice="1"
            area="1"
            densidade="2"/> */}
    </div>
    );
  }
}

export default App;
