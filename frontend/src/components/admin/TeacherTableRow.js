import React, {Fragment, useEffect, useState} from "react";
import '../../admin/containers/Students.css';
import {connect} from "react-redux";
import {add_id, remove_id} from "../../redux/actions/admin/teachers";
import dummy_avatar from "../../assets/man.svg"

const TeacherTableRow = ({teacher, update_modal, delete_modal}) => {

  const {id, avatar, name, email, phone} = teacher

  return (
    <tr>
      <td>
        <div
          className="sidenav__profile-avatar"
          style={{backgroundImage: `url(${avatar ? avatar : dummy_avatar})`}}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <a
          className="edit"
          data-toggle="modal"
          onClick={() => update_modal(id)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
        </a>
        <a
          className="delete"
          data-toggle="modal"
          onClick={() => delete_modal(id)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
        </a>
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps)(TeacherTableRow)