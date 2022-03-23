import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import './Students.css'
import {Redirect} from 'react-router-dom'

import {load_user} from '../../redux/actions/auth/auth'
import {
  load_tasks,
  add_task,
  update_task,
  delete_task,
  load_solutions,
  add_solution,
  update_solution,
  delete_solution,
} from '../../redux/actions/admin/tasks'

import TasksTableRow from "../../components/admin/TasksTableRow";
import {load_groups_list} from "../../redux/actions/admin/groups";
import AddTask from "./components/AddTask";
import SelectGroup from "./components/SelectGroup";

const Tasks = ({isAuthenticated, load_user, user, load_tasks, tasks, load_groups_list, groups_list}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login'/>
  }

  useEffect(() => {
    load_user()
    load_tasks()
    load_groups_list()
  }, [])

  const handleGroupsSelect = data => {
    if(data === 'Выберите группу') {
      load_tasks()
    } else {
      load_tasks(data)
    }
  }

  const handleTeachersSelect = data => {
    if(data === 'Выберите группу') {
      load_tasks()
    } else {
      load_tasks(data)
    }
  }

  const addAction = () => {
    console.log('addAction')
  }


  return (
    <>
      <div className="main-body__users">
        <div className="cards">
          <div className="cards__header table-title">
            {user && user.is_student ? (
              <div className='cards__header-title admin-text-light'>
                Задания
              </div>
            ) : (
              <div className='cards__header-title admin-text-light'>
                Управление <strong>заданиями</strong>
              </div>
            )}
            {user && user.is_student ? (
              ''
            ) : (
              <div>
                <AddTask user={user} action={addAction}/>
              </div>
            )}
          </div>
          <div className='cards'>
            <table className='table table-striped table-hover'>
              <thead>
              <tr>
                {user && !user.is_student && <th><SelectGroup action={handleGroupsSelect}/></th>}
                {user && user.is_student && <th>Преподаватель</th>}
                <th>Название</th>
                {user && user.is_student && <th>Оценка</th>}
                <th>Действия</th>
              </tr>
              </thead>
              <tbody>
              {tasks && tasks.length > 0 &&
                tasks.map(item => (
                  <TasksTableRow
                    key={item && item.id}
                    task={item && item}
                    // update_modal={updateRow}
                    // delete_modal={deleteRow}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  tasks: state.tasks.tasks,
  solutions: state.tasks.solutions,
  groups_list: state.groups.groups,
  sorted_list: state.students.sorted_list,
  students_list: state.students.students_list,
})

export default connect(mapStateToProps, {
  load_user,
  load_tasks,
  load_groups_list,
})(Tasks)
