import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {load_events} from '../redux/actions/events';
import {Route, Switch} from "react-router-dom";
import EventsLayout from "../hocs/EventsLayout";
import EventsSection from "../components/events/EventsSection";
import EventSection from "../components/events/EventSection";

const Events = ({load_events}) => {

  useEffect(() => {
    load_events();
  })

  return (
    <div>
      <EventsLayout>
      <Switch>
        <Route exact path='/events' component={EventsSection}/>
        <Route exact path='/events/:id' component={EventSection}/>
      </Switch>
    </EventsLayout>
    </div>
  );
}

export default connect(null, {load_events})(Events);