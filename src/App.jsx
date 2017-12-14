import React, { Component } from 'react';
import logo from './assets/img/logo.svg';

class App extends Component {
  openUrl() {
    window.location = 'https://docs.segmentfault.com/'
  }
  render() {
    this.openUrl()
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
