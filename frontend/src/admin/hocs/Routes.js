    import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DV1 from '../components/dashboard/v1';


const fourOFour = () => <h1 className="text-center">404</h1>

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/admin' exact component={DV1} />
        <Route component={fourOFour} />
      </Switch>
    );
  }
}

export default Routes;