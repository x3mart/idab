import React, {Fragment, useEffect, useState} from 'react';
import {MDBCol, MDBIcon, MDBRow} from "mdbreact";

import {connect} from 'react-redux';
import {banner_change_trigger} from '../../redux/actions/home';
import LowPageBanner from "./LowPageBanner";

const BannerWrapper = ({banner_change_trigger}) => {

  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const banner = document.getElementById("banner");
    setDistance(banner.offsetTop)

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [distance])

  const handleScroll = () => {

    if (window.pageYOffset >= distance) {
      banner_change_trigger(true);
    } else {
      banner_change_trigger(false);
    }
  }

  return (
    <div id="banner" className='up_page_banner idab pb-2 navbar-pre-text mx-0 d-none d-lg-block'>
      <LowPageBanner/>
    </div>

    );

}

export default connect(null, {banner_change_trigger})(BannerWrapper);