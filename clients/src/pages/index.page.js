import React, { Component } from 'react';

import Uit from '../ABI/Uit.json';
import getWeb3 from '../providers/web3.provider';

class Index extends Component {

    state = {
        web3: null,
        accounts: null,
        contract: null
    }

    componentDidMount = async() => {
        try {
            
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            // get the contract intance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Uit.networks[networkId];
            const instance = new web3.eth.Contract(Uit.abi, deployedNetwork && deployedNetwork.address);

            this.setState({web3, accounts, contract: instance});
        } catch (error) {
            alert("Failed to load web3, accounts, or contract. Check console for details.");
            console.log(error);
        }
    }

    render(){
        if(!this.state.web3){
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return(
        <h1>Good work! {this.state.accounts} </h1>
        )
    }
}

export default Index;