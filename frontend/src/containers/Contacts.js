import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBMask, MDBRow, MDBView} from "mdbreact";
import image1 from '../assets/campus3new1.svg'

import {connect} from 'react-redux';
import {isNotEmptyObject} from "../functions";
import {education_bid} from '../redux/actions/bids';
import {navbar_height, section_height} from "../redux/actions/home";

const Contacts = ({status, education_bid}) => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [info, setInfo] = useState('')

  const [error_email, setError_email] = useState({
    status: false,
    text: []
  })
  const [error_name, setError_name] = useState({
    status: false,
    text: []
  })
  const [error_phone, setError_phone] = useState({
    status: false,
    text: []
  })
  const [sent, setSent] = useState(false)
  const [error_data, setError_data] = useState({})
  const [pending, setPending] = useState(false)

  const clearState = () => {
    setSent(false);
    setError_data({});
    setPending(false);
    setEmail('');
    setName('');
    setPhone('');
    setInfo('');
    setError_email({
      status: false,
      text: []
    });
    setError_name({
      status: false,
      text: []
    });
    setError_phone({
      status: false,
      text: []
    });
  }

  useEffect(() => {
    setError_data({})
    if (status >= 200 && status < 300) {
      setPending(false)
      setSent(true)
    } else if (isNotEmptyObject(status)) {
      setPending(false)
      if (status.request.responseText) {
        setError_data(JSON.parse(status.request.responseText))
      }
    }
  }, [status])

  useEffect(() => {
    if (isNotEmptyObject(error_data)) {
      if ("email" in error_data) {
        setError_email({
          status: true,
          text: error_data.email
        })
      } else {
        setError_email({
          status: false,
          text: []
        })
      }
      if ("name" in error_data) {
        setError_name({
          status: true,
          text: error_data.name
        })
      } else {
        setError_name({
          status: false,
          text: []
        })
      }
      if ("phone" in error_data) {
        setError_phone({
          status: true,
          text: error_data.phone
        })
      } else {
        setError_phone({
          status: false,
          text: []
        })
      }
    }
  }, [error_data])

  const send_bid = () => {
    setPending(true)
    education_bid(email, name, phone, info);
  }


  return (
    <React.Fragment>
      <MDBRow className="px-5 pb-5" style={{marginTop: 148}}>
        <MDBCol md="12">
          <MDBCard reverse>
            <MDBView cascade>
              <img src={image1} alt=""/>
              <MDBMask overlay="white-slight" className="waves-light"/>
            </MDBView>
            <MDBCardBody cascade className='p-0'>
              <MDBRow>
                <MDBCol lg="8" className='pl-3 h-100'>
                  <div className="form ml-4 mt-4" style={{minHeight:300}}>
                    {pending ?
                      <div className='h-100 d-flex justify-content-center align-items-center'>
                        <div className="spinner-grow text-idab" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                      :
                      sent ?
                        <div className='h-100 d-flex flex-column justify-content-center text-center align-items-center'>
                          <MDBIcon far icon="check-circle" size="4x" className='text-success mb-4'/>
                          <h3 className='mb-4'>Ваша заявка успешно отправлена</h3>
                          <h5>Наши сотрудники свяжутся с Вами в ближайшее время.</h5>
                          <MDBBtn
                            outline
                            color="dark"
                            onClick={() => clearState()}
                          >
                            Закрыть
                          </MDBBtn>
                        </div>
                        :
                        <div>
                          <h3 className="mt-4 text-idab">
                            <MDBIcon icon="envelope" className="pr-2"/>
                            Свяжитесь с нами
                          </h3>
                          <MDBRow>

                            <MDBCol md="12">
                              <div className="md-form mb-0">
                                <MDBInput
                                  getValue={(v) => {
                                    setName(v)
                                  }}
                                  label="Фамилия Имя Отчество"
                                  group
                                  type="text"
                                  className={error_name.status ? "form-control is-invalid" : ""}
                                  value={name}
                                >
                                  {error_name.text.map((item, i) => (
                                    <div key={i} className="invalid-feedback">
                                      {item}
                                    </div>
                                  ))}
                                </MDBInput>
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol md="6">
                              <div className="md-form mb-0">
                                <MDBInput
                                  getValue={(v) => setPhone(v)}
                                  label="Номер телефона"
                                  group
                                  type="phone"
                                  className={error_phone.status ? "form-control is-invalid" : ""}
                                  value={phone}
                                >
                                  {error_phone.text.map((item, i) => (
                                    <div key={i} className="invalid-feedback">
                                      {item}
                                    </div>
                                  ))}
                                </MDBInput>
                              </div>
                            </MDBCol>
                            <MDBCol md="6">
                              <div className="md-form mb-0">
                                <MDBInput
                                  getValue={(v) => {
                                    setEmail(v)
                                  }}
                                  label="Email"
                                  group
                                  type="email"
                                  className={error_email.status ? "form-control is-invalid" : ""}
                                  value={email}
                                >
                                  {error_email.text.map((item, i) => (
                                    <div key={i} className="invalid-feedback">
                                      {item}
                                    </div>
                                  ))}
                                </MDBInput>
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol md="12">
                              <div className="md-form mb-0">
                                <MDBInput
                                  getValue={(v) => setInfo(v)}
                                  label="Сообщение"
                                  group
                                  type="textarea"
                                  rows="3"
                                  value={info}
                                >

                                </MDBInput>
                                <MDBBtn
                                  className='btn-rounded btn-outline-idab mb-5'
                                  disabled={pending}
                                  onClick={send_bid}
                                >
                                  <MDBIcon icon="paper-plane"/>
                                </MDBBtn>
                              </div>
                            </MDBCol>
                          </MDBRow>
                        </div>

                    }
                  </div>
                </MDBCol>
                <MDBCol lg='4' className='contacts '>
                  <MDBCardBody className='text-center h-100 text-idab'>
                    <h3 className='my-4 pb-2'>Контактная информация</h3>
                    <ul className='text-lg-left list-unstyled ml-4'>
                      <li>
                        <p>
                          <MDBIcon icon='map-marker-alt' className='pr-2'/>
                          Рязанский проспект, дом 99, ГУУ
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon='phone' className='pr-2'/>+7 (495) 376-42-33
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon='phone' className='pr-2'/>+7 (916) 348-50-81
                        </p>
                      </li>
                      <li>
                        <p>
                          <MDBIcon icon='envelope' className='pr-2'/>
                          idab@guu.ru
                        </p>
                      </li>
                    </ul>
                    <hr className='hr-idab my-4 idab'/>
                    <ul className='list-inline text-center list-unstyled'>
                      <li className='list-inline-item'>
                        <a href='https://www.facebook.com/idab.mba/' className='p-2 fa-lg w-ic'>
                          <MDBIcon fab icon='facebook-f'/>
                        </a>
                      </li>
                      <li className='list-inline-item'>
                        <a href='http://instagram.com/idabmba' className='p-2 fa-lg w-ic'>
                          <MDBIcon fab icon='instagram'/>
                        </a>
                      </li>
                      <li className='list-inline-item'>
                        <a href='https://www.youtube.com/channel/UCSdbPmOUWFKPsc9KM4TTz9w' className='p-2 fa-lg w-ic'>
                          <MDBIcon fab icon='youtube'/>
                        </a>
                      </li>
                    </ul>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  status: state.bids.study_bid_status
});

export default connect(mapStateToProps, {education_bid})(Contacts);