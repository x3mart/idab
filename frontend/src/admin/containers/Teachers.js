import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import TeacherTableRow from '../../components/admin/TeacherTableRow'
import {
  get_all_teachers,
  add_id,
  remove_id,
} from '../../redux/actions/admin/teachers'

const Teachers = ({
  isAuthenticated,
  user,
  add_id,
  remove_id,
  get_all_teachers,
  teachers_list,
  teachers_ids_list,
  teachers_actions_list,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }
  
  const [specialitiesList, setSpecialitiesList] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [teachersData, setTeachersData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [teachers, setTeachers] = useState([])

  const [groupsList, setGroupsList] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [studentMail, setStudentMail] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setTeachersData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(teachers_list) && teachers_list.length > 0) {
        setTeachers(teachers_list)
        setTeachersData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [teachers_list, teachers])

  useEffect(() => {
    get_all_teachers()
  }, [])


  const updateRow = id => {}

  const deleteRow = id => {}

  const [selectedAll, setSelectedAll] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [selectedSpeciality, setSelectedSpeciality] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('')

  return (
    <Fragment>
      <div
        className={`modal fade ${deleteActive ? 'show' : ''}`}
        style={{ display: deleteActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Удаление преподавателей</h4>
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
                onClick={() => setDeleteActive(false)}
              >
                Отменить
              </button>
              <button
                className='btn btn-danger'
                onClick={() => handleBunchDelete()}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${addActive ? 'show' : ''}`}
        style={{ display: addActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить преподавателя</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
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
                      aria-label='Выберите специализацию'
                      onChange={event => handleSpecialitiesSelect(event)}
                    >
                      <option selected>Выберите специализацию</option>

                      {specialitiesList &&
                        specialitiesList.map(item => (
                          <option key={item.id} value={item.slug}>
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
                        <option selected>Выберите программу</option>
                        {programsList &&
                          programsList.map(item => (
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
                      >
                        <option selected>Выберите группу</option>
                        {programsList &&
                          programsList.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div className='form-group'>
                    <label>Фамилия Имя Отчество</label>
                    <input type='text' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <label>Пароль</label>
                    <input type='password' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input type='text' className='form-control' required />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  data-dismiss='modal'
                  value='Отменить'
                  onClick={() => setAddActive(false)}
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
            <div className='cards__header-title admin-text-light'>
              Управление <strong>преподавателями</strong>
            </div>
            <div>
              <button
                className='btn btn-success'
                onClick={() => setAddActive(true)}
              >
                <i className='material-icons'>&#xE147;</i>{' '}
                <span>Добавить преподавателя</span>
              </button>
              <button
                className='btn btn-danger'
                onClick={() => setDeleteActive(true)}
              >
                <i className='material-icons'>&#xE15C;</i> <span>Удалить</span>
              </button>
            </div>
          </div>
          <div className='cards'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th>
                    <span className='custom-checkbox'>
                      <input
                        type='checkbox'
                        id='selectAll'
                        checked={checked}
                        onClick={() =>
                          checked
                            ? remove_id(teachersIdsList)
                            : add_id(teachersIdsList)
                        }
                      />
                      <label htmlFor='selectAll' />
                    </span>
                  </th>
                  <th>Фото</th>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Телефон</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(item => (
                  <TeacherTableRow
                    teacher={item}
                    key={item.id}
                    update_modal={updateRow}
                    delete_modal={deleteRow}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  ids: state.tableReducer.payload,
  teachers_list: state.teachers.teachers_list,
  teachers_ids_list: state.teachers.teachers_ids_list,
  teachers_actions_list: state.teachers.teachers_actions_list,
})

export default connect(mapStateToProps, {
  add_id,
  remove_id,
  get_all_teachers,
})(Teachers)
