import React, {useState} from 'react';
import {MDBAvatar, MDBBtn, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";

const ManagementComponent = ({data}) => {

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <React.Fragment>
      <div className="card testimonial-card">
        <MDBModal isOpen={modal} toggle={toggle} size='lg'>
          <MDBModalHeader toggle={toggle} className='card-up info-color'></MDBModalHeader>
          <div className='avatar mx-auto white'><img src={data.user.avatar}
                                                     className="rounded-circle img-fluid"/></div>
          <MDBModalBody>
            <h4 className="font-weight-bold dark-grey-text">
              {data.user.name}
            </h4>
            <h6 className="text-uppercase grey-text mb-3">{data.full_position}</h6>
            <p>{data.description}</p>
          </MDBModalBody>
        </MDBModal>
      </div>
      <MDBCol md="4" className="mb-5" style={{cursor: 'pointer'}} onClick={toggle}>
        <MDBAvatar
          tag="img"
          src={data.user.avatar}
          className="rounded z-depth-1-half img-fluid"
          alt="Sample avatar"
        />
        <h4 className="font-weight-bold dark-grey-text my-4">
          {data.user.name}
        </h4>
        <h6 className="text-uppercase grey-text mb-3">{data.short_position}</h6>
      </MDBCol>
    </React.Fragment>
  );
}

export default ManagementComponent;