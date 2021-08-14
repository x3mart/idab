import React, {Fragment, useEffect, useState} from "react";
import '../../admin/containers/Students.css';
import {connect} from "react-redux";
import {add_id, remove_id} from "../../redux/actions/admin/teachers";
import dummy_avatar from "../../assets/man.svg"

const TeacherTableRow = ({teacher, update_modal, delete_modal, add_id, remove_id, teachers_actions_list}) => {

  const {id, avatar, name, email, phone} = teacher

  const [checked, setChecked] = useState(false)

  const [teachersActionsList, setTeachersActionsList] = useState([])

  useEffect(() => {
    setTeachersActionsList(teachers_actions_list)
  }, [teachers_actions_list])

  useEffect(() => {
    setChecked(teachersActionsList.includes(id))
  }, [teachersActionsList])

  // const handleCheckboxChange = (e) => {
  //   setChecked(e.target.checked)
  //   if (e.target.checked) {
  //     if (ids) {
  //       if (!ids.includes(id)) {
  //         add_id(id)
  //       }
  //     }
  //   } else if (!e.target.checked) {
  //     if (ids) {
  //       if (ids.includes(id)) {
  //         remove_id(id)
  //       }
  //     }
  //   }
  // }
  //
  // useEffect(() => {
  //   setChecked(is_selected)
  //   if (is_selected) {
  //     pass_id(id)
  //   }
  // }, [is_selected])

  return (
    <tr>
      <td>
            <span className="custom-checkbox">
								<input
                  id={`checkbox-${id}`}
                  type="checkbox"
                  checked={checked}
                  onClick={() => checked ? remove_id(id) : add_id(id)}
                />
                <label htmlFor={`checkbox-${id}`}/>
							</span>
      </td>
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
  ids: state.tableReducer.payload,
  teachers_actions_list: state.teachers.teachers_actions_list
})

export default connect(mapStateToProps, {add_id, remove_id})(TeacherTableRow)