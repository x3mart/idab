import React, { Fragment, useEffect, useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { isNotEmptyObject } from '../../functions'

const DeleteModal = ({ id, type, handleDelete, closeDelete, name }) => {

  const handleAction = () => {
    handleDelete(id, type)
  }

  return (
    <Fragment>
      <div className='modal fade show d-block'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>
                {name
                  ? name
                  : `Удаление ${
                      type === 'программа' ? 'программы' : 'специализации'
                    }`}
              </h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={() => closeDelete()}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <p>Вы уверены, что хотите удалить эти записи?</p>
              <p className='text-warning'>
                <small>Это действие нельзя отменить!</small>
              </p>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-default' onClick={() => closeDelete()}>
                Отменить
              </button>
              <button className='btn btn-danger' onClick={() => handleAction()}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DeleteModal
