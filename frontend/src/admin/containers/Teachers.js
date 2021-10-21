import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Teachers.css'
import { Redirect } from 'react-router-dom'
import TeacherTableRow from '../../components/admin/TeacherTableRow'
import {
  get_all_teachers,
  add_teacher,
  delete_teacher,
  update_teacher,
} from '../../redux/actions/admin/teachers'
import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject } from '../../functions'
import { MDBSpinner } from 'mdbreact'

const Teachers = ({
  load_user,
  isAuthenticated,
  user,
  get_all_teachers,
  teachers_list,
  add_teacher,
  delete_teacher,
  update_teacher,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [teachersData, setTeachersData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [teachersList, setTeachersList] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [teacherImage, setTeacherImage] = useState(null)
  const [teacherAvatar, setTeacherAvatar] = useState('')
  const [teacherMail, setTeacherMail] = useState('')
  const [teacherPhone, setTeacherPhone] = useState('')
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [updateActive, setUpdateActive] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setTeachersData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(teachers_list) && teachers_list.length > 0) {
        setTeachersList(teachers_list)
        setTeachersData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [teachers_list, teachersList])

  useEffect(() => {
    get_all_teachers()
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  const updateRow = id => {
    const teacher = teachersList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setTeacherName(teacher.name)
    setTeacherMail(teacher.email)
    setTeacherPhone(teacher.phone)
    setTeacherAvatar(teacher.avatar)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const teacher = {
      id: updateId,
      name: teacherName,
      email: teacherMail,
      phone: teacherPhone,
      avatar: teacherImage,
    }
    setUpdateActive(false)
    update_teacher(teacher)
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
    delete_teacher(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const handleReload = () => {
    setTeachersData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const teacherAdd = e => {
    e.preventDefault()
    const teacher = {
      name: teacherName,
      email: teacherMail,
      phone: teacherPhone,
      avatar: teacherImage,
    }
    add_teacher(teacher)
    setAddActive(false)
    setTeacherName('')
    setTeacherMail('')
    setTeacherPhone('')
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setTeacherName('')
    setTeacherMail('')
    setTeacherPhone('')
    setTeacherImage(null)
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
              <p>Вы уверены, что хотите удалить эту запись?</p>
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
        className={`modal fade ${addActive ? 'show' : ''}`}
        style={{ display: addActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => teacherAdd(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить преподавателя</h4>
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
                    <label>Изображение</label>
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpeg'
                      onChange={e => setTeacherImage(e.target.files[0])}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label>Фамилия Имя Отчество</label>
                    <input
                      type='text'
                      className='form-control'
                      value={teacherName}
                      required
                      onChange={e => setTeacherName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input
                      type='phone'
                      className='form-control'
                      value={teacherPhone}
                      required
                      onChange={e => setTeacherPhone(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      value={teacherMail}
                      required
                      onChange={e => setTeacherMail(e.target.value)}
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

      <div
        className={`modal fade ${updateActive ? 'show' : ''}`}
        style={{ display: updateActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleUpdate(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Обновить преподавателя</h4>
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
                    <label>Изображение</label>
                    <p>
                      <img src={teacherAvatar} alt='' width='50' /> Текущее
                      изображение
                    </p>
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpeg'
                      onChange={e => setTeacherImage(e.target.files[0])}
                      className='form-control'
                    />
                  </div>

                  <div className='form-group'>
                    <label>Фамилия Имя Отчество</label>
                    <input
                      type='text'
                      className='form-control'
                      value={teacherName}
                      onChange={e => setTeacherName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input
                      type='phone'
                      className='form-control'
                      value={teacherPhone}
                      onChange={e => setTeacherPhone(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      value={teacherMail}
                      onChange={e => setTeacherMail(e.target.value)}
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

      {teachersData.pending && (
        <div className='w-100 h-50 d-flex justify-content-center align-items-center'>
          <MDBSpinner big />
        </div>
      )}

      {teachersData.error && (
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

      {teachersData.loaded && (
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
              </div>
            </div>

            <div className='cards'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th>Фото</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersList.length > 1 &&
                    teachersList.map(item => (
                      <TeacherTableRow
                        key={item.id}
                        teacher={item}
                        update_modal={id => updateRow(id)}
                        delete_modal={id => deleteRow(id)}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  teachers_list: state.teachers.teachers_list,
})

export default connect(mapStateToProps, {
  get_all_teachers,
  add_teacher,
  delete_teacher,
  update_teacher,
  load_user,
})(Teachers)
