import React, { useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBBtn,
} from 'mdbreact'
import './Login.css'

import bg from '../assets/login_bg.jpg'
import { connect } from 'react-redux'
import { reset_password } from '../redux/actions/auth/auth'
import { Redirect, Link } from 'react-router-dom'

const PassReset = ({ reset_password, status }) => {
  const [email, setEmail] = useState('')
  const [statusData, setStatusData] = useState(false)
  const [redirectToLogin, setRedirectToLogin] = useState(false)

  useEffect(() => {
    if (status >= 200 && status < 300) {
      setStatusData(true)
    }
  }, [status])

  const handlePassChange = () => {
    reset_password(email)
    if (status >= 200 && status < 300) {
      setStatusData(true)
    }
  }

  const handlePassChangeSuccess = () => {
    setRedirectToLogin(true)
  }

  if (redirectToLogin) {
    return <Redirect to='/login' />
  }

  return (
    <div className='classic-form-page' id='login'>
      <div
        className='view'
        data-test='view'
        style={{ backgroundImage: `url('${bg}')` }}
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
                      <h3>Восстановление пароля</h3>
                    </div>
                    {statusData ? (
                      <div>
                        <p className='text-success'>
                          Вы успешно инициировали смену пароля! В течение
                          нескольких минут Вам на почту поступит письмо с
                          дальнейшими инструкциями.
                        </p>
                        <div className='text-center mt-3 black-text'>
                          <MDBBtn
                            className='idab-gradient'
                            size='lg'
                            type='button'
                            onClick={handlePassChangeSuccess}
                          >
                            Закрыть
                          </MDBBtn>
                        </div>
                      </div>
                    ) : (
                      <div className='input-white-text'>
                        <MDBInput
                          type='email'
                          label='Email'
                          icon='envelope'
                          iconClass='white-text'
                          onChange={e => setEmail(e.target.value)}
                        />
                        <div className='text-center mt-3 black-text'>
                          <MDBBtn
                            className='idab-gradient'
                            size='lg'
                            type='button'
                            onClick={handlePassChange}
                          >
                            Отправить
                          </MDBBtn>
                        </div>
                        <hr />
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error_text: state.auth.error,
  status: state.auth.status,
})

export default connect(mapStateToProps, { reset_password })(PassReset)
