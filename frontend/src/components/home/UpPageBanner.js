import React from 'react';
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";

import {connect} from "react-redux";
import {isNotEmptyObject, proper_phone} from "../../functions";

const UpPageBanner = ({contacts}) => {
  return (
    <MDBContainer>
      {isNotEmptyObject(contacts) && <MDBRow className='pt-2'>
        <MDBCol md="4">
          <a href={contacts.links[2].link} target="_blank">
            <MDBIcon brand icon='facebook-f' className='white-text mr-3'/>
          </a>
          <a href={contacts.links[1].link} target="_blank">
            <MDBIcon brand icon='instagram' className='white-text mr-3'/>
          </a>
          <a href={contacts.links[0].link} target="_blank">
            <MDBIcon brand icon='youtube' className='white-text'/>
          </a>
        </MDBCol>
        <MDBCol className="d-flex justify-content-end" md="8">
          <a href={`tel:${contacts.phones[0].phone}`} target="_blank" className="white-text">
            <span className='mr-3'><MDBIcon className='mr-2' icon="phone-alt"/>{proper_phone(contacts.phones[0].phone)}</span>
          </a>
          <a href={`tel:${contacts.phones[1].phone}`} target="_blank" className="white-text">
            <span className='mr-3'><MDBIcon className='mr-2' icon="phone-alt"/>{proper_phone(contacts.phones[1].phone)}</span>
          </a>
          <a href={`mail:${contacts.email}`} target="_blank" className="white-text">
            <span><MDBIcon className='mr-2' far icon="envelope"/>idab@guu.ru</span>
          </a>
        </MDBCol>
      </MDBRow>}
    </MDBContainer>
  );
}

const mapStateToProps = state => ({
  contacts: state.home.contacts
})

export default connect(mapStateToProps)(UpPageBanner);