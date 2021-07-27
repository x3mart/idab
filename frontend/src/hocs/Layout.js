import React, {useEffect} from 'react';
import Navbar from "../components/Navbar";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";

import {connect} from "react-redux";
import {load_contacts} from "../redux/actions/home"
import {load_pages} from "../redux/actions/pages"

const Layout = ({children, load_contacts, load_pages}) => {

  useEffect(() => {
    load_contacts()
    load_pages()
  }, [])

  return (
    <React.Fragment>
      <HomeNavbar />
      <main>
        {children}
      </main>
      <Footer/>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  contacts: state.home.contacts
})

export default connect(mapStateToProps, {load_contacts, load_pages})(Layout);