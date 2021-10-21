import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'
import LibraryTableRow from '../../components/admin/LibraryTableRow'
import {
  load_library,
  add_library_item,
  update_library_item,
  delete_library_item,
} from '../../redux/actions/admin/library'

import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject, proper_date } from '../../functions'
import { MDBSpinner } from 'mdbreact'
import AddTask from './components/AddTask'

const Library = ({
  load_user,
  isAuthenticated,
  user,
  load_library,
  add_library_item,
  update_library_item,
  delete_library_item,
  library,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }


  const [libraryData, setLibraryData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })
  const [libraryList, setLibraryList] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemUrl, setItemUrl] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [updateActive, setUpdateActive] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)
  const [addActive, setAddActive] = useState(false)
  const [deleteId, setDeleteId] = useState(false)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setLibraryData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(library) && library.length > 0) {
        setLibraryList(library)
        setLibraryData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [library, libraryList])

  useEffect(() => {
    load_library()
  }, [])

  useEffect(() => {
    setLibraryList(library)
  }, [library])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])



  const updateRow = id => {
    const book = libraryList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setItemName(book.name)
    setItemDescription(book.description)
    setItemUrl(book.link)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    const book = {
      id: updateId,
      name: itemName,
      description: itemDescription,
      link: itemUrl,
    }
    setUpdateActive(false)
    update_library_item(book)
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
    delete_library_item(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const handleReload = () => {
    setLibraryData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const handleAdd = e => {
    e.preventDefault()
    let book = {
      name: itemName,
      description: itemDescription,
      link: itemUrl,
    }
    setAddActive(false)
    add_library_item(book)
    setItemName('')
    setItemDescription('')
    setItemUrl('')
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setItemName('')
    setItemDescription('')
    setItemUrl('')
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
              <h4 className='modal-title'>Удаление книг</h4>
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
                <h4 className='modal-title'>Обновить книгу</h4>
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
                    <label>Название книги</label>
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
                      type='text'
                      className='form-control'
                      value={itemUrl}
                      onChange={e => setItemUrl(e.target.value)}
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
                <h4 className='modal-title'>Добавить книгу</h4>
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
                    <label>Название книги</label>
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
                      type='text'
                      className='form-control'
                      value={itemUrl}
                      onChange={e => setItemUrl(e.target.value)}
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
                Библиотека
              </div>
            ) : (
              <div className='cards__header-title admin-text-light'>
                Управление <strong>библиотекой</strong>
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
                  <span>Добавить книгу</span>
                </button>
              </div>
            )}
          </div>

          {libraryData.pending && (
            <div className='w-100 h-50 d-flex justify-content-center align-items-center py-5'>
              <MDBSpinner big />
            </div>
          )}

          {libraryData.error && (
            <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center py-5'>
              <h2>Что-то пошло не так...</h2>
              <h4>Попробуйте обновить страницу, или добавить книгу</h4>
              <button
                className='btn btn-outline-blue-grey'
                type='button'
                onClick={() => handleReload()}
              >
                Обновить
              </button>
            </div>
          )}

          {libraryData.loaded && (
            <div className='cards'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th>Название</th>
                    {user && !user.is_student && <th>Действия</th>}
                  </tr>
                </thead>
                <tbody>
                  {libraryList.length > 0 &&
                    libraryList.map(item => (
                      <LibraryTableRow
                        key={item.id}
                        book={item}
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
  library: state.library.library,
})

export default connect(mapStateToProps, {
  load_library,
  add_library_item,
  update_library_item,
  delete_library_item,
  load_user,
})(Library)
