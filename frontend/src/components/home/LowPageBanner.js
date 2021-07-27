import React from 'react';
import {MDBCol, MDBIcon, MDBLink, MDBRow} from "mdbreact";

const LowPageBanner = () => {

  return (
    <MDBRow className='pt-2'>
      <MDBCol md="4" className="d-flex justify-content-center">
        <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">MBA старт: </span> 19 ноября 2021</p>
      </MDBCol>
      <MDBCol md="4" className="d-flex justify-content-center">
        <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">Продолжительность: </span> 2
          года
        </p>
      </MDBCol>
      <MDBCol md="4" className="d-flex justify-content-center">
        <MDBLink to='/index.php/programmy/mba/' className='p-0 white-text'>
          <p className="pre-text-light mb-0"><MDBIcon icon="angle-double-down" className="mr-2"
                                                    style={{fontSize: '1rem'}}/><span
          className="pre-text-bold mr-2">Выбрать специализацию</span></p>
        </MDBLink>
      </MDBCol>
    </MDBRow>
  );

}

export default LowPageBanner;
