import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import './Students.css'
import { Redirect } from 'react-router-dom'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import ProgramTableRow from '../../components/admin/ProgramTableRow'
import {
  load_lk_categories_list,
  load_lk_programs_list,
  add_lk_category,
  update_lk_category,
  delete_lk_category,
} from '../../redux/actions/admin/adminPrograms'
import { load_user } from '../../redux/actions/auth/auth'
import { isNotEmptyObject } from '../../functions'
import { MDBSpinner } from 'mdbreact'

const AdminPrograms = ({
  load_user,
  load_lk_categories_list,
  categories_list,
  isAuthenticated,
  user,
  add_lk_category,
  update_lk_category,
  delete_lk_category,
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
  const [addActive, setAddActive] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryShortDescription, setCategoryShortDescription] = useState('')
  const [categoryFullDescription, setCategoryFullDescription] = useState('')
  const [categoryIsActive, setCategoryIsActive] = useState(true)
  const [categoryImage, setCategoryImage] = useState(null)
  const [categoryNewImage, setCategoryNewImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    {
      let timer = setTimeout(
        () => setCategoriesData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(categories_list) && categories_list.length > 0) {
        setCategoriesList(categories_list)
        setCategoriesData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [categories_list, categoriesList])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  const handleReload = () => {
    setCategoriesData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const handleCategorySelect = e => {
    setSelectedCategory(e.target.value)
  }

  const deleteRow = id => {
    setDeleteId(id)
    setDeleteActive(true)
  }

  const updateRow = id => {
    const category = categoriesList.filter(item => item.id === id)[0]
    setUpdateId(id)
    setCategoryName(category.name)
    setCategoryImage(category.image)
    setCategoryShortDescription(category.short_description)
    setCategoryFullDescription(category.full_description)
    setCategoryIsActive(category.is_active)
    setUpdateActive(true)
  }

  const handleUpdate = e => {
    e.preventDefault()
    let category = {
      id: updateId,
      name: categoryName,
      short_description: categoryShortDescription,
      full_description: categoryFullDescription,
      is_active: categoryIsActive,
    }
    category = categoryNewImage
      ? { image: categoryNewImage, ...category }
      : category

    update_lk_category(category)
    setUpdateId(null)
    setUpdateActive(false)
  }

  const handleAdd = e => {
    e.preventDefault()
    const category = {
      name: categoryName,
      image: categoryNewImage,
      short_description: categoryShortDescription,
      full_description: categoryFullDescription,
      is_active: categoryIsActive,
    }
    setAddActive(false)
    add_lk_category(category)
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setCategoryName('')
    setCategoryShortDescription('')
    setCategoryFullDescription('')
    setCategoryIsActive(true)
  }

  const handleCancelUpdate = () => {
    setUpdateActive(false)
    setCategoryName('')
    setCategoryShortDescription('')
    setCategoryFullDescription('')
    setCategoryIsActive(true)
    setCategoryImage(null)
    setCategoryNewImage(null)
  }

  const handleDelete = () => {
    setDeleteActive(false)
    delete_lk_category(deleteId)
    setDeleteId(null)
  }

  const handleCancelDelete = () => {
    setDeleteActive(false)
    setDeleteId(null)
  }

  const setOpened = id => {
    setActiveCategory(id)
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
              <h4 className='modal-title'>???????????????? ??????????????????????????/??????????????????</h4>
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
              <p>???? ??????????????, ?????? ???????????? ?????????????? ?????? ?????????????</p>
              <p className='text-warning'>
                <small>?????? ???????????????? ???????????? ????????????????!</small>
              </p>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-default'
                onClick={() => handleCancelDelete()}
              >
                ????????????????
              </button>
              <button className='btn btn-danger' onClick={() => handleDelete()}>
                ??????????????
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
                <h4 className='modal-title'>???????????????? ??????????????????</h4>
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
                    <label>???????????????? ??????????????????</label>
                    <input
                      type='text'
                      className='form-control'
                      value={categoryName}
                      required
                      onChange={e => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>??????????????????????</label>
                    <input
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => setCategoryNewImage(e.target.files[0])}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label>???????????????? ???????????????? ??????????????????</label>
                    <input
                      type='text'
                      className='form-control'
                      value={categoryShortDescription}
                      required
                      onChange={e =>
                        setCategoryShortDescription(e.target.value)
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label>???????????? ???????????????? ??????????????????</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={categoryFullDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setCategoryFullDescription(data)
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        id='flexCheckDefault'
                        checked={categoryIsActive}
                        onChange={e => setCategoryIsActive(e.target.checked)}
                      />
                      <label class='form-check-label' for='flexCheckDefault'>
                        ???????????????? ??????????????????
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='????????????????'
                  onClick={() => handleCancelAdd()}
                />
                <input
                  type='submit'
                  className='btn btn-info'
                  value='??????????????????'
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
                <h4 className='modal-title'>???????????????? ??????????????????</h4>
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
                    <label>???????????????? ??????????????????</label>
                    <input
                      type='text'
                      className='form-control'
                      value={categoryName}
                      required
                      onChange={e => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>??????????????????????</label>
                    <p>
                      <img src={categoryImage} alt='' width='100' /> ??????????????
                      ??????????????????????
                    </p>
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpeg'
                      onChange={e => setCategoryNewImage(e.target.files[0])}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label>???????????????? ???????????????? ??????????????????</label>
                    <input
                      type='text'
                      className='form-control'
                      value={categoryShortDescription}
                      required
                      onChange={e =>
                        setCategoryShortDescription(e.target.value)
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label>???????????? ???????????????? ??????????????????</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={categoryFullDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setCategoryFullDescription(data)
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        id='flexCheckDefault'
                        checked={categoryIsActive}
                        onChange={e => setCategoryIsActive(e.target.checked)}
                      />
                      <label class='form-check-label' for='flexCheckDefault'>
                        ???????????????? ??????????????????
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='????????????????'
                  onClick={() => handleCancelUpdate()}
                />
                <input
                  type='submit'
                  className='btn btn-info'
                  value='??????????????????'
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {categoriesData.pending && (
        <div className='w-100 h-50 d-flex justify-content-center align-items-center'>
          <MDBSpinner big />
        </div>
      )}

      {categoriesData.error && (
        <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center'>
          <h2>??????-???? ?????????? ???? ??????...</h2>
          <h4>???????????????????? ???????????????? ????????????????</h4>
          <button
            className='btn btn-outline-blue-grey'
            type='button'
            onClick={() => handleReload()}
          >
            ????????????????
          </button>
        </div>
      )}

      {categoriesData.loaded && (
        <Fragment>
          <div className='main-body__users'>
            <div className='cards'>
              <div className='cards__header table-title'>
                <div className='cards__header-title admin-text-light'>
                  ???????????????????? <strong>??????????????????????</strong>
                </div>
                <div>
                  <button
                    className='btn btn-success'
                    onClick={() => setAddActive(true)}
                  >
                    <i className='material-icons'>&#xE147;</i>{' '}
                    <span>???????????????? ??????????????????</span>
                  </button>
                </div>
              </div>

              <div className='cards'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>???????????????????????? ??????????????????</th>
                      <th>????????????????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesList.length > 1 &&
                      categoriesList.map(item => (
                        <ProgramTableRow
                          key={item.id}
                          setOpened={id => setOpened(id)}
                          active={activeCategory}
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
  programs_list: state.adminPrograms.lk_programs,
})

export default connect(mapStateToProps, {
  load_lk_categories_list,
  load_lk_programs_list,
  add_lk_category,
  update_lk_category,
  delete_lk_category,
  load_user,
})(AdminPrograms)
