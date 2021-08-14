import React, {Fragment, Component} from "react";
import {
  MDBBtn, MDBCol,
  MDBCollapse, MDBContainer, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBNav,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink, MDBRow, MDBTabContent, MDBTabPane
} from "mdbreact";

import logoGUU from "../assets/logo-guu.png";
import logoIDAB from "../assets/logo-big.svg";
import UpPageBanner from "./home/UpPageBanner";
import LowPageBanner from "./home/LowPageBanner";

class Navbar extends Component {

  state = {
    collapseID: '',
    modal1: false,
    modal2: false,
    activeItem: '1',
    height: 0,
  };

  componentDidMount() {
    const height = document.getElementById('navbar').clientHeight;
    this.setState({ height });
  }

  handleChange = (value) => {
    this.setState({nav: value});
  }

  toggleModal = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  toggleTab = nr => () => {
    this.setState({
      activeItem: nr
    });
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => page => () => {
    const {collapseID} = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({collapseID: ''});
    this.setState({page: page})
  };

  render() {

    const overlay = (
      <div
        id='sidenav-overlay'
        style={{backgroundColor: 'transparent'}}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const {collapseID} = this.state;
    return (
      <Fragment>
        <MDBRow className='up_page_banner idab navbar-pre-text mx-0'>
          <UpPageBanner/>
        </MDBRow>
        <MDBNavbar
          id="navbar"
          color='white'
          light
          expand='lg'
          fixed='top'
          scrolling
        >
          <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
            <img src={logoGUU} alt="GUU" style={{height: '2.5rem', width: '2.5rem', marginRight: '10px'}}/>
            <img src={logoIDAB} alt="IDAB" style={{height: '2.5rem'}}/>
            {/*<LogoGUU style={{height: '2.5rem', width: '2.5rem'}}/>*/}
            {/*<LogoIDAB style={{height: '2.5rem'}}/>*/}
          </MDBNavbarBrand>
          <MDBNavbarToggler
            onClick={this.toggleCollapse('mainNavbarCollapse')}
          />
          <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/about'
                  onClick={this.closeCollapse('mainNavbarCollapse')('about')}
                >
                  О нас
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/programmy'
                  onClick={this.closeCollapse('mainNavbarCollapse')('programs')}
                >
                  Программы
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/events'
                  onClick={this.closeCollapse('mainNavbarCollapse')('events')}
                >
                  События
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/for-companies'
                  onClick={this.closeCollapse('mainNavbarCollapse')('for-companies')}
                >
                  Для компаний
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/alumni'
                  onClick={this.closeCollapse('mainNavbarCollapse')('alumni')}
                >
                  Выпускникам
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/consulting'
                  onClick={this.closeCollapse('mainNavbarCollapse')('consulting')}
                >
                  Получить консультацию
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/contacts'
                  onClick={this.closeCollapse('mainNavbarCollapse')('contacts')}
                >
                  Контакты
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  activeClassName='page-active'
                  exact
                  to='/login'
                  onClick={this.closeCollapse('mainNavbarCollapse')('user-page')}
                >
                  Личный кабинет
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn outline color="idab" size="sm">Поступить</MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
            <div className="idab d-lg-none" style={{margin: '1rem -1rem -0.8rem -1rem', color: '#ffffff'}}>
              <MDBRow>
                <MDBCol lg="4" className="d-flex justify-content-center mt-2 mt-lg-0">
                  <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">Старт: </span> 22 мая 2021</p>
                </MDBCol>
                <MDBCol lg="4" className="d-none d-lg-flex justify-content-end">
                  <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">Продолжительность: </span> 2
                    года
                  </p>
                </MDBCol>
                <MDBCol lg="4" className="d-flex justify-content-center  mt-2 mt-lg-0 mb-2 mb-lg-0">
                  <p className="pre-text-light mb-0"><MDBIcon icon="angle-double-down" className="mr-2"
                                                              style={{fontSize: '1rem'}}/><span
                    className="pre-text-bold mr-2">Выбрать программу</span></p>
                </MDBCol>
              </MDBRow>
            </div>
          </MDBCollapse>

        </MDBNavbar>
        <MDBRow className='up_page_banner idab navbar-pre-text mx-0 p-2 d-none d-lg-flex' style={{marginTop: this.state.height + 'px'}}>
          <MDBCol md="4">
            <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">Старт: </span> 22 мая 2021</p>
          </MDBCol>
          <MDBCol md="4" className="d-flex justify-content-center">
            <p className="pre-text-light mb-0"><span className="pre-text-bold mr-2">Продолжительность: </span> 2
              года
            </p>
          </MDBCol>
          <MDBCol md="4" className="d-flex justify-content-end">
            <p className="pre-text-light mb-0"><MDBIcon icon="angle-double-down" className="mr-2"
                                                        style={{fontSize: '1rem'}}/><span
              className="pre-text-bold mr-2">Выбрать программу</span></p>
          </MDBCol>
        </MDBRow>
        {collapseID && overlay}

      </Fragment>
    )
  }

}

export default Navbar;