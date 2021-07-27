import React from 'react';
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

import bg from '../../static/img/фото1_197_cut.jpg'

class Login extends React.Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  render() {
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
                      />
                      <MDBInput
                        type='password'
                        label='Пароль'
                        icon='lock'
                        iconClass='white-text'
                      />
                      <div className='text-center mt-3 black-text'>
                        <MDBBtn className='idab-gradient' size='lg'>
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
}

export default Login;
