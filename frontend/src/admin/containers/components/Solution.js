import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {add_mark} from "../../../redux/actions/admin/tasks";

const Solution = ({student_name, student_id, task_name, task_id, solution, add_mark}) => {
  const [active, setActive] = useState(false)
  const [fileName, setFileName] = useState('')
  const [mark, setMark] = useState('')

  const {file} = solution

  useEffect(() => {
    if(solution.mark) {
      setMark(solution.mark)
    }
  }, [solution])

  useEffect(() => {
    if (file) {
      let arr = file.split('/')
      setFileName(arr[arr.length - 1])
    }
  }, [file])

  const handleShow = () => {
    setActive(true)
  }

  const handleMark = () => {
    let data = {id: solution.id, mark: mark, student_id: student_id, task_id: task_id}
    add_mark(data)
    setActive(false)
  }

  const handleMarkChange = e => {
    setMark(e.target.value)
  }

  const handleClose = () => {
    setActive(false)
  }



  return (

    <>
      <div
        className={`modal fade ${active ? 'show' : ''}`}
        style={{ display: active ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Решение {task_name}</h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={handleClose}
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
                      {solution.description}
                    </p>
                  </div>
                  {file && (<div className="solution-file">
                    <h5>
                      Скачать файл с решением:
                    </h5>
                    <a href={file}>{fileName}</a>
                  </div>)}
                </div>
                <div className="mark-wrapper">
                  <h5>Оценить решение:</h5>
                  <input type="number" onChange={handleMarkChange} value={mark}/>
                  <h5>баллов</h5>
                </div>
              </div>

            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-default'
                onClick={handleMark}
              >
                Сохранить
              </button>
              <button className='btn btn-danger' onClick={handleClose}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>


      <div onClick={handleShow} className={solution.mark ? 'student-item-green' : 'student-item-red'} style={{cursor: 'pointer'}}>
        {student_name}
      </div>
    </>
  )
}

export default connect(null, {add_mark})(Solution)
