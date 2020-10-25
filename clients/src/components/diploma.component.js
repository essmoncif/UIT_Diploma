import React, { Component } from "react";
import { Button } from "react-bootstrap";
import DiplomaModal from "./diploma.modal.component";

class Diploma extends Component {

    constructor(props){
        super(props);
        this.state = {
            web3: null,
            account: null,
            contract: null,
            address: '',
            diploma: null,
            modalShow: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    

    handleChange(event){
        this.setState({address: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(!this.state.web3.utils.isAddress(this.state.address)){
            alert('Incorrect address');
        }else{
            this.state.contract.methods.getDiploma(this.state.address).call({from: this.state.account}, (error, result)=>{
                if(result){
                    this.setState({diploma: result});
                    console.log(this.state)
                }else{
                    if(error){
                        console.error(error);
                    }
                }
            });
        }
    }

    componentDidMount(){
        this.setState({web3: this.props.web3, contract: this.props.contract, account: this.props.account});
    }

    setModalShow(set){
        this.setState({modalShow: set})
    }
    

    render(){

        

        return(
            <div className="col-lg-6">
                <div className="card card-margin">
                    <div className="card-header no-border">
                        <h5 className="card-title">Search for a diploma</h5>
                    </div>
                    <div className="card-body pt-2">
                        <div className="widget-49">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text badge-warning">@</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Address" value={this.state.address} onChange={this.handleChange} />  
                                </div>
                                <div className="widget-49-meeting-action">
                                    <Button type="submit" className="btn btn-sm btn-primary" onClick={() => this.setModalShow(true)} >Search</Button>
                                    {this.state.diploma? <DiplomaModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} diploma={this.state.diploma} address={this.state.address} /> : <div></div> }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Diploma;