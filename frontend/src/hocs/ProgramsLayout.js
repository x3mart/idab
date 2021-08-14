import React, {useEffect, useState} from 'react';
import {
  MDBCard,
  MDBCol,
  MDBContainer, MDBDropdownItem, MDBIcon,
  MDBNav,
  MDBNavItem,
  MDBNavLink, MDBRow,
  MDBSideNav,
  MDBSideNavCat, MDBSideNavCatV5,
  MDBSideNavLink, MDBSideNavLinkV5,
  MDBSideNavNav, MDBSideNavNavV5, MDBSideNavV5
} from "mdbreact";
import {useRouteMatch} from "react-router-dom";
import {isNotEmptyObject, proper_phone} from "../functions"

import {connect} from "react-redux";

const ProgramsLayout = ({children}) => {

  return (
    <React.Fragment>


      <div className='d-flex'>
        <div id='main' className='' style={{paddingTop:148}}>
          {children}
        </div>
      </div>

    </React.Fragment>
  );
}

const mapStateToProps = state => (
  {
    contacts: state.home.contacts,
  }
)

export default connect(mapStateToProps)(ProgramsLayout);
