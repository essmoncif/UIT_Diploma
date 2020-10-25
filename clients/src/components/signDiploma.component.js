import React, { Component } from "react";
import QRCode from 'qrcode.react';
import ExcelDateToJSDate from '../excel.date';
import PouchConnection from "../pouchdb.connection";

class SignDiploma extends Component {

    constructor(props){
        super(props);

        this.state = {
            db: new PouchConnection('uit'),
            value: null,
            web3: null,
            contract: null,
            dean: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        const date = ExcelDateToJSDate(this.state.value.doc.value[3]);
        this.state.contract.methods.addStudent(this.state.value.doc.value[0], this.state.value.doc.value[1], this.state.value.doc.value[2], date.getTime())
            .send({from: this.state.dean})
            .then((receipt) => {
                console.log("SET-STUDENT", receipt);
                const diploma = {
                    title: this.state.value.doc.value[4],
                    university: this.state.value.doc.value[5],
                    student: this.state.value.doc.value[0],
                    dean: this.state.dean,
                    mention: this.state.value.doc.value[6]
                }
                const metadata = JSON.stringify(diploma);
                const finger_print = this.state.web3.utils.sha3(metadata);
                this.state.web3.eth.sign(finger_print, this.state.dean)
                    .then((result) => {
                        console.log(result)
                        this.state.contract.methods.registerDiploma(diploma.title, diploma.university, diploma.student, diploma.mention, finger_print, result)
                            .send({from: this.state.dean})
                            .then((receipt) => {
                                console.log(receipt);
                                this.state.db.delete(diploma.student)
                                    .then((resp) => {console.log('DELETE-STUDENT', resp); alert(`${diploma.student} successfully graduated` ); document.location.reload()})
                                    .catch((err)=> console.error("ERROR-DELETE-STUDENT", err))
                            })
                            .catch((err) => {
                                console.error("ERROR-SET-DIPLOMA", err);
                            })
                    })
                    .catch((err) => {
                        console.error("ERROR-SIGN-MESSAGE", err);
                    })
            })
            .catch((err) => {
                console.error("SET-STUDENT-ERR", err);
            })
    }

    onChange(event){
        
    }

    componentDidMount(){
        this.setState({
            value: this.props.value, 
            web3: this.props.web3,
            contract: this.props.contract,
            dean: this.props.dean
        });
    }

    render(){
        if(!this.state.value){
            return <div>Loading ...</div>
        }else{
            console.log(this.state.value)
            const date = ExcelDateToJSDate(this.state.value.doc.value[3]);
            const bithday = date.getDate()+"/"+(date.getMonth() + 1)+"/"+date.getFullYear();
            return(
                <div className="col-lg-3 col-sm-6 mb-30 pb-2">
                <div className="team-card-style-3 mx-auto">
                    <div className="col-sm-10">
                        <div className="team-thumb" >
                            <QRCode value={this.state.value.doc.value[0]} ></QRCode>
                        </div>
                        <div className="badge badge-pill badge-light"><small> {this.state.value.doc.value[0]} </small></div>
                    </div>
                    <h4 className="team-name">{this.state.value.doc.value[1]} {this.state.value.doc.value[2]}</h4>
                    <div className="team-contact-link" > {bithday} </div>
                    <div className="team-contact-link" > {this.state.value.doc.value[4]}</div>
                    <div className="team-contact-link" > faculty : {this.state.value.doc.value[5]}</div>
                    <div className="team-contact-link" > Mention : {this.state.value.doc.value[6]}</div>
                    <div className="team-social-bar-wrap">
                        <div className="team-social-bar">
                            <div className="social-btn sb-style-1">
                                <form onSubmit={this.onSubmit}>
                                    <button type="submit" className="btn badge-primary" onChange={this.onChange}>sign</button>
                                </form>
                                
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
}

export default SignDiploma;