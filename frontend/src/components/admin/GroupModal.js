import React, { Fragment, useEffect, useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { isNotEmptyObject } from '../../functions'

const ProgramModal = ({ data, handleData, closeModal, base, action }) => {
  
  const [groupId, setGroupId] = useState(null)
  const [baseGroupId, setBaseGroupId] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    if (action === 'update') {
      setGroupId(data.id)
      setBaseGroupId(data.basic)
      setStartDate(data.start_date)
      setEndDate(data.graduation_date)
    } else {
      setBaseGroupId(base.id)
    }
  }, [])

  // useEffect(() => {
  //   setDataType(type)
  // }, [])


  const handleForm = e => {
    e.preventDefault()
    let content = {
      basic: baseGroupId,
      start_date: startDate,
      graduation_date: endDate,
    }
    
    handleData(content)
  }

  return (
    <Fragment>
      <div className='modal fade show d-block'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleForm(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>
                  {`${groupId ? 'Обновить' : 'Добавить'} группу`}
                </h4>
                <button
                  type='button'
                  className='close'
                  onClick={() => closeModal()}
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='custom-modal-form'>
                  <div className='form-group'>
                    <label>
                      Дата начала обучения
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      value={startDate}
                      required
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Дата окончания обучения
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      value={endDate}
                      required
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={() => closeModal()}
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
    </Fragment>
  )
}

export default ProgramModal
