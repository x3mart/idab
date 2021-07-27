import React, {useEffect, useState} from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBBtn
} from 'mdbreact';
import './Login.css';


import bg from '../assets/login_bg.jpg'
import {connect} from "react-redux";
import {login} from "../redux/actions/auth/auth";
import {Redirect, useHistory} from 'react-router-dom'

const Login = ({login, isAuthenticated}) => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const history = useHistory()

  console.log(isAuthenticated)


  const handleLogin = () => {
    login(email, pass)
  }

  if (isAuthenticated) {
    // history.push('/dashboard')
    return <Redirect to='/dashboard/main'/>
  }

  return (
      <div className='classic-form-page' id='login'>

        <div
          className="view"
          data-test="view"
          style={{backgroundImage: `url('${bg}')`}}

        >
          <MDBMask
            className='d-flex justify-content-center align-items-center'
            overlay='black-strong'
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      <div className='form-header idab-gradient'>
                        <h3>
                          Личный кабинет
                        </h3>
                      </div>
                      <MDBInput
                        type='email'
                        label='Email'
                        icon='envelope'
                        iconClass='white-text'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <MDBInput
                        type='password'
                        label='Пароль'
                        icon='lock'
                        iconClass='white-text'
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <div className='text-center mt-3 black-text'>
                        <MDBBtn
                          className='idab-gradient' size='lg'
                          type="submit"
                          onClick={() => handleLogin()}
                        >
                          Вход
                        </MDBBtn>
                        <hr/>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </div>
      </div>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
