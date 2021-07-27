import React, {useState, Fragment} from 'react';
import {MDBCol, MDBContainer, MDBIcon, MDBIframe, MDBModal, MDBModalBody, MDBModalHeader, MDBRow} from "mdbreact";
import play from '../../assets/play.svg';
import background from '../../assets/home_background4-inv.jpg'

import {connect} from 'react-redux';

const FirstSection = ({height, margin}) => {

  const firstSectionStyle = {height: height, marginTop: margin}

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  return (

    <Fragment>
      <MDBModal size="fluid" isOpen={modal} toggle={toggle}>
        <MDBModalBody className="mb-0 py-0 fluid-modal">
          <button type="button" className="modal-close close" aria-label="Close" onClick={toggle}><span aria-hidden="true">×</span></button>
          <div className="embed-responsive-16by9 z-depth-1-half">
            <MDBIframe src="https://www.youtube.com/embed/XuoNzzWXvPY"/>
          </div>
        </MDBModalBody>
      </MDBModal>
      <MDBRow className="w-100 mx-0 d-flex justify-content-stretch idab-2" style={firstSectionStyle}>
        <MDBCol className="home-first-section d-flex justify-content-center align-items-center text-idab" md="6">
          <div>
            <h2>Почему я выбрал MBA</h2>
            <p
              style={{cursor: 'pointer'}}
              onClick={toggle}>
              <span className="mr-3">
                <img src={play} alt=""/>
              </span>Смотреть видео отзыв
              наших выпускников
            </p>
          </div>
        </MDBCol>
        <MDBCol
          md="6"
          className="home-first-section"
          style={{ backgroundImage: 'url(' + background + ')', backgroundPosition: 'center', backgroundSize: 'cover'}}
        >
        </MDBCol>
      </MDBRow>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  height: state.home.section_height,
  margin: state.home.navbar_height,
});

export default connect(mapStateToProps,)(FirstSection);