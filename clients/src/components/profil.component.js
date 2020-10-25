import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { ExcelRenderer } from 'react-excel-renderer';
import PouchConnection from '../pouchdb.connection';

class Profil extends Component {

    constructor(props){
        super(props);
        this.state = {
            dean: {
                first_name: null,
                last_name: null,
                address: null
            },
            db: new PouchConnection('uit'),
            file: null,
            file_data: null,
            exist: false
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount(){
        const dean = this.props.dean;
        this.setState({dean, exist: true});    
    }

    onChange(event){
        this.setState({file: event.target.files[0]});
        ExcelRenderer(event.target.files[0], (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{
              this.setState({file_data: resp});
            }
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.file && this.state.file_data){
            for(var i =1; i< this.state.file_data.rows.length; i++){
                this.state.db.put(this.state.file_data.rows[i][0], this.state.file_data.rows[i])
                .then((result) => {
                    console.log(result);
                })
                .then(_ => {document.location.reload()})
                .catch((err) => {
                    console.error(err)
                    alert('Error to store data into the browser storage check out console for more details');
                });
            }
        }else{
            alert('Nothing to import!')
        }
        
    }

    render(){
        if(this.state.exist === false){
            return <div> Loading...</div>
        }else{
            console.log(this.state)
            return(
                <div className="filter-result">
                    <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                        <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                            
                            <div className="job-content">
                                <h5 className="text-center text-md-left"> {this.state.dean.first_name} {this.state.dean.last_name}</h5>
                                <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                    <li className="mr-md-4">
                                        <i className="zmdi zmdi-pin mr-2"></i> Dean
                                    </li>
                                    <li className="mr-md-4">
                                        <i className="zmdi zmdi-money mr-2"></i> {this.state.dean.address}
                                    </li>
                                </ul>
                                <div className="job-left">
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="input-group col-8">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" name="file" onChange={this.onChange} />
                                            <label className="custom-file-label" >Choose Excel file</label>
                                        </div>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" >Import</button>
                                        </div>
                                    </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="job-right my-4 flex-shrink-0">
                            <QRCode value={this.state.dean.address} className="d-block w-100 d-sm-inline-block btn-light"></QRCode>
                        </div>
                        
                    </div>
                </div>
            )
        }
        
        
    }
}

export default Profil;