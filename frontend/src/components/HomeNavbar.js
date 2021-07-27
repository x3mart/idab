import React, {Fragment, useState, useEffect} from "react";
import {
  MDBBtn,
  MDBCollapse,
  MDBIcon, MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";

import {connect} from 'react-redux';
import {section_height, navbar_height} from '../redux/actions/home';
import {education_bid} from '../redux/actions/bids';

import logoGUU from "../assets/logo-guu.png";
import logoIDAB from "../assets/logo-big.svg";
import UpPageBanner from "./home/UpPageBanner";
import LowPageBanner from "./home/LowPageBanner";
import {isNotEmptyObject} from "../functions";

const HomeNavbar = ({trigger, section_height, navbar_height, education_bid, status}) => {

  const [collapseID, setCollapseID] = useState('');
  const [page, setPage] = useState('home')
  const [path, setPath] = useState('')

  useEffect(() => {
    const window_height = window.innerHeight;
    const n_height = document.getElementById('navbar').clientHeight;
    const height = window_height - n_height - 80;
    section_height(height);
    navbar_height(n_height);
  }, [])

  useEffect(() => {
    setPath(window.location.pathname)
  }, [window.location.pathname])

  const [modal, setModal] = useState(false)
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

  const toggleCollapse = id => () => setCollapseID(collapseID !== id ? id : '');

  const closeCollapse = collID => p => () => {
    window.scrollTo(0, 0);
    collapseID === collID && setCollapseID('');
    setPage(p)
  };

  const overlay = (
    <div
      id='sidenav-overlay'
      style={{backgroundColor: 'transparent'}}
      onClick={toggleCollapse('mainNavbarCollapse')}
    />
  );

  return (
    <Fragment>

      <div>
        <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
          <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold"
                          toggle={() => setModal(!modal)}>Заявка на поступление</MDBModalHeader>
          <MDBModalBody>
            {pending ?
              <div className='d-flex justify-content-center'>
                <div className="spinner-grow text-idab" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :
              sent ? <div className='my-5 d-flex flex-column justify-content-center text-center'>
                  <MDBIcon far icon="check-circle" size="4x" className='text-success mb-4'/>
                  <h3 className='mb-4'>Ваша заявка успешно отправлена</h3>
                  <h5>Наши сотрудники свяжутся с Вами в ближайшее время.</h5>
                </div>
                :
                <form className="mx-3 grey-text" onSubmit={(event) => event.preventDefault()}>
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
                  <MDBInput
                    getValue={(v) => setInfo(v)}
                    label="Дополнительная информация"
                    group
                    type="textarea"
                    rows="5"
                    value={info}
                  >

                  </MDBInput>
                </form>
            }
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            {sent ? null :
              <MDBBtn outline color="dark" disabled={pending} onClick={send_bid}>Отправить</MDBBtn>}
            <MDBBtn outline color="dark" onClick={() => setModal(!modal)}>Закрыть</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>

      <div className='up_page_banner idab pb-2 navbar-pre-text mx-0 f-top d-none d-lg-block'>
        <div className={`active-banner ${trigger ? 'hidden' : ''}`}>
          <UpPageBanner/>
        </div>
        <div className={`active-banner ${!trigger ? 'hidden' : ''}`}>
          <LowPageBanner/>
        </div>

      </div>
      <MDBNavbar
        id="navbar"
        color='white'
        light
        expand='lg'
        fixed='top'
        scrolling
        // scrollingNavbarOffset={distance + 50}
      >
        <MDBNavbarBrand href='/' className='py-0 font-weight-bold' onClick={() => setPath('/')}>
          <img src={logoGUU} alt="GUU" style={{height: '2.5rem', width: '2.5rem', marginRight: '10px'}}/>
          <img src={logoIDAB} alt="IDAB" style={{height: '2.5rem'}}/>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          onClick={toggleCollapse('mainNavbarCollapse')}
        />
        <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className={path === '/' ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/'
                onClick={closeCollapse('mainNavbarCollapse')('home')}
              >
                Главная
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={path.includes('about') ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/about'
                onClick={closeCollapse('mainNavbarCollapse')('about')}
              >
                О нас
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={path.includes('programmy') ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/index.php/programmy'
                onClick={closeCollapse('mainNavbarCollapse')('programmy')}
              >
                Программы
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={path.includes('events') ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/events'
                onClick={closeCollapse('mainNavbarCollapse')('events')}
              >
                События
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={path.includes('contacts') ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/contacts'
                onClick={closeCollapse('mainNavbarCollapse')('contacts')}
              >
                Контакты
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className={path.includes('user-page') ? 'active' : ''}>
              <MDBNavLink
                activeClassName='page-active'
                exact
                to='/login'
                onClick={closeCollapse('mainNavbarCollapse')('login')}
              >
                Личный кабинет
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBBtn outline color="idab" size="sm" onClick={() => setModal(!modal)}>Поступить</MDBBtn>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      {collapseID && overlay}
    </Fragment>
  )

}

const mapStateToProps = state => ({
  trigger: state.home.banner_trigger,
  status: state.bids.study_bid_status
});

export default connect(mapStateToProps, {section_height, navbar_height, education_bid})(HomeNavbar);
