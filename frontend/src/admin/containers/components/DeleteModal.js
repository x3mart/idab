import React, {useState} from "react";

const DeleteModal = ({name, action}) => {

  const [active, setActive] = useState(false)

  const handleOpen = () => {
    setActive(true)
  }

  const handleClose = () => {
    setActive(false)
  }

  const handleDelete = () => {
    setActive(false)
    action()
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
              <h4 className='modal-title'>Удалить {name}</h4>
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
              <p>Вы уверены, что хотите удалить эти записи?</p>
              <p className='text-warning'>
                <small>Это действие нельзя отменить!</small>
              </p>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-default'
                onClick={handleClose}
              >
                Отменить
              </button>
              <button className='btn btn-danger' onClick={() => handleDelete()}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <a
        className='delete'
        data-toggle='modal'
        onClick={handleOpen}
      >
        <i
          className='material-icons'
          data-toggle='tooltip'
          title='Delete'
        >
          &#xE872;
        </i>
      </a>
    </>
  )
}

export default DeleteModal
