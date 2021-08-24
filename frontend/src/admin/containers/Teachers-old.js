import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import TeacherTableRow from '../../components/admin/TeacherTableRow'
import { get_all_teachers } from '../../redux/actions/admin/teachers'

const Teachers = ({
  isAuthenticated,
  user,
  get_all_teachers,
  teachers_list,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [teachersData, setTeachersData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [teachers, setTeachers] = useState([])
  const [teacherName, setTeacherName] = useState('')
  const [teacherMail, setTeacherMail] = useState('')
  const [teacherPhone, setTeacherPhone] = useState('')
  const [teacherImage, setTeacherImage] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [addActive, setAddActive] = useState(false)
  const [updateActive, setUpdateActive] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [deleteActive, setDeleteActive] = useState(false)

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

  const updateRow = id => {
    const teacher = teachers.filter(item => item.id === id)[0]
    setUpdateId(id)
    setTeacherName(teacher.name)
    setTeacherMail(teacher.email)
    setTeacherPhone(teacher.phone)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const teacher = {
      id: updateId,
      name: teacherName,
      email: teacherMail,
      phone: teacherPhone,
      training_group: selectedGroup,
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
      image: teacherImage,
      name: studentName,
      email: studentMail,
      phone: studentPhone,
    }
    add_student(student)
    setAddActive(false)

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
            <form onSubmit={e => handleUpdate(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Обновить преподавателя</h4>
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
                    <input type='text' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' required />
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
                  {teachers.map(item => (
                    <TeacherTableRow
                      teacher={item}
                      key={item.id}
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
  ids: state.tableReducer.payload,
  teachers_list: state.teachers.teachers_list,
})

export default connect(mapStateToProps, {
  get_all_teachers,
})(Teachers)
