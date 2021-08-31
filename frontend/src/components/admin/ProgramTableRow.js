import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import ProgramModal from './ProgramModal'
import DeleteModal from './DeleteModal'
import {
  load_lk_programs_list,
  add_lk_program,
  update_lk_program,
  delete_lk_program,
  delete_lk_category,
  update_lk_category,
  add_lk_category,
} from '../../redux/actions/admin/adminPrograms'

const ProgramTableRow = ({
  programs_list,
  load_lk_programs_list,
  add_lk_program,
  update_lk_program,
  delete_lk_program,
  delete_lk_category,
  update_lk_category,
  add_lk_category,
  ...props
}) => {
  const { category, update_modal, active, setOpened } = props

  const { id, name } = category

  const [programsList, setProgramsList] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [deleteActive, setDeleteActive] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  const [modalActive, setModalActive] = useState(false)
  const [data, setData] = useState({})
  const [dataType, setDataType] = useState('')

  useEffect(() => {
    load_lk_programs_list()
  }, [])

  useEffect(() => {
    if (programs_list) {
      setProgramsList(programs_list.filter(item => item.category === id))
    }
  }, [programs_list])

  useEffect(() => {
    setOpened(activeCategory)
  }, [activeCategory])

  const openCategory = id => {
    if (activeCategory === id) {
      setActiveCategory(null)
    } else {
      setActiveCategory(id)
    }
  }

  const closeModal = () => {
    setModalActive(false)
  }

  const openModal = (id, action, type) => {
    setDataType(type)
    if (action === 'add') {
      setData({ category_id: id })
    } else if (action === 'update') {
      setData(programsList.filter(item => item.id === id)[0])
    }
    setModalActive(true)
  }

  const handleModal = (content, type) => {
    setModalActive(false)

    if (type === 'специализация') {
      if (content.id) {
        update_lk_program(content)
      } else {
        add_lk_program(content)
      }
    } else if (type === 'программа') {
      if (content.id) {
        update_lk_category(content)
      } else {
        add_lk_category(content)
      }
    }
  }

  const closeDelete = () => {
    setDeleteActive(false)
  }

  const openDelete = (id, type) => {
    setDataType(type)
    setDeleteId(id)
    setDeleteActive(true)
  }

  const handleDelete = (contentId, contentType) => {
    setDeleteActive(false)
    if (contentType === 'специализация') {
      delete_lk_program(contentId)
    } else if (contentType === 'программа') {
      delete_lk_category(contentId)
    }
  }

  return (
    <Fragment>
      {deleteActive && (
        <DeleteModal
          id={deleteId}
          handleDelete={(contentId, contentType) =>
            handleDelete(contentId, contentType)
          }
          closeDelete={() => closeDelete()}
          type={dataType}
        />
      )}

      {modalActive && (
        <ProgramModal
          data={data}
          handleData={(content, type) => handleModal(content, type)}
          closeModal={() => closeModal()}
          type={dataType}
        />
      )}

      <tr>
        <td>
          <div onClick={() => openCategory(id)} style={{ cursor: 'pointer' }}>
            {name}
          </div>
        </td>
        <td>
          <a
            className='add'
            data-toggle='modal'
            onClick={() => openModal(id, 'add', 'специализация')}
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
            onClick={() => openDelete(id, 'программа')}
          >
            <i className='material-icons' data-toggle='tooltip' title='Delete'>
              &#xE872;
            </i>
          </a>
        </td>
      </tr>

      {active === id &&
        programsList.map(item => (
          <tr key={item.id}>
            <td style={{ paddingLeft: '40px' }}>{item.name}</td>
            <td>
              <a
                className='edit'
                data-toggle='modal'
                onClick={() => openModal(item.id, 'update', 'специализация')}
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
                onClick={() => openDelete(item.id, 'специализация')}
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
  add_lk_program,
  update_lk_program,
  delete_lk_program,
  delete_lk_category,
  update_lk_category,
  add_lk_category,
})(ProgramTableRow)
