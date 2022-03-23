import React, {Fragment, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import '../../admin/containers/Students.css'
import {load_groups_list} from '../../redux/actions/admin/groups'
import {load_user} from '../../redux/actions/auth/auth'
import Solution from "../../admin/containers/components/Solution";
import {
  delete_task,
} from '../../redux/actions/admin/tasks'
import DeleteModal from "../../admin/containers/components/DeleteModal";
import UpdateTaskModal from "../../admin/containers/components/UpdateTaskModal";
import AddSolution from "../../admin/containers/components/AddSolution";
// import {load_solutions} from "../../redux/actions/admin/tasks";

const TasksTableRow = ({
                         task,
                         update_modal,
                         delete_modal,
                         groups_list,
                         load_groups_list,
                         load_user,
                         user,
                         delete_task,

                       }) => {

  const [fileName, setFileName] = useState('')
  const [rowOpened, setRowOpened] = useState(false)
  const [activeRow, setActiveRow] = useState(false)
  const [positiveRow, setPositiveRow] = useState(false)

  const handleRowClick = () => {
    setRowOpened(!rowOpened)
  }


  const handleDeleteTask = () => {
    delete_task(task.id)
  }

  // useEffect(() => {
  //   if(students.some(item => !item.solution.mark)){
  //     setActiveRow(true)
  //   } else {
  //     setActiveRow(false)
  //   }
  // }, [students])

  useEffect(() => {
    if (task && task.file) {
      let arr = task.file.split('/')
      setFileName(arr[arr.length - 1])
    }
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  useEffect(() => {
    if (user.is_student) {
      if (task && task.solution) {
        setActiveRow(false)
      } else {
        setActiveRow(true)
      }
    }
    if (user.is_teacher) {
      if (task && task.students && task.students.some(item => item.solution && !item.solution.mark)) {
        setActiveRow(true)
        setPositiveRow(false)
      } else if (task && task.students && task.students.some(item => item.solution && item.solution.mark)) {
        setPositiveRow(true)
        setActiveRow(false)
      } else {
        setActiveRow(false)
        setPositiveRow(false)
      }
    }
  }, [user, task])

  const ActionSection = () => {
    if (user) {
      if (user.is_student) {
        return (
          <td>
            <AddSolution task={task}/>
          </td>
        )
      } else {
        return (
          <td>
            <UpdateTaskModal task={task}/>
            <DeleteModal name='задание' action={handleDeleteTask}/>
          </td>
        )
      }
    }
  }
  const GroupsSection = () => {
    if (user) {
      if (user.is_student) {
        return (
          <td>
            {task.teacher}
          </td>
        )
      } else {
        return (
          <td>
            {task && task.training_group}
          </td>
        )
      }
    }
  }

  return (
    <tr>
      <GroupsSection/>
      <td>
        <div className="row-name-wrapper">
          <div className="row-name-section">
            <div className="row-name" onClick={handleRowClick} style={{cursor: 'pointer'}}>
              {activeRow && (
                <div className='new-solutions'/>
              )}
              {positiveRow && (
                <div className='new-solutions-marks'/>
              )}
              {rowOpened ? 'Название: ' + task && task.name : task && task.name}
            </div>
            {rowOpened && (
              <>
                <div className="row-description">
                  Описание: {task && task.description}
                </div>
                {task && task.file && (
                  <div className="row-file">
                    Скачать файл: <a href={task && task.file}>{fileName}</a>
                  </div>
                )}
              </>
            )}
          </div>
          {rowOpened && !user.is_student && (
            <div className="row-student-section">
              <div className="row-title">
                Слушатели:{' '}
              </div>
              <div className="row-students-list">
                {task && task.students && task.students.map(item => {
                  if (item.solution) {
                    return (
                      <Solution
                        key={item.id}
                        student_name={item.name}
                        task_name={task.name}
                        solution={item.solution}
                        task_id={task.id}
                        student_id={item.id}
                      />
                    )
                  } else {
                    return (
                      <div key={item.id} className='student-item-grey'>
                        {item.name}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </td>
      {user && user.is_student && (
        <td>
          {task && task.solution && task.solution.mark}
        </td>
      )}
      <ActionSection/>
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
  delete_task,
})(TasksTableRow)
