import QRCode from 'qrcode.react';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function DiplomaModal(props) {

    const birthday = new Date(Number(props.diploma["_student"]["birthday"]));
    const date = birthday.getDate()+"-"+(birthday.getMonth()+1)+"-"+birthday.getFullYear();
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.diploma["_title"]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-lg-15">
            <div className="team-card-style-3 mx-auto">
              <div className="col-sm-1">
                  <div className="team-thumb" >
                      <QRCode value={props.address} ></QRCode>
                  </div>
                  <div className="badge badge-pill badge-light"><small> {props.address} </small></div>
              </div>
              <h4 className="team-name">{props.diploma['_student']['fist_name']} {props.diploma['_student']['last_name']}</h4>
              <div className="team-contact-link" > Birthday: {date} </div>
              <div className="team-contact-link" > Mention: {props.diploma["_mention"]} </div>
              <div className="team-contact-link" > FingerPrint: <div className="badge badge-pill badge-light"> {props.diploma["_hash"]} </div> </div>
              <div className="row">
                <div className="card-footer widget-30 d-flex justify-content-start">
                <figure className="figure">
                  <QRCode value= {props.diploma["_hash"]}/>
                  <figcaption className="figure-caption text-center sm-10">FingerPrint</figcaption>
                </figure>
                </div>

                <div className="card-footer widget-30 d-flex justify-content-end">
                  <figure className="figure">
                    <QRCode value= {props.diploma["_signature"]}/>
                    <figcaption className="figure-caption text-center sm-10">signature</figcaption>
                  </figure>
                </div>
              </div>
          </div>
        </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default DiplomaModal;