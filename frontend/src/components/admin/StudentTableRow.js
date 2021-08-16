import React, {Fragment, useEffect, useState} from "react";
import '../../admin/containers/Students.css';
import dummy_avatar from "../../assets/man.svg"
import students from "../../redux/reducers/admin/students";

const StudentTableRow = (props) => {

  const {student, update_modal, delete_modal} = props

  const { id, avatar, name, email, phone, training_group } = student

  return (
    <tr>
      <td>
        <div
          className='sidenav__profile-avatar'
          style={{ backgroundImage: `url(${avatar ? avatar : dummy_avatar})` }}
        />
      </td>
      <td>{training_group ? training_group.basic : ''}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
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
          <i className='material-icons' data-toggle='tooltip' title='Delete'>
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  )
}


export default StudentTableRow