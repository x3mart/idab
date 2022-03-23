import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import SelectGroup from "./SelectGroup";
import {
  add_solution,
} from '../../../redux/actions/admin/tasks'

const AddSolution = ({task, add_solution}) => {
  const [active, setActive] = useState(false)
  const [viewActive, setViewActive] = useState(false)
  const [taskDescription, setTaskDescription] = useState('')
  const [taskFile, setTaskFile] = useState(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (task && task.solution && task.solution.file) {
      let arr = task.solution.file.split('/')
      setFileName(arr[arr.length - 1])
    }
  }, [task])

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
        className={`modal fade ${viewActive ? 'show' : ''}`}
        style={{ display: viewActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Решение {task.name}</h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={() => setViewActive(false)}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <div className="solution-body-wrapper">
                <div className="solution-wrapper">
                  <div className="solution-text">
                    <h5>
                      Решение:
                    </h5>
                    <p>
                      {task && task.solution && task.solution.description}
                    </p>
                  </div>
                  {task && task.solution && task.solution.file && (<div className="solution-file">
                    <h5>
                      Скачать файл с решением:
                    </h5>
                    <a href={task.file}>{fileName}</a>
                  </div>)}
                </div>
                <div className="mark-wrapper">
                  <h5>Оценка:</h5>
                  <input type="number" disabled value={task && task.solution && task.solution.mark}/>
                  <h5>баллов</h5>
                </div>
              </div>

            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-default'
                onClick={() => setViewActive(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {task && task.solution && (
        <div
          className='view-solution'
          data-toggle='modal'
          onClick={() => setViewActive(true)}
        >
          Просмотр решения
        </div>
      )}

      {task && !task.solution && (
        <div
          className='add-solution'
          data-toggle='modal'
          onClick={() => setActive(true)}
        >
          Добавить решение
        </div>
      )}

    </>
  )
}


export default connect(null, {
  add_solution,
})(AddSolution)
