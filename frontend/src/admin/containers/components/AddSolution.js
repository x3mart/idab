import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import SelectGroup from "./SelectGroup";
import {
  add_solution,
} from '../../../redux/actions/admin/tasks'

const AddSolution = ({task, add_solution}) => {
  const [active, setActive] = useState(false)
  const [taskDescription, setTaskDescription] = useState('')
  const [taskFile, setTaskFile] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    const solution = {
      id: task.id,
      description: taskDescription,
      file: taskFile,
    }
    setActive(false)
    add_solution(solution)
    setTaskDescription('')
    setTaskFile(null)
  }

  const handleCancel = () => {
    setActive(false)
    setTaskDescription('')
    setTaskFile(null)
  }

  return (
    <>
      <div
        className={`modal fade ${active ? 'show' : ''}`}
        style={{ display: active ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
              <div className='modal-header'>
                <h4 className='modal-title'>Добавить решение</h4>
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
                  onClick={() => handleCancel()}
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

      <div
        className='add-solution'
        data-toggle='modal'
        onClick={() => setActive(true)}
      >
        Добавить решение
      </div>

    </>
  )
}


export default connect(null, {
  add_solution,
})(AddSolution)
