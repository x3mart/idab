import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import ProgramTableRow from '../../components/admin/ProgramTableRow'
import { load_lk_categories_list } from '../../redux/actions/admin/adminPrograms'
import { isNotEmptyObject } from '../../functions'
import { MDBSpinner } from 'mdbreact'

const AdminPrograms = ({
  load_lk_categories_list,
  categories_list,
  isAuthenticated,
  user,
}) => {


  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  useEffect(() => {
    load_lk_categories_list()
  }, [])

  const [categoriesData, setCategoriesData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [categoriesList, setCategoriesList] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [deleteActive, setDeleteActive] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [updateActive, setUpdateActive] = useState(false)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setCategoriesData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(categories_list) && categories_list.length > 0) {
        console.log(2)
        setCategoriesList(categories_list)
        setCategoriesData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [categories_list, categoriesList])

  const handleReload = () => {
    setCategoriesData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const deleteRow = id => {
    setDeleteId(id)
    setDeleteActive(true)
  }

  const updateRow = id => {
    const category = categoriesList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setStudentName(student.name)
    setStudentMail(student.email)
    setStudentPhone(student.phone)
    setUpdateActive(true)
  }

  return (
    <Fragment>
      {categoriesData.pending && (
        <div className='w-100 h-50 d-flex justify-content-center align-items-center'>
          <MDBSpinner big />
        </div>
      )}

      {categoriesData.error && (
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

      {categoriesData.loaded && (
        <Fragment>
          <div className='main-body__users'>
            <div className='cards'>
              <div className='cards__header table-title'>
                <div className='cards__header-title admin-text-light'>
                  Управление <strong>программами</strong>
                </div>
                <div>
                  <button
                    className='btn btn-success'
                    onClick={() => setAddActive(true)}
                  >
                    <i className='material-icons'>&#xE147;</i>{' '}
                    <span>Добавить программу</span>
                  </button>
                </div>
              </div>

              <div className='cards'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Наименование программы</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList.length > 1 &&
                      categoriesList.map(item => (
                        <ProgramTableRow
                          key={item.id}
                          category={item}
                          update_modal={id => updateRow(id)}
                          delete_modal={id => deleteRow(id)}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
  
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  categories_list: state.adminPrograms.lk_categories,
})

export default connect(mapStateToProps, { load_lk_categories_list })(AdminPrograms)
