import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import GroupModal from './GroupModal'
import DeleteModal from './DeleteModal'
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
import { proper_date } from '../../functions'

const GroupTableRow = ({
  load_basic_groups_list,
  update_basic_group,
  add_basic_group,
  delete_basic_group,
  load_groups_list,
  groups,
  add_group,
  update_group,
  delete_group,
  ...props
}) => {
  const { base_program, update_modal, delete_modal, active, setOpened } = props

  const { id, name } = base_program

  const [groupsList, setGroupsList] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [deleteActive, setDeleteActive] = useState(false)
  const [activeGroup, setActiveGroup] = useState(null)
  const [action, setAction] = useState('')

  const [modalActive, setModalActive] = useState(false)
  const [data, setData] = useState({})
  const [dataType, setDataType] = useState('')

  useEffect(() => {
    load_groups_list()
  }, [])

  useEffect(() => {
    if (groups) {
      setGroupsList(groups.filter(item => item.name === base_program.name))
    }
  }, [groups])

  useEffect(() => {
    setOpened(activeGroup)
  }, [activeGroup])

  const openBaseGroup = id => {
    if (activeGroup === id) {
      setActiveGroup(null)
    } else {
      setActiveGroup(id)
    }
  }

  const closeModal = () => {
    setModalActive(false)
  }

  const openModal = (id, action) => {
    if (action === 'update') {
      setData(groupsList.filter(item => item.id === id)[0])
      setData({ ...data, basic: base_program.id})
    } else {
      setData(base_program)
    }
    setAction(action)
    setModalActive(true)
  }

  const handleModal = content => {
    setModalActive(false)
    if (content.id) {
      update_group(content)
    } else {
      add_group(content)
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

  const handleDelete = (contentId) => {
    setDeleteActive(false)
    delete_group(contentId)
  }

  return (
    <Fragment>
      {deleteActive && (
        <DeleteModal
          id={deleteId}
          name="Удаление потока"
          handleDelete={(contentId) =>
            handleDelete(contentId)
          }
          closeDelete={closeDelete}
          type={dataType}
        />
      )}

      {modalActive && (
        <GroupModal
          data={data}
          handleData={content => handleModal(content)}
          closeModal={closeModal}
          base={base_program}
          action={action}
          // type={dataType}
        />
      )}

      <tr>
        <td>
          <div onClick={() => openBaseGroup(id)} style={{ cursor: 'pointer' }}>
            {name}
          </div>
        </td>
        <td>
          <a
            className='add'
            data-toggle='modal'
            onClick={() => openModal(id, 'add')}
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

      {active === id &&
        groupsList.map(item => (
          <tr key={item.id}>
            <td
              style={{ paddingLeft: '40px' }}
            >{`${item.name} ${proper_date(item.start_date)}-${proper_date(item.graduation_date)}`}</td>
            <td>
              {/* <a
                className='edit'
                data-toggle='modal'
                onClick={() => openModal(item.id, 'update')}
              >
                <i
                  className='material-icons'
                  data-toggle='tooltip'
                  title='Edit'
                >
                  &#xE254;
                </i>
              </a> */}
              <a
                className='delete'
                data-toggle='modal'
                onClick={() => openDelete(item.id, 'группа')}
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
  groups: state.groups.groups,
})

export default connect(mapStateToProps, {
  load_basic_groups_list,
  add_basic_group,
  update_basic_group,
  delete_basic_group,
  load_groups_list,
  add_group,
  update_group,
  delete_group,
})(GroupTableRow)
