import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import SelectGroup from "./SelectGroup";
import {
  update_task,
} from '../../../redux/actions/admin/tasks'
import {
  get_all_students,
  sort_students,
} from '../../../redux/actions/admin/students'

const UpdateTaskModal = ({
                           task,
                           sorted_list,
                           update_task,
                           get_all_students,
                           sort_students,
                         }) => {

  const [active, setActive] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskFile, setTaskFile] = useState(null)

  useEffect(() => {
    console.log(task.training_group)
    sort_students(task.training_group)
  }, [task])

  useEffect(() => {
    if (task) {
      setSelectedGroup(task.training_group)
      setSelectedStudents(task.students)
      setTaskName(task.name)
      setTaskDescription(task.description)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const t = {
      id: task.id,
      name: taskName,
      description: taskDescription,
      file: taskFile,
    }
    setActive(false)
    update_task(t)
    setSelectedGroup(null)
    setSelectedStudents([])
    setTaskName('')
    setTaskDescription('')
    setTaskFile(null)
  }

  const handleCancel = () => {
    setActive(false)
    setSelectedGroup(null)
    setSelectedStudents([])
    setTaskName('')
    setTaskDescription('')
    setTaskFile(null)
  }

  const handleStudentsSelect = e => {
    setSelectedStudents([...e.target.options].filter(o => o.selected).map(o => o.value))
    console.log([...e.target.options].filter(o => o.selected).map(o => o.value))
  }

  const handleOpen = () => {
    setActive(true)
  }


  return (
    <>
      <div
        className={`modal fade ${active ? 'show' : ''}`}
        style={{display: active ? 'block' : 'none'}}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form
              onSubmit={handleSubmit}
            >
              <div className='modal-header'>
                <h4 className='modal-title'>Обновить задание</h4>
                <button
                  type='button'
                  className='close'
                  onClick={handleCancel}
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='custom-modal-form'>
                  <div className='form-group'>
                    <label>Название</label>
                    <input
                      type='text'
                      className='form-control'
                      value={taskName}
                      onChange={e => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Описание</label>
                    <textarea
                      className='form-control'
                      value={taskDescription}
                      onChange={e => setTaskDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Файл</label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={e => setTaskFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={handleCancel}
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

      <a
        className='edit'
        data-toggle='modal'
        onClick={handleOpen}
      >
        <i className='material-icons' data-toggle='tooltip' title='Edit'>
          &#xE254;
        </i>
      </a>
    </>
  )
}

const mapStateToProps = state => ({
  sorted_list: state.students.sorted_list,
})

export default connect(mapStateToProps, {
  get_all_students,
  sort_students,
  update_task,
})(UpdateTaskModal)
