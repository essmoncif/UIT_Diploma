import React, {Component} from 'react';
import './App.css';
import getWeb3 from './providers/web3.provider';

class App extends Component {

  state = {web3: null, accounts: null};


  componentDidMount = async() => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({web3, accounts});
    } catch (error) {
      alert('Failed to load web3, accounts,')
    }
  }

  render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <header className="App-header">
         {this.state.accounts}
        </header>
      </div>
    );
  }
  
}

export default App;
