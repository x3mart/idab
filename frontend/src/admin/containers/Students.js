import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import StudentTableRow from '../../components/admin/StudentTableRow'
import {
  get_all_students,
  load_specialities,
  load_programs,
  load_groups,
  add_student,
  delete_student,
  update_student,
  sort_students,
} from '../../redux/actions/admin/students'

import {
  load_basic_groups_list,
  load_groups_list,
} from '../../redux/actions/admin/groups'

import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject, proper_date } from '../../functions'
import { MDBSpinner } from 'mdbreact'
import AddStudent from './components/AddStudent'

const Students = ({
  load_user,
  isAuthenticated,
  user,
  get_all_students,
  students_list,
  sorted_list,
  specialities,
  load_specialities,
  load_programs,
  programs,
  load_groups,
  groups,
  add_student,
  delete_student,
  update_student,
  sort_students,
  load_basic_groups_list,
  load_groups_list,
  basic_groups_list,
  groups_list,
}) => {


  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [specialitiesList, setSpecialitiesList] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [studentsData, setStudentsData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [studentsList, setStudentsList] = useState([])
  const [selectedSpeciality, setSelectedSpeciality] = useState('')
  const [groupsList, setGroupsList] = useState([])
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedGroupHeader, setSelectedGroupHeader] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [studentMail, setStudentMail] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [updateActive, setUpdateActive] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null)
  const [sortValue, setSortValue] = useState(null)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setStudentsData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(sorted_list) && sorted_list.length > 0) {
        setStudentsList(sorted_list)
        setStudentsData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [sorted_list, studentsList])

  useEffect(() => {
    get_all_students()
    load_specialities()
    load_basic_groups_list()
    load_groups_list()
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  useEffect(() => {
    setSpecialitiesList(specialities)
  }, [specialities])

  useEffect(() => {
    setProgramsList(programs)
  }, [programs])

  useEffect(() => {
    setGroupsList(groups)
  }, [groups])

  useEffect(() => {
    if (selectedSpeciality) {
      load_programs(selectedSpeciality)
    }
  }, [selectedSpeciality])

  useEffect(() => {
    if (selectedProgram) {
      load_groups(selectedProgram)
    }
  }, [selectedProgram])

  const handleSpecialitiesSelect = e => {
    setSelectedSpeciality(e.target.value)
  }

  const handleProgramsSelect = e => {
    setSelectedProgram(e.target.value)
    sort_students(e.target.value)
  }

  const handleGroupSelect = e => {
    setSelectedGroup(e.target.value)
  }

  const handleGroupSelectHeader = e => {
    setSelectedGroupHeader(e.target.value)
    // sort_students(e.target.value)
  }

  const handleGroupResetHeader = () => {
    setSelectedSpeciality('')
    setSelectedProgram('')
    setSelectedGroupHeader(null)
    sort_students(null)
  }

  const updateRow = id => {
    const student = studentsList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setStudentName(student.name)
    setStudentMail(student.email)
    setStudentPhone(student.phone)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const student = {
      id: updateId,
      name: studentName,
      email: studentMail,
      phone: studentPhone,
      training_group: selectedGroup,
    }
    setUpdateActive(false)
    update_student(student)
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
    delete_student(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const handleReload = () => {
    setStudentsData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const studentAdd = e => {
    e.preventDefault()
    let student = {
      name: studentName,
      email: studentMail,
      phone: studentPhone,
      training_group: selectedGroup,
    }
    add_student(student)
    setAddActive(false)
    setSelectedSpeciality('')
    setSelectedProgram('')
    setSelectedGroup(null)
    setStudentName('')
    setStudentMail('')
    setStudentPhone('')
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setSelectedSpeciality('')
    setSelectedProgram('')
    setSelectedGroup(null)
    setStudentName('')
    setStudentMail('')
    setStudentPhone('')
  }

  const handleReset = () => {
    setSelectedSpeciality('')
    setSelectedProgram('')
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
              <h4 className='modal-title'>Удаление слушателей</h4>
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
                <h4 className='modal-title'>Обновить слушателя</h4>
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
                      aria-label='Выберите программу'
                      onChange={event => handleSpecialitiesSelect(event)}
                    >
                      <option selected>Выберите программу</option>

                      {specialitiesList &&
                        specialitiesList.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {selectedSpeciality.length > 0 && (
                    <div className='form-group'>
                      <select
                        className='form-select'
                        aria-label='Выберите программу'
                        onChange={event => handleProgramsSelect(event)}
                      >
                        <option selected>Выберите группу</option>
                        {basic_groups_list &&
                          basic_groups_list
                            .filter(item => item.category == selectedSpeciality)
                            .map(item => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                      </select>
                    </div>
                  )}

                  {selectedProgram.length > 0 && (
                    <div className='form-group'>
                      <select
                        className='form-select'
                        aria-label='Выберите группу'
                        onChange={event => handleGroupSelect(event)}
                      >
                        <option selected>Выберите поток</option>
                        {groups_list &&
                          groups_list
                            .filter(item => item.basic == selectedProgram)
                            .map(item => (
                              <option key={item.id} value={item.id}>
                                {`${proper_date(item.start_date)}-${proper_date(
                                  item.graduation_date
                                )}`}
                              </option>
                            ))}
                      </select>
                    </div>
                  )}
                  <div className='form-group'>
                    <label>Фамилия Имя Отчество</label>
                    <input
                      type='text'
                      className='form-control'
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input
                      type='phone'
                      className='form-control'
                      value={studentPhone}
                      onChange={e => setStudentPhone(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      value={studentMail}
                      onChange={e => setStudentMail(e.target.value)}
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

      {studentsData.pending && (
        <div className='w-100 h-50 d-flex justify-content-center align-items-center'>
          <MDBSpinner big />
        </div>
      )}

      {studentsData.error && (
        <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center'>
          <h2>Что-то пошло не так...</h2>
          <h4>Попробуйте обновить страницу</h4>
          <button
            className='btn btn-outline-blue-grey'
            type='button'
            onClick={() => handleReload()}
          >
            Обновить
          </button>
        </div>
      )}

      {studentsData.loaded && (
        <div className='main-body__users'>
          <div className='cards'>
            <div className='cards__header table-title'>
              {user && user.is_teacher ? (
                <div className='cards__header-title admin-text-light'>
                  Слушатели
                </div>
              ) : (
                <div className='cards__header-title admin-text-light'>
                  Управление <strong>слушателями</strong>
                </div>
              )}
              {user && user.is_teacher ? (
                <div></div>
              ) : (
                <div>
                  <AddStudent />
                </div>
              )}
            </div>

            <div className='custom-modal-form student-table-header'>
              <div className='column first'>
                <div className='form-group'>
                  <select
                    className='form-select'
                    aria-label='Выберите программу'
                    onChange={event => handleSpecialitiesSelect(event)}
                  >
                    <option selected>Выберите программу</option>

                    {specialitiesList &&
                      specialitiesList.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {selectedSpeciality.length > 0 && (
                <div className='column first'>
                  <div className='form-group'>
                    <select
                      className='form-select'
                      aria-label='Выберите группу'
                      // onChange={event => handleGroupSelectHeader(event)}
                      onChange={event => handleProgramsSelect(event)}
                    >
                      <option selected>Выберите группу</option>
                      {basic_groups_list &&
                        basic_groups_list
                          .filter(item => item.category == selectedSpeciality)
                          .map(item => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              )}
              {selectedProgram.length > 0 && (
                <div className='column first'>
                  <button
                    className='btn btn-outline-danger header-reset'
                    type='button'
                    onClick={() => handleReload()}
                  >
                    Сбросить
                  </button>
                </div>
              )}
            </div>

            {user && user.is_teacher && selectedProgram.length > 0 && (
              <div className='cards'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Фото</th>
                      <th>Группа</th>
                      <th>Имя</th>
                      <th>Почта</th>
                      <th>Телефон</th>
                      {user && !user.is_teacher && <th>Действия</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {studentsList.length > 0 &&
                      studentsList.map(item => (
                        <StudentTableRow
                          key={item.id}
                          user={user}
                          student={item}
                          update_modal={id => updateRow(id)}
                          delete_modal={id => deleteRow(id)}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            {user && !user.is_teacher && (
              <div className='cards'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Фото</th>
                      <th>Группа</th>
                      <th>Имя</th>
                      <th>Почта</th>
                      <th>Телефон</th>
                      {user && !user.is_teacher && <th>Действия</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {studentsList.length > 0 &&
                      studentsList.map(item => (
                        <StudentTableRow
                          key={item.id}
                          user={user}
                          student={item}
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
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  sorted_list: state.students.sorted_list,
  specialities: state.students.specialities,
  programs: state.students.programs,
  groups: state.students.groups,
  basic_groups_list: state.groups.basic_groups,
  groups_list: state.groups.groups,
})

export default connect(mapStateToProps, {
  get_all_students,
  load_specialities,
  load_programs,
  load_groups,
  add_student,
  delete_student,
  update_student,
  sort_students,
  load_user,
  load_basic_groups_list,
  load_groups_list,
})(Students)
