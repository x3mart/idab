import React, {useEffect} from 'react';
import AlVideoSection from "../components/home/ALVideoSection";
import IdabNumbers from "../components/home/IdabNumbers";
import ProgramsHomePage from "../components/home/ProgramsHomePage";
import HomeEvents from "../components/home/HomeEvents";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeFAQ from "../components/home/HomeFAQ";
import FirstSection from "../components/home/FirstSection";
import BannerWrapper from "../components/home/BannerWrapper";
import {connect} from 'react-redux';
import {load_home_testimonials, load_home_faq} from '../redux/actions/home';
import {load_events} from '../redux/actions/events';

const Home = ({load_home_testimonials, load_home_faq, load_events}) => {

  useEffect(() => {
    load_home_testimonials();
    load_events();
    load_home_faq();
  }, [])

  return (
    <React.Fragment>
      <FirstSection/>
      <BannerWrapper/>
      <AlVideoSection/>
      <IdabNumbers/>
      <ProgramsHomePage/>
      <HomeEvents/>
      <HomeTestimonials/>
      <HomeFAQ/>
    </React.Fragment>
  );
}

export default connect(null, {load_home_testimonials, load_events, load_home_faq})(Home);