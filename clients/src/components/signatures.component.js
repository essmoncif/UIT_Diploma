import React, { Component } from "react";
import PouchConnection from "../pouchdb.connection";
import SignDiploma from "./signDiploma.component";

class Signatures extends Component{

    constructor(props){
        super(props);
        this.state = {
            db: new PouchConnection('uit'),
            web3: null,
            account: null,
            contract: null,
            data : []
        }
    }


    componentDidMount(){

        this.setState({
            web3: this.props.web3,
            account: this.props.account,
            contract: this.props.contract
        });

        this.state.db.getAllDocs().then((resp) => {
            this.setState({data: [...resp.rows]})
        }).catch((err) => {
            console.error(err);
        })

        
    }

    render(){

        

        return(
            <div className="row pt-3">
                {this.state.data.map((row) => {return <SignDiploma key={row.key} web3={this.state.web3} contract={this.state.contract} dean={this.state.account} value={row}/>})}
            </div>
        )
    }

}

export default Signatures;