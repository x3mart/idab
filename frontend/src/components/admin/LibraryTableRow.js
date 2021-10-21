import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../admin/containers/Students.css'
import { load_user } from '../../redux/actions/auth/auth'

const MaterialsTableRow = ({
  book,
  update_modal,
  delete_modal,
  load_user,
  user,
}) => {
  const { id, name, description, link } = book

  
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

  return (
    <tr>
      <td>
        <a href={link}>{name}</a>
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
  load_user,
})(MaterialsTableRow)
