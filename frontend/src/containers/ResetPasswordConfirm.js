import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password_confirm } from '../redux/actions/auth/auth'
import logo from '../assets/logo-big.svg'

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  })

  const { new_password, re_new_password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    const uid = match.params.uid
    const token = match.params.token

    reset_password_confirm(uid, token, new_password, re_new_password)
    setRequestSent(true)
  }

  if (requestSent) {
    return <Redirect to='/login' />
  }

  // if (cancelRequest) {
  //   return <Redirect to='/login' />
  // }
  
  const cancelHandler = () => {
    setRequestSent(true)
  }

  return (
    <div className='container'>
      <div className='my-5 d-flex'>
        <div>
          <Link to='/'>
            <img src={logo} alt='' height='40' />
          </Link>
        </div>
        <div className='ml-5'>
          <h2>ИДАБ: смена пароля</h2>
        </div>
      </div>
      <div style={{ maxWidth: 600 }} className='mx-auto px-2'>
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='Новый пароль'
              name='new_password'
              value={new_password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='Подтвердите новый пароль'
              name='re_new_password'
              value={re_new_password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className='d-flex flex-column'>
            <button className='btn btn-primary mx-0' type='submit'>
              Обновить пароль
            </button>
            <button
              className='btn btn-danger mx-0'
              type='button'
              onClick={cancelHandler}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)
