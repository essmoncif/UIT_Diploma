import React, { Component } from 'react';

import Uit from '../ABI/Uit.json';
import Profil from '../components/profil.component';
import getWeb3 from '../providers/web3.provider';
import "../App.css";
import Student from '../components/student.component';
import Diploma from '../components/diploma.component';
import Signatures from '../components/signatures.component';
class Index extends Component {

    state = {
        web3: null,
        accounts: null,
        contract: null,
        dean: {
            first_name: null,
            last_name: null,
            address: null
        },
        loaded: false
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
            await this.isDean();
            this.setState({loaded: true});
        } catch (error) {
            alert("Failed to load web3, accounts, or contract. Check console for details.");
            console.log(error);
        }
    }

    isDean = async() => {
        try {
            const {accounts, contract} = this.state;
            const result = await contract.methods.getDean().call();
            
            if(result['dean_address'] === accounts[0]){
                const dean = {
                    first_name: result['first_name'],
                    last_name: result['last_name'],
                    address: result['dean_address']
                }
                
                this.setState({dean});
                
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    render(){
        if(!this.state.web3 && this.state.loaded === false){
            
            return <div>Loading Web3, accounts, and contract...</div>;
            
        }else{
            

            return(
                <div className="container bootdey flex-grow-1 container-p-y" >
                    {this.state.loaded? <Profil dean={this.state.dean}/>: <div>loading ...</div>}
                    <div className="row">
                        {this.state.loaded? <Student web3={this.state.web3} contract={this.state.contract} account={this.state.accounts[0]} />: <div>loading ...</div>}
                        {this.state.loaded? <Diploma web3={this.state.web3} contract={this.state.contract} account={this.state.accounts[0]} />: <div>loading ...</div>}
                    </div>
                    {this.state.loaded? <Signatures web3={this.state.web3} contract={this.state.contract} account={this.state.accounts[0]} />: <div>loading ...</div>}
                </div>
            )
        }
    
        
    }
}

export default Index;