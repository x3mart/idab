import React from 'react';
import {MDBBox, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTypography} from "mdbreact";

const AlVideoSection = () => {
  return (
    <React.Fragment>
      <MDBRow className="my-5 pt-5">
        <MDBCol md="6" className='d-flex justify-content-center align-items-center'>


          <figure className="figure">
            <iframe className="z-depth-2 video-al" max-width="560" height="315" src="https://www.youtube.com/embed/b_BhBZCOEnk"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
            <figcaption className="figure-caption">
              Интервью директора ИДАБ Денисовой А.Л. и руководителя программы MBA<br/>«Управление стоимостью бизнеса» Лопатникова А.Н.
            </figcaption>
          </figure>
        </MDBCol>
        <MDBCol md="6" className='d-flex justify-content-center align-items-center'>
          <MDBTypography blockquote>
            <MDBBox tag="h3" variant="display-4" mb={0}>Развитие в России по-настоящему профессионального
              бизнес-образования, которое, трансформируя личности и компании, способствует росту национальной
              экономики</MDBBox>
            <MDBBox tag="footer" mb={3} className="blockquote-footer">Миссия <cite
              title="Source Title">ИДАБ</cite></MDBBox>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
}

export default AlVideoSection;