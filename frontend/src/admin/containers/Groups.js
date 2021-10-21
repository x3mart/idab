import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import GroupTableRow from '../../components/admin/GroupTableRow'
import { load_lk_categories_list } from '../../redux/actions/admin/adminPrograms'
import {
  load_basic_groups_list,
  add_basic_group,
  update_basic_group,
  delete_basic_group,
  load_groups_list,
  add_group,
  update_group,
  delete_group,
} from '../../redux/actions/admin/groups'
import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject } from '../../functions'
import { MDBSpinner } from 'mdbreact'

const Groups = ({
  load_user,
  isAuthenticated,
  user,
  load_lk_categories_list,
  categories_list,
  load_basic_groups_list,
  basic_groups_list,
  add_basic_group,
  update_basic_group,
  delete_basic_group,
  load_groups_list,
  groups_list,
  add_group,
  update_group,
  delete_group,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  useEffect(() => {
    load_lk_categories_list()
    load_basic_groups_list()
  }, [])

  const [basicGroupsData, setBasicGroupsData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [basicGroupsList, setBasicGroupsList] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [deleteActive, setDeleteActive] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [updateActive, setUpdateActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [basicGroupName, setBasicGroupName] = useState('')
  const [basicGroupProgram, setBasicGroupProgram] = useState(null)
  const [groupName, setGroupName] = useState('')

  const [activeBasicGroup, setActiveBasicGroup] = useState(null)

  useEffect(() => {
    {
      let timer = setTimeout(
        () =>
          setBasicGroupsData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(basic_groups_list) && basic_groups_list.length > 0) {
        setBasicGroupsList(basic_groups_list)
        setBasicGroupsData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [basic_groups_list, basicGroupsList])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  const handleReload = () => {
    setBasicGroupsData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  // const handleCategorySelect = e => {
  //   setSelectedCategory(e.target.value)
  // }

  const deleteRow = id => {
    setDeleteId(id)
    setDeleteActive(true)
  }

  const updateRow = id => {
    const basic_group = basicGroupsList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setBasicGroupName(basic_group.name)
    setBasicGroupProgram(basic_group.category)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    let basic_group = {
      id: updateId,
      name: basicGroupName,
      category: basicGroupProgram,
    }
    update_basic_group(basic_group)
    setUpdateId(null)
    setUpdateActive(false)
  }

  const handleAdd = e => {
    e.preventDefault()
    const basic_group = {
      name: basicGroupName,
      category: basicGroupProgram,
    }
    setAddActive(false)
    add_basic_group(basic_group)
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setBasicGroupName('')
    setBasicGroupProgram('')
  }

  const handleCancelUpdate = () => {
    setUpdateActive(false)
    setBasicGroupName('')
    setBasicGroupProgram('')
  }

  const handleDelete = () => {
    setDeleteActive(false)
    delete_basic_group(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const setOpened = id => {
    setActiveBasicGroup(id)
  }

  const handleCategorySelect = e => {
    setBasicGroupProgram(e.target.value)
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
              <h4 className='modal-title'>Удаление специализации/программы</h4>
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
              <button className='btn btn-default' onClick={handleCancelDelete}>
                Отменить
              </button>
              <button className='btn btn-danger' onClick={handleDelete}>
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
            <form onSubmit={e => handleAdd(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить базовую группу</h4>
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
                    <label>Название группы</label>
                    <input
                      type='text'
                      className='form-control'
                      value={basicGroupName}
                      required
                      onChange={e => setBasicGroupName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Программа</label>
                    <select
                      name='category'
                      className='form-control'
                      value={basicGroupProgram}
                      onChange={handleCategorySelect}
                    >
                      <option selected>Выберите программу</option>
                      {Array.isArray(categories_list) &&
                        categories_list.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={handleCancelAdd}
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
                <h4 className='modal-title'>Обновить базовую группу</h4>
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
                    <label>Название группы</label>
                    <input
                      type='text'
                      className='form-control'
                      value={basicGroupName}
                      required
                      onChange={e => setBasicGroupName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Программа</label>
                    <select
                      name='category'
                      className='form-control'
                      value={basicGroupProgram}
                      onChange={handleCategorySelect}
                    >
                      <option selected>Выберите программу</option>
                      {Array.isArray(categories_list) &&
                        categories_list.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
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

      <Fragment>
        <div className='main-body__users'>
          <div className='cards'>
            <div className='cards__header table-title'>
              <div className='cards__header-title admin-text-light'>
                Управление <strong>группами</strong>
              </div>
              <div>
                <button
                  className='btn btn-success'
                  onClick={() => setAddActive(true)}
                >
                  <i className='material-icons'>&#xE147;</i>{' '}
                  <span>Добавить базовую группу</span>
                </button>
              </div>
            </div>

            {basicGroupsData.pending && (
              <div className='w-100 h-50 d-flex justify-content-center align-items-center my-5'>
                <MDBSpinner big />
              </div>
            )}

            {basicGroupsData.error && (
              <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center my-5'>
                <h2>Нет ни одной базовой группы</h2>
                <h4>Добавьте базовую группу, или обновите страницу</h4>
                <button
                  className='btn btn-outline-blue-grey'
                  type='button'
                  onClick={() => handleReload()}
                >
                  Обновить
                </button>
              </div>
            )}
            {basicGroupsData.loaded && (
              <div className='cards'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Название группы</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {basicGroupsList.length > 0 &&
                      basicGroupsList.map(item => (
                        <GroupTableRow
                          key={item.id}
                          setOpened={id => setOpened(id)}
                          active={activeBasicGroup}
                          base_program={item}
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
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  categories_list: state.adminPrograms.lk_categories,
  basic_groups_list: state.groups.basic_groups,
  groups_list: state.groups.groups,
})

export default connect(mapStateToProps, {
  load_lk_categories_list,
  load_basic_groups_list,
  add_basic_group,
  update_basic_group,
  delete_basic_group,
  load_groups_list,
  add_group,
  update_group,
  delete_group,
  load_user,
})(Groups)
