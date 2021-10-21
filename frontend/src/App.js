import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'



import './index.css'
import Layout from './hocs/Layout'
import Home from './containers/Home'
import About from './containers/About'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Programs from './containers/Programs'
import Events from './containers/Events'
import Contacts from './containers/Contacts'
import Login from './containers/Login'
import AdminLayout from './admin/hocs/AdminLayout'
import Dashboard from './admin/containers/Dashboard'
import Students from './admin/containers/Students'
import Profile from './admin/containers/Profile'
import Teachers from './admin/containers/Teachers'
import AdminPrograms from './admin/containers/AdminPrograms'
import Groups from './admin/containers/Groups'
import Subjects from './admin/containers/Subjects'
// import Materials from './admin/containers/Materials'
import Schedule from './admin/containers/Schedule'
import Admittance from './admin/containers/Admittance'
import Milestones from './admin/containers/Milestones'
import Library from './admin/containers/Library'
import Tasks from './admin/containers/Tasks'
import StudyMaterials from './admin/containers/StudyMaterials'
import PassReset from './containers/PassReset'
// import Test from './admin/containers/Test'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            exact
            path='/password/reset/confirm/:uid/:token'
            component={ResetPasswordConfirm}
          />
          <Route
            path={[
              '/dashboard/main',
              '/dashboard/study/students',
              '/dashboard/study/teachers',
              '/dashboard/study/programs',
              '/dashboard/study/groups',
              '/dashboard/study/subjects',
              '/dashboard/study/materials',
              '/dashboard/study/schedule',
              '/dashboard/study/admittance',
              '/dashboard/study/milestones',
              '/dashboard/study/library',
              '/dashboard/study/Tasks',
              '/dashboard/my-page',
            ]}
          >
            <AdminLayout>
              <Switch>
                <Route path='/dashboard/my-page' component={Profile} />
                <Route path='/dashboard/study/students' component={Students} />
                <Route path='/dashboard/study/teachers' component={Teachers} />
                <Route
                  path='/dashboard/study/programs'
                  component={AdminPrograms}
                />
                <Route path='/dashboard/study/groups' component={Groups} />
                <Route path='/dashboard/study/subjects' component={Subjects} />
                <Route
                  path='/dashboard/study/materials'
                  component={StudyMaterials}
                />
                <Route path='/dashboard/study/schedule' component={Schedule} />
                <Route
                  path='/dashboard/study/admittance'
                  component={Admittance}
                />
                <Route
                  path='/dashboard/study/milestones'
                  component={Milestones}
                />
                <Route path='/dashboard/study/library' component={Library} />
                <Route path='/dashboard/study/tasks' component={Tasks} />
                <Route path='/dashboard/main' component={Dashboard} />
                {/* <Route path='/dashboard/main' component={Test} /> */}
              </Switch>
            </AdminLayout>
          </Route>
          <Route
            path={[
              '/about',
              '/index.php/programmy',
              '/events',
              '/contacts',
              '/login',
              '/reset',
              '/',
            ]}
          >
            <Layout>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/index.php/programmy' component={Programs} />
                <Route path='/events' component={Events} />
                <Route path='/contacts' component={Contacts} />
                <Route path='/login' component={Login} />
                <Route path='/reset' component={PassReset} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
