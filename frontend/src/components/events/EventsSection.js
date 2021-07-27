import React, {useEffect, useRef, useState} from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody, MDBCardFooter,
  MDBCardImage, MDBCardText,
  MDBCardTitle,
  MDBCol, MDBContainer, MDBLink,
  MDBMask,
  MDBRow, MDBTooltip,
  MDBView
} from "mdbreact";
import image1 from "../../assets/events.jpeg";

import {connect} from 'react-redux'
import Moment from "react-moment";
import EventBlock from "./EventBlock";

const EventsSection = ({events}) => {


  const image_block = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (image_block.current) {
      setWidth(image_block.current.offsetWidth)
      if (width > 0) {
        setHeight(width / 3)
      }
    }
  },)

  useEffect(() => {
    image_block.current.height = height
  }, [height])

  return (
    <React.Fragment>

      <MDBRow className="">
        <MDBCol md="12">

          <div className='px-5'>
            <div
              ref={image_block}
              className="z-depth-2 position-relative"
              data-test="view"
              style={{
                backgroundImage: 'url(' + image1 + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: height,
                zIndex: '2',
                borderRadius: '.25rem',
                // boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
              }}
            >

              <div
                data-test="container"
                className="container position-absolute h-100"
              >

                <MDBRow className='mx-5 h-100'>
                  <MDBCol size='8' className='d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column'>
                      <h3 className='mission-text'></h3>
                      <div className='mission-footer d-inline'><p className='d-inline'> <span></span></p>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol size='4'></MDBCol>
                </MDBRow>

              </div>
            </div>
          </div>

          <div
            className='.z-depth-1 idab'
            style={{
              width: '100vw',
              padding: '4rem',
              margin: '-1rem 0 -2rem 0'
            }}
          >
            <h2 className="white-text text-center font-weight-bolder">
                События
              </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer>
        <MDBRow>
          {events.map((item) => (
            <MDBCol md="4" className='d-flex mb-5'>
              <EventBlock item={item}/>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>

    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(EventsSection);