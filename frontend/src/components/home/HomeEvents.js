import React, {useState} from "react";
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage,
  MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardFooter, MDBTooltip, MDBIcon, MDBLink
} from "mdbreact";
import {connect} from 'react-redux'
import Moment from 'react-moment';
import EventBlock from "../events/EventBlock";

const HomeEvents = ({events}) => {

  return (
    <div className='idab-2 w-100 z-depth-1'>
      <div className='w-100 idab mt-5 py-5 white-text'>
        <MDBContainer className='home-titles pb-5'>
          <h2 className='text-white'>События</h2>
        </MDBContainer>
      </div>
      <MDBContainer className='events pb-5'>

        <MDBRow className=''>
          {events.slice(0, 3).map((item) => (
            <MDBCol lg="4" className='mb-5 d-flex'>
              <EventBlock item={item}/>
            </MDBCol>
          ))}
        </MDBRow>
        <div className='w-100 d-flex justify-content-center'>
          <MDBLink to="/events">
            <MDBBtn outline color="idab" size="sm">Другие события</MDBBtn>
          </MDBLink>
        </div>
      </MDBContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  events: state.events.events,
})

export default connect(mapStateToProps)(HomeEvents);