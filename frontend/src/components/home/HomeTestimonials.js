import React, {useState} from 'react';
import {MDBAvatar, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {connect} from "react-redux";
import HomeTestimonialBlock from "./HomeTestimonialBlock";

const HomeTestimonials = ({testimonials}) => {

  return (
    <MDBContainer  className="mt-5">
      <div className="home-titles">
          <h2>Отзывы выпускников</h2>
        </div>
      <MDBRow className='d-flex justify-content-center justify-content-lg-stretch testimonials-section'>
        <MDBCol lg='6' className='d-flex justify-content-center align-items-center' style={{height: '70vh'}}>
          <figure className="figure">
            <iframe className="z-depth-2 video-al" src="https://www.youtube.com/embed/h86z3REddW0" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            <figcaption className="figure-caption">
              Поздравления выпускников ИДАБ
            </figcaption>
          </figure>
        </MDBCol>
        <MDBCol lg='6' className='overflow-auto testimonials' style={{height: '70vh'}}>
          {testimonials.map((item) => (
            <HomeTestimonialBlock
              key={item.id}
              name={item.name}
              company={item.company}
              position={item.position}
              avatar={item.avatar}
              body={item.body}
              video={item.video}
            />
          ))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const mapStateToProps = state => ({
  testimonials: state.home.home_testimonials,
});

export default connect(mapStateToProps)(HomeTestimonials);