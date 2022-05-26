import React, { Component } from 'react';
import Form from './Form';
import Header from './Header';
import Table from './Table';

class Wallet extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Form />
        </div>
        <div>
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
