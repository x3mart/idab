import React from "react";
import {MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon, MDBLink} from "mdbreact";
import {connect} from "react-redux";
import {isNotEmptyObject, proper_phone} from "../functions"
import {YMaps, Map, Placemark} from 'react-yandex-maps';

const Footer = ({contacts}) => {

  return (
    <MDBFooter color="idab-3" className="font-small pt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="4" lg="4" xl="4" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              О нас
            </h6>
            <p
              // className='small'
            >
              Институт делового администрирования и бизнеса по праву считается одним из лидеров на рынке
              бизнес-образования, входит в топ-5 лучших бизнес-школ России: 4-е место в XI
              народном рейтинге, проведенным MBA.SU по результатам опроса выпускников в 2020г.
            </p>
          </MDBCol>
          <hr className="w-100 clearfix d-md-none"/>
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Контакты
            </h6>
            {isNotEmptyObject(contacts) && <div className='footer-contacts'>
              <div className='d-flex my-1'>
                <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                  <MDBIcon icon="map-marker-alt" className='mr-2'/>
                </div>
                <div>
                  {contacts.adress}
                </div>
              </div>
              <a className='p-0 text-white' href={`tel:${contacts.phones[0].phone}`}>
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon icon="phone-alt" className='mr-2'/>
                  </div>
                  <div>
                    {proper_phone(contacts.phones[0].phone)}
                  </div>
                </div>
              </a>
              <a className='p-0' href={`tel:${contacts.phones[1].phone}`}>
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon icon="phone-alt" className='mr-2'/>
                  </div>
                  <div>
                    {proper_phone(contacts.phones[1].phone)}
                  </div>
                </div>
              </a>
              <a
                className='p-0'
                href={`mail:${contacts.email}`}
              >
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon far icon="envelope" className='mr-2'/>
                  </div>
                  <div>
                    {contacts.email}
                  </div>
                </div>
              </a>
              <a className='p-0' href={contacts.links[2].link}>
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon fab icon="facebook-f" className='mr-2'/>
                  </div>
                  <div>
                    {contacts.links[2].name}
                  </div>
                </div>
              </a>
              <a className='p-0' href={contacts.links[1].link}>
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon fab icon="instagram" className='mr-2'/>
                  </div>
                  <div>
                    {contacts.links[1].name}
                  </div>
                </div>
              </a>
              <a className='p-0' href={contacts.links[0].link}>
                <div className='d-flex my-1'>
                  <div className='d-flex justify-content-center align-items-center' style={{width: '30px'}}>
                    <MDBIcon fab icon="youtube" className='mr-2'/>
                  </div>
                  <div>
                    {contacts.links[0].name}
                  </div>
                </div>
              </a>
            </div>}
          </MDBCol>
          <hr className="w-100 clearfix d-md-none"/>
          <MDBCol md="4" lg="5" xl="5" className="mx-auto mt-3">
            <YMaps style={{width: '100%', height: '100%'}}>
              <div>
                <Map defaultState={{center: [55.715517, 37.813369], zoom: 17}} width='100%'>
                  <Placemark geometry={[55.715517, 37.813369]} />
                </Map>
              </div>
            </YMaps>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center pt-3">
        <MDBContainer>
          <div className="d-flex justify-content-between">
            <p className="text-center text-md-left grey-text">
              &copy; 2002-{new Date().getFullYear()} Институт делового администрирования и бизнеса:{" "}
              <a href="https://idab.mba"> idab.mba </a>
            </p>
            <p className="text-center text-md-left grey-text">
              <MDBIcon icon="code" className='mr-2'/><MDBIcon icon="arrow-right" className='mr-2'/><MDBIcon icon="heart"
                                                                                                            className='mr-2'/><MDBIcon
              icon="arrow-right" className='mr-2'/>
              <a href="http://slownut.com"> SlowNut </a>
            </p>
          </div>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

const mapStateToProps = state => ({
  contacts: state.home.contacts
})

export default connect(mapStateToProps)(Footer);