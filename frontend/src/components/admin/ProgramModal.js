import React, { Fragment, useEffect, useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { isNotEmptyObject } from '../../functions'

const ProgramModal = ({ data, handleData, closeModal, type }) => {
  
  const [programId, setProgramId] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [programName, setProgramName] = useState('')
  const [programShortDescription, setProgramShortDescription] = useState('')
  const [programFullDescription, setProgramFullDescription] = useState('')
  const [programIsActive, setProgramIsActive] = useState(true)
  const [programImage, setProgramImage] = useState(null)
  const [programNewImage, setProgramNewImage] = useState(null)
  const [dataType, setDataType] = useState('')

  useEffect(() => {
    if (data.id) {
      setProgramId(data.id)
      setProgramName(data.name)
      setProgramShortDescription(data.short_description)
      setProgramFullDescription(data.full_description)
      setProgramIsActive(data.is_active)
      setProgramImage(data.image)
    } else if (data.category_id) {
      setCategoryId(data.category_id)
    }
  }, [])

  useEffect(() => {
    setDataType(type)
  }, [])


  const handleForm = e => {
    e.preventDefault()
    let content = {
      name: programName,
      short_description: programShortDescription,
      full_description: programFullDescription,
      is_active: programIsActive,
    }
    content = programId ? {id: programId, ...content} : content
    content = categoryId ? { category: categoryId, ...content } : content
    content = programNewImage ? { image: programNewImage, ...content } : content
    
    handleData(content, dataType)
  }

  return (
    <Fragment>
      <div className='modal fade show d-block'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => handleForm(e)}>
              <div className='modal-header'>
                <h4 className='modal-title'>
                  {`${programId ? 'Обновить' : 'Добавить'} ${
                    dataType === 'программа' ? 'программу' : 'специализацию'
                  }`}
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
                      {`Название ${
                        dataType === 'программа' ? 'программы' : 'специализации'
                      }`}
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      value={programName}
                      required
                      onChange={e => setProgramName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Изображение</label>
                    {programImage && (
                      <p>
                        <img src={programImage} alt='' width='100' /> Текущее
                        изображение
                      </p>
                    )}
                    <input
                      type='file'
                      id='image'
                      accept='image/png, image/jpeg'
                      onChange={e => setProgramNewImage(e.target.files[0])}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      {`Короткое описание ${
                        dataType === 'программа' ? 'программы' : 'специализации'
                      }`}
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      value={programShortDescription}
                      required
                      onChange={e => setProgramShortDescription(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>{`Полное описание ${
                      dataType === 'программа' ? 'программы' : 'специализации'
                    }`}</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={programFullDescription}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setProgramFullDescription(data)
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <div class='form-check'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        id='flexCheckDefault3'
                        checked={programIsActive}
                        onChange={e => setProgramIsActive(e.target.checked)}
                      />
                      <label class='form-check-label' for='flexCheckDefault3'>
                        {`Активная ${dataType}`}
                      </label>
                    </div>
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
