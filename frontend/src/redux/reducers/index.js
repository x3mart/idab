import {combineReducers} from 'redux';
import home from "./home";
import about from "./about";
import programs from "./programs";
import bids from "./bids";
import events from "./events";
import pages from "./pages";
import program from "./program";
import auth from "./auth/auth";
import tableReducer from "./admin/tables";
import students from "./admin/students";
import teachers from "./admin/teachers";
import adminPrograms from './admin/adminPrograms'
import groups from './admin/groups'
import schedule from './admin/schedule'
import library from './admin/library'
import study_materials from './admin/study_materials'
import tasks from './admin/tasks'

export default combineReducers({
  home,
  about,
  programs,
  bids,
  events,
  pages,
  program,
  auth,
  tableReducer,
  students,
  teachers,
  adminPrograms,
  groups,
  schedule,
  library,
  study_materials,
  tasks,
})
