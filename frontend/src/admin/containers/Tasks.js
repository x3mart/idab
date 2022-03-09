import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import TasksTableRow from '../../components/admin/TasksTableRow'
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

import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject, proper_date } from '../../functions'
import { MDBSpinner } from 'mdbreact'
import AddTask from './components/AddTask'
import { load_groups_list } from '../../redux/actions/admin/groups'
import {
  get_all_students,
  sort_students,
} from '../../redux/actions/admin/students'

const StudyMaterials = ({
  load_user,
  isAuthenticated,
  user,
  groups_list,
  load_groups_list,
  load_tasks,
  add_task,
  update_task,
  delete_task,
  load_solutions,
  add_solution,
  update_solution,
  delete_solution,
  tasks,
  solutions,
  get_all_students,
  sorted_list,
  students_list,
  sort_students,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [tasksData, setTasksData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [tasksList, setTasksList] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskFile, setTaskFile] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [updateActive, setUpdateActive] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState([])
  const [studyGroups, setStudyGroups] = useState([])
  const [studentsList, setStudentsList] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')

  console.log(selectedGroup)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setTasksData({ loaded: false, pending: false, error: true }),
        5000
      )
      if (Array.isArray(tasks) && tasks.length > 0) {
        setTasksList(tasks)
        setTasksData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [tasks, tasksList])

  useEffect(() => {
    load_tasks()
    load_groups_list()
    get_all_students()
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  useEffect(() => {
    setTasksList(tasks)
  }, [tasks])

  const handleStudentsSelect = e => {
    let arr = Array.from(e.target.selectedOptions, option => option.value)
    setSelectedStudent(arr)
  }
  const handleGroupsSelect = e => {
    console.log(e.target)
    sort_students(e.target.name)
    setSelectedGroup(e.target.value)
  }

  console.log(selectedStudent)

  const handleAdd = e => {
    e.preventDefault()
    const task = {
      teacher: user.id,
      training_group: selectedGroup,
      students: selectedStudent.join(' '),
      name: taskName,
      description: taskDescription,
      file: taskFile,
    }
    setAddActive(false)
    add_task(task)
    setTaskName('')
    setTaskDescription('')
    setSelectedStudent([])
  }

  const updateRow = id => {
    const task = tasksList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setTaskName(task.name)
    setTaskDescription(task.description)
    setStudyGroups(task.training_groups)
    // setTaskFile(task.url)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const task = {
      id: updateId,
      students: selectedStudent.join(' '),
      name: taskName,
      description: taskDescription,
      file: taskFile,
    }
    setUpdateActive(false)
    update_task(task)
    setUpdateId(null)
  }

  const handleCancelUpdate = () => {
    setUpdateActive(false)
    setUpdateId(null)
  }

  const deleteRow = id => {
    setDeleteId(id)
    setDeleteActive(true)
  }

  const handleDelete = () => {
    setDeleteActive(false)
    delete_task(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const handleReload = () => {
    setStudyMaterialsData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setTaskName('')
    setTaskDescription('')
    setTaskFile('')
  }

  return (
    <Fragment>
      <div
        className={`modal fade ${deleteActive ? 'show' : ''}`}
        style={{ display: deleteActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Удаление задания</h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={() => setDeleteActive(false)}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <p>Вы уверены, что хотите удалить эти записи?</p>
              <p className='text-warning'>
                <small>Это действие нельзя отменить!</small>
              </p>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-default'
                onClick={() => handleCancelDelete()}
              >
                Отменить
              </button>
              <button className='btn btn-danger' onClick={() => handleDelete()}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${updateActive ? 'show' : ''}`}
        style={{ display: updateActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleUpdate(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Обновить задание</h4>
                <button
                  type='button'
                  className='close'
                  onClick={() => setUpdateActive(false)}
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='custom-modal-form'>
                  <div className='form-group'>
                    <select
                      className='form-select'
                      aria-label='Выберите группу'
                      onChange={handleGroupsSelect}
                    >
                      <option selected>Выберите группу</option>
                      {groups_list &&
                        groups_list.map(item => (
                          <option
                            key={item.id}
                            name={item.name}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <select
                      multiple
                      className='form-select multiselect'
                      aria-label='Выберите слушателей'
                      onChange={handleStudentsSelect}
                    >
                      <option selected>Выберите слушателей</option>
                      {sorted_list &&
                        sorted_list.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Название</label>
                    <input
                      type='text'
                      className='form-control'
                      value={taskName}
                      onChange={e => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Описание</label>
                    <input
                      type='text'
                      className='form-control'
                      value={taskDescription}
                      onChange={e => setTaskDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Файл</label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={e => setTaskFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={() => handleCancelUpdate()}
                />
                <input
                  type='submit'
                  className='btn btn-info'
                  value='Сохранить'
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${addActive ? 'show' : ''}`}
        style={{ display: addActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleAdd(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить задание</h4>
                <button
                  type='button'
                  className='close'
                  onClick={() => setAddActive(false)}
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='custom-modal-form'>
                  <div className='form-group'>
                    <select
                      className='form-select'
                      aria-label='Выберите группу'
                      onChange={handleGroupsSelect}
                    >
                      <option selected>Выберите группу</option>
                      {groups_list &&
                        groups_list.map(item => (
                          <option
                            key={item.id}
                            name={item.name}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <select
                      multiple
                      className='form-select multiselect'
                      aria-label='Выберите слушателей'
                      onChange={handleStudentsSelect}
                    >
                      <option selected>Выберите слушателей</option>
                      {sorted_list &&
                        sorted_list.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Название</label>
                    <input
                      type='text'
                      className='form-control'
                      value={taskName}
                      onChange={e => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Описание</label>
                    <input
                      type='text'
                      className='form-control'
                      value={taskDescription}
                      onChange={e => setTaskDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Файл</label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={e => setTaskFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={() => handleCancelAdd()}
                />
                <input
                  type='submit'
                  className='btn btn-info'
                  value='Сохранить'
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='main-body__users'>
        <div className='cards'>
          <div className='cards__header table-title'>
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
                <button
                  className='btn btn-success'
                  onClick={() => setAddActive(true)}
                >
                  <i className='material-icons'>&#xE147;</i>{' '}
                  <span>Добавить задание</span>
                </button>
              </div>
            )}
          </div>

          {tasksData.pending && (
            <div className='w-100 h-50 d-flex justify-content-center align-items-center py-5'>
              <MDBSpinner big />
            </div>
          )}

          {tasksData.error && (
            <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center py-5'>
              <h2>Что-то пошло не так...</h2>
              <h4>Попробуйте обновить страницу, или добавить задание</h4>
              <button
                className='btn btn-outline-blue-grey'
                type='button'
                onClick={() => handleReload()}
              >
                Обновить
              </button>
            </div>
          )}

          {tasksData.loaded && (
            <div className='cards'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    {user && !user.is_student && <th>Группа</th>}
                    <th>Название</th>
                    {user && !user.is_student && <th>Действия</th>}
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 &&
                    tasks.map(item => (
                      <TasksTableRow
                        key={item.id}
                        material={item}
                        update_modal={id => updateRow(id)}
                        delete_modal={id => deleteRow(id)}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Fragment>
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
  load_groups_list,
  load_tasks,
  add_task,
  update_task,
  delete_task,
  load_solutions,
  add_solution,
  update_solution,
  delete_solution,
  get_all_students,
  sort_students,
})(StudyMaterials)
