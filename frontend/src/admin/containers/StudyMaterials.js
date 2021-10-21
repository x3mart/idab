import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import MaterialsTableRow from '../../components/admin/MaterialsTableRow'
import {
  load_study_materials,
  add_study_material,
  update_study_material,
  delete_study_material,
} from '../../redux/actions/admin/study_materials'

import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject, proper_date } from '../../functions'
import { MDBSpinner } from 'mdbreact'
import AddTask from './components/AddTask'
import { load_groups_list } from '../../redux/actions/admin/groups'

const StudyMaterials = ({
  load_user,
  isAuthenticated,
  user,
  load_study_materials,
  add_study_material,
  update_study_material,
  delete_study_material,
  study_materials,
  groups_list,
  load_groups_list,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [studyMaterialsData, setStudyMaterialsData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [studyMaterialsList, setStudyMaterialsList] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemFile, setItemFile] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [updateActive, setUpdateActive] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState([])
  const [studyGroups, setStudyGroups] = useState([])

  useEffect(() => {
    {
      let timer = setTimeout(
        () =>
          setStudyMaterialsData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(study_materials) && study_materials.length > 0) {
        setStudyMaterialsList(study_materials)
        setStudyMaterialsData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [study_materials, studyMaterialsList])

  useEffect(() => {
    load_study_materials()
    load_groups_list()
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  useEffect(() => {
    setStudyMaterialsList(study_materials)
  }, [study_materials])

  const handleProgramsSelect = e => {
      let arr = Array.from(e.target.selectedOptions, option => option.value)
    setSelectedProgram(arr)
  }

  const handleAdd = e => {
    e.preventDefault()
    const material = {
      training_groups: selectedProgram.join(' '),
      name: itemName,
      description: itemDescription,
      file: itemFile,
    }
    setAddActive(false)
    add_study_material(material)
    setItemName('')
    setItemDescription('')
    setItemUrl('')
    setSelectedProgram([])
  }

  const updateRow = id => {
    const material = studyMaterialsList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setItemName(material.name)
    setItemDescription(material.description)
    setStudyGroups(material.training_groups)
    // setItemFile(material.url)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const material = {
      id: updateId,
      training_groups: selectedProgram.join(' '),
      name: itemName,
      description: itemDescription,
      file: itemFile,
    }
    setUpdateActive(false)
    update_study_material(material)
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
    delete_study_material(deleteId)
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

//   const addStudyMaterial = e => {
//     e.preventDefault()
//     let material = {
//       name: itemName,
//       description: itemDescription,
//       file: itemFile,
//     }
//     add_study_material(material)
//     setItemName('')
//     setItemDescription('')
//     setItemUrl('')
//   }

  const handleCancelAdd = () => {
    setAddActive(false)
    setItemName('')
    setItemDescription('')
    setItemFile('')
    setSelectedProgram([])
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
              <h4 className='modal-title'>Удаление методических материалов</h4>
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
                <h4 className='modal-title'>Обновить материал</h4>
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
                      multiple
                      className='form-select multiselect'
                      aria-label='Выберите программу'
                      onChange={handleProgramsSelect}
                    >
                      <option selected>Выберите группу</option>
                      {groups_list &&
                        groups_list.map(item => (
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
                      value={itemName}
                      onChange={e => setItemName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Описание</label>
                    <input
                      type='text'
                      className='form-control'
                      value={itemDescription}
                      onChange={e => setItemDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Ссылка</label>
                    <input
                      type='file'
                      className='form-control'
                      value={itemFile}
                      onChange={e => setItemFile(e.target.files[0])}
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
                <h4 className='modal-title'>Добавить материал</h4>
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
                      multiple
                      className='form-select multiselect'
                      aria-label='Выберите программу'
                      //   value={
                      //     groups_list &&
                      //     groups_list.filter(obj =>
                      //       selectedProgram.includes(toString(obj.id))
                      //     )
                      //   }
                      // onChange={event => handleGroupSelectHeader(event)}
                      onChange={handleProgramsSelect}
                    >
                      <option selected>Выберите группу</option>
                      {groups_list &&
                        groups_list.map(item => (
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
                      value={itemName}
                      onChange={e => setItemName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Описание</label>
                    <input
                      type='text'
                      className='form-control'
                      value={itemDescription}
                      onChange={e => setItemDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Ссылка</label>
                    <input
                      type='file'
                      className='form-control'
                      value={itemFile}
                      onChange={e => setItemFile(e.target.files[0])}
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
                Методические материалы
              </div>
            ) : (
              <div className='cards__header-title admin-text-light'>
                Управление <strong>методическими материалами</strong>
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
                  <span>Добавить материал</span>
                </button>
              </div>
            )}
          </div>

          {studyMaterialsData.pending && (
            <div className='w-100 h-50 d-flex justify-content-center align-items-center py-5'>
              <MDBSpinner big />
            </div>
          )}

          {studyMaterialsData.error && (
            <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center py-5'>
              <h2>Что-то пошло не так...</h2>
              <h4>Попробуйте обновить страницу, или добавить материал</h4>
              <button
                className='btn btn-outline-blue-grey'
                type='button'
                onClick={() => handleReload()}
              >
                Обновить
              </button>
            </div>
          )}

          {studyMaterialsData.loaded && (
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
                  {study_materials.length > 0 &&
                    study_materials.map(item => (
                      <MaterialsTableRow
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
  study_materials: state.study_materials.study_materials,
  groups_list: state.groups.groups,
})

export default connect(mapStateToProps, {
  load_study_materials,
  add_study_material,
  update_study_material,
  delete_study_material,
  load_user,
  load_groups_list,
})(StudyMaterials)
