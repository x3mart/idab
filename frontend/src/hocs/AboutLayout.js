import React, {useEffect} from 'react';
import {MDBContainer, MDBNav, MDBNavItem, MDBNavLink} from "mdbreact";
import {useRouteMatch} from "react-router-dom";

import {connect} from "react-redux";
import {load_about_leader, load_about_management, load_about_teachers, load_about_gallery} from "../redux/actions/about"
import {load_pages} from "../redux/actions/pages"

const AboutLayout = ({children, load_about_leader, load_about_management, load_about_teachers, load_about_gallery, load_pages}) => {

  useEffect(() => {
    load_about_leader();
    load_about_management();
    load_about_teachers();
    load_about_gallery();
  }, [])

  useEffect(() => {
    const about = document.getElementById('about')

    if (window.location.pathname === '/about') {
      about.classList.add("active")
    } else if (window.location.pathname !== '/about') {
      about.classList.remove("active")
    }

  })

  let {url} = useRouteMatch();

  return (
    <React.Fragment>

      <MDBContainer>
        <MDBNav
          className="nav-fill flex-column flex-sm-row py-3"
          style={{marginTop: '100px'}}
          pills
          color="idab"
        >
          <MDBNavItem>
            <MDBNavLink
              id='about'
              to={`${url}`}
            >
              О нас
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to='/about/mission'
            >
              Миссия
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to={`${url}/rating`}
            >
              Рейтинги
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to={`${url}/history`}
            >
              История
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to={`${url}/team`}
            >
              Команда
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              to={`${url}/gallery`}
            >
              Галерея
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
      </MDBContainer>

      {children}

    </React.Fragment>
  );
}

export default connect(null, {load_about_leader, load_about_management, load_about_teachers, load_about_gallery, load_pages})(AboutLayout);
