import React from "react";
import {Route, Switch} from 'react-router-dom';

import ProgramsSection from "../components/programs/ProgramsSection";
import ProgramsLayout from "../hocs/ProgramsLayout";
import CategorySection from "../components/programs/CategorySection";
import ProgramSection from "../components/programs/ProgramSection";

const Programs = () => {

  return (
    <ProgramsLayout>
        <Switch>
          <Route exact path='/index.php/programmy/:category_slug/:program_slug' component={ProgramSection}/>
          <Route exact path='/index.php/programmy/:category_slug' component={CategorySection}/>
          <Route exact path='/index.php/programmy' component={ProgramsSection}/>
        </Switch>
      </ProgramsLayout>
  );
}

export default Programs;
