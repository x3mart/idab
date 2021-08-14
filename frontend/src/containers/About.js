import React from "react";
import {Route, Switch} from 'react-router-dom';
import AboutSection from "../components/about/AboutSection";
import MissionSection from "../components/about/MissionSection";
import RatingSection from "../components/about/RatingSection";
import HistorySection from "../components/about/HistorySection";
import TeamSection from "../components/about/TeamSection";
import GallerySection from "../components/about/GallerySection";
import AboutLayout from "../hocs/AboutLayout";

const About = () => {

  return (
    <AboutLayout>
        <Switch>
          <Route exact path='/about' component={AboutSection}/>
          <Route path='/about/mission' component={MissionSection}/>
          <Route path='/about/rating' component={RatingSection}/>
          <Route path='/about/history' component={HistorySection}/>
          <Route path='/about/team' component={TeamSection}/>
          <Route path='/about/gallery' component={GallerySection}/>
        </Switch>
      </AboutLayout>
  );
}

export default About;
