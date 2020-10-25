import React, { Component } from "react";


class Student extends Component {

    constructor(props){

        super(props);
        this.state = {
            web3: null,
            account: null,
            contract: null,
            student: null,
            address: '' 
        };


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
            this.state.contract.methods.getStudent(this.state.address).call({from: this.state.account}, (error, result)=>{
                if(result){
                    this.setState({student: result});
                    console.log(this.state)
                }else{
                    if(error){
                        console.log(error);
                    }
                }
            });
        }
    }

    componentDidMount(){
        this.setState({web3: this.props.web3, contract: this.props.contract, account: this.props.account});
    }

    result(student){
        if(student){
            const birthday = new Date(student[2] * 1000);
            const date = birthday.getDate()+"-"+(birthday.getMonth()+1)+"-"+birthday.getFullYear();
            return (
                <div className="card-footer widget-30">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{backgroundColor: "lightsalmon"}} >Frist name</span>
                        </div>
                        <div className="form-control">
                            {student[0]}
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{backgroundColor: "lightsalmon"}} >Last name</span>
                        </div>
                        <div className="form-control">
                            {student[1]}
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{backgroundColor: "lightsalmon"}} >Birthday</span>
                        </div>
                        <div className="form-control">
                            {date}
                        </div>
                    </div>
                </div>
            )
        }
        
    }
    
    
    render() {
        return (
            <div className="col-lg-6">
                <div className="card card-margin">
                    <div className="card-header no-border">
                        <h5 className="card-title">Search for a student</h5>
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
                                    <button type="submit" className="btn btn-sm btn-primary">Search</button>
                                </div>
                            </form>
                            {this.result(this.state.student)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Student;