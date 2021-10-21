import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import { load_groups_list } from '../../redux/actions/admin/groups'
import { load_user } from '../../redux/actions/auth/auth'

const MaterialsTableRow = ({
  material,
  update_modal,
  delete_modal,
  groups_list,
  load_groups_list,
  load_user,
  user,
}) => {
  const { id, name, training_groups, file } = material

  useEffect(() => {
    load_groups_list()
  }, [])
  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  const ActionSection = () => {
    if (user) {
      if (user.is_student) {
        return ''
      } else {
        return (
          <td>
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
              <i
                className='material-icons'
                data-toggle='tooltip'
                title='Delete'
              >
                &#xE872;
              </i>
            </a>
          </td>
        )
      }
    }
  }
  const GroupsSection = () => {
    if (user) {
      if (user.is_student) {
        return ''
      } else {
        return (
          <td>
            {groups_list.length > 0 &&
              groups_list.map(item => {
                if (item.id == training_groups) {
                  return item.name
                }
              })}
          </td>
        )
      }
    }
  }

  return (
    <tr>
      <GroupsSection />
      <td>
        <a href={file}>{name}</a>
      </td>
      <ActionSection />
    </tr>
  )
}

const mapStateToProps = state => ({
  groups_list: state.groups.groups,
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  load_groups_list,
  load_user,
})(MaterialsTableRow)
