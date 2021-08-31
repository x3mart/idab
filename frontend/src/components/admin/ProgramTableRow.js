import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import dummy_avatar from '../../assets/man.svg'
import { load_lk_programs_list } from '../../redux/actions/admin/adminPrograms'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ProgramTableRow = ({ programs_list, ...props }) => {
  const { category, update_modal, delete_modal, load_lk_programs_list } = props

  const { id, name } = category

  const [programVisible, setProgramVisible] = useState(null)
  const [programsList, setProgramsList] = useState([])
  const [addActive, setAddActive] = useState(false)
  const [programName, setProgramName] = useState('')
  const [programShortDescription, setProgramShortDescription] = useState('')
  const [programFullDescription, setProgramFullDescription] = useState('')
  const [programIsActive, setProgramIsActive] = useState(true)
  const [categoryId, setCategoryId] = useState(null)

  useEffect(() => {
    load_lk_programs_list()
  }, [])

  useEffect(() => {
    if (programs_list) {
      setProgramsList(programs_list)
    }
  }, [programs_list])

  const groupToggle = id => {
    if (id !== programVisible) {
      if (programsList && programsList.length > 0) {
        setProgramsList(programsList.filter(item => item.category == id))
      }
      setProgramVisible(id)
    } else {
      setProgramsList(programs_list)
      setProgramVisible('')
    }
  }

  const addModal = (id) => {
    setAddActive(true)
    setCategoryId(id)
  }

  const handleAdd = e => {
    e.preventDefault()
    const program = {
      name: programName,
      short_description: programShortDescription,
      full_description: programFullDescription,
      is_active: programIsActive,
      category: categoryId,
    }
    setAddActive(false)
    add_lk_program(program)
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setProgramName('')
    setProgramShortDescription('')
    setProgramFullDescription('')
    setProgramIsActive(true)
    setCategoryId(null)
  }

  return (
    <Fragment>
      <div
        className={`modal fade ${addActive ? 'show' : ''}`}
        style={{ display: addActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleAdd(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить специализацию</h4>
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
                    <label>Название специализации</label>
                    <input
                      type='text'
                      className='form-control'
                      value={programName}
                      required
                      onChange={e => setProgramName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Короткое описание специализации</label>
                    <input
                      type='text'
                      className='form-control'
                      value={programShortDescription}
                      required
                      onChange={e => setProgramShortDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Полное описание специализации</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={programFullDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setProgramFullDescription(data)
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        value=''
                        required
                        id='flexCheckDefault'
                        checked={programIsActive}
                        onChange={e => setProgramIsActive(e.target.checked)}
                      />
                      <label class='form-check-label' for='flexCheckDefault'>
                        Активная специализация
                      </label>
                    </div>
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

      <tr>
        <td>
          <div onClick={() => groupToggle(id)} style={{ cursor: 'pointer' }}>
            {name}
          </div>
        </td>
        <td>
          <a
            className='add'
            data-toggle='modal'
            onClick={() => addModal(id)}
          >
            <i className='material-icons' data-toggle='tooltip' title='Add'>
              &#xE145;
            </i>
          </a>
          <a
            className='edit'
            data-toggle='modal'
            onClick={() => update_modal(id)}
          >
            <i className='material-icons' data-toggle='tooltip' title='Edit'>
              &#xE254;
            </i>
          </a>
          <a
            className='delete'
            data-toggle='modal'
            onClick={() => delete_modal(id)}
          >
            <i className='material-icons' data-toggle='tooltip' title='Delete'>
              &#xE872;
            </i>
          </a>
        </td>
      </tr>
      {programVisible === id &&
        programsList.length > 0 &&
        programsList.map(item => (
          <tr key={item.id}>
            <td style={{ paddingLeft: '40px' }}>{item.name}</td>
            <td>
              <a
                className='edit'
                data-toggle='modal'
                onClick={() => program_update_modal(item.id)}
              >
                <i
                  className='material-icons'
                  data-toggle='tooltip'
                  title='Edit'
                >
                  &#xE254;
                </i>
              </a>
              <a
                className='delete'
                data-toggle='modal'
                onClick={() => program_delete_modal(item.id)}
              >
                <i
                  className='material-icons'
                  data-toggle='tooltip'
                  title='Delete'
                >
                  &#xE872;
                </i>
              </a>
            </td>
          </tr>
        ))}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  programs_list: state.adminPrograms.lk_programs,
})

export default connect(mapStateToProps, {
  load_lk_programs_list,
})(ProgramTableRow)
