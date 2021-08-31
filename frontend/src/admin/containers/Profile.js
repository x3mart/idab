import React, { Fragment, useEffect, useState } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import { load_user, update_user } from '../../redux/actions/auth/auth'
import { Redirect } from 'react-router-dom'
import dummy_avatar from '../../assets/man.svg'

const Profile = ({ load_user, update_user, user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  name, email, birthday, sex, phone, adress, avatar

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [sex, setSex] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarNew, setAvatarNew] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    load_user()
  }, [])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setBirthday(user.birthday)
      setSex(user.sex)
      setPhone(user.phone)
      setAdress(user.adress)
      setAvatar(user.avatar)
    }
  }, [user])

  const handleSubmit = () => {
    let data = {
      name: name,
      email: email,
      birthday: birthday,
      sex: sex,
      phone: phone,
      adress: adress,
    }
    data = avatarNew ? { avatar: avatarNew, ...data } : data

    update_user(data)
  }

  return (
    <div className='mt-5 container-fluid st-details'>
      <h2 className='text-center mb-5'>Персональная информация</h2>
      <form className='row' onSubmit={() => handleSubmit()}>
        <div className='col-xl-3 mb-5'>
          <div className='mx-auto st-details-avatar-wraper'>
            <img
              src={`${avatar ? avatar : dummy_avatar}`}
              className='w-100'
              alt=''
            />
          </div>
          <div className='custom-file mt-3 mx-auto st-details-avatar-input-wraper'>
            <input
              name='avatar'
              type='file'
              className='custom-file-input'
              id='inputGroupFile01'
              onChange={e => setAvatarNew(e.target.files[0])}
            />
            <label className='custom-file-label' for='inputGroupFile01'>
              выбрать фото
            </label>
          </div>
          {user && user.is_student && (
            <Fragment>
              <div className='text-center mt-3'>
                <strong>Курс:</strong> MBA-Финансы
              </div>
              <div className='text-center mt-3'>
                <strong>Группа:</strong> MBA-Финансы-1
              </div>
            </Fragment>
          )}
        </div>
        <div className='col-xl-9 row'>
          <div className='form-group px-3'>
            <label for='exampleInputEmail1'>Email</label>
            <input
              disabled={disabled}
              name='email'
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='введите email'
              onChange={e => setEmail(e.target.value)}
            />
            {/* <small id='emailHelp' className='form-text text-danger'>
              Такой email уже существует
            </small> */}
          </div>
          <div className='form-group px-3 st-details-input-wraper__min-width-320'>
            <label for='inputName'>Полное имя</label>
            <input
              disabled={disabled}
              name='name'
              type='text'
              className='form-control'
              id='inputName'
              aria-describedby='namelHelp'
              placeholder='Ваше имя'
              onChange={e => setName(e.target.value)}
            />
            {/* <small id='nameHelp' className='form-text text-danger'>
              Какаято ошибка с именем
            </small> */}
          </div>
          <div className='form-group px-3'>
            <label for='exampleInputPhone'>Телефон</label>
            <input
              disabled={disabled}
              name='phone'
              type='text'
              className='form-control'
              id='exampleInputPhone'
              aria-describedby='phoneHelp'
              placeholder='+70000000000'
              onChange={e => setphone(e.target.value)}
            />
            {/* <small id='phoneHelp' className='form-text text-danger'>
              Не верный формат телефона
            </small> */}
          </div>
          <div className='form-group px-3'>
            <label for='exampleInputBirthdate'>Дата рождения</label>
            <input
              disabled={disabled}
              name='birthday'
              type='date'
              className='form-control'
              id='exampleInputBirthdate'
              aria-describedby='birthdateHelp'
              onChange={e => setBirthday(e.target.value)}
              placeholder=''
            />
            {/* <small id='birthdateHelp' className='form-text text-danger'></small> */}
          </div>
          <div className='form-group px-3'>
            <label for='exampleInputEmail1'>Пол</label>
            <select
              disabled={disabled}
              name='sex'
              className='form-control'
              onChange={e => setEmail(e.target.name)}
            >
              <option value='male'>Мужчина</option>
              <option value='female'>Женщина</option>
            </select>
            {/* <small className='form-text text-muted'></small> */}
          </div>
          <div className='form-group px-3 w-75'>
            <label for='exampleInputAdress'>Адрес</label>
            <input
              disabled={disabled}
              name='adress'
              type='text'
              className='form-control'
              id='exampleInputAdress'
              aria-describedby='adresslHelp'
              placeholder='Ваш адрес'
              onChange={e => setAdress(e.target.value)}
            />
            {/* <small id='adresslHelp' className='form-text text-danger'>
              Error message.
            </small> */}
          </div>
          <div className='form-group px-3 st-details-input-wraper__min-width-320'>
            <label for='exampleInputCompany'>Место работы</label>
            <input
              disabled={disabled}
              name='company'
              type='text'
              className='form-control'
              id='exampleInputCompany'
              aria-describedby='companyHelp'
              placeholder='Компания'
            />
            <small id='companyHelp' className='form-text text-danger'>
              Error message.
            </small>
          </div>
          <div className='form-group px-3 st-details-input-wraper__min-width-320'>
            <label for='exampleInputPosition'>Должность</label>
            <input
              disabled={disabled}
              name='position'
              type='text'
              className='form-control'
              id='exampleInputPosition'
              aria-describedby='positionHelp'
              placeholder='Должность'
            />
            <small id='positionHelp' className='form-text text-danger'>
              Error message.
            </small>
          </div>
        </div>
        <div className='row justify-content-center mx-auto'>
          <button
            type='button'
            className='btn btn-primary my-5'
            onClick={() => setDisabled(!disabled)}
          >
            Редактировать
          </button>
          <button type='submit' className='btn btn-info my-5 ml-5'>
            Сохранить
          </button>
        </div>
      </form>
      <hr />

      <div>
        <h2 className='text-center mt-5'>Сменить пароль</h2>
        <form className='my-5'>
          <div className='row justify-content-center'>
            <div className='form-group px-3'>
              <label for='exampleInputCurentPassword'>Текущий пароль</label>
              <input
                required
                name='current_password'
                type='password'
                className='form-control'
                id='exampleInputCurentPassword'
                aria-describedby='currentPassworddHelp'
                placeholder='Password'
              />
              <small
                id='currentPassworddHelp'
                className='form-text text-danger'
              >
                Error message.
              </small>
            </div>
            <div className='form-group px-3'>
              <label for='exampleInputNewPassword'>Новый пароль</label>
              <input
                required
                name='new_password'
                type='password'
                className='form-control'
                id='exampleInputNewPassword'
                aria-describedby='newPasswordHelp'
                placeholder='Password'
              />
              <small id='newPasswordHelp' className='form-text text-danger'>
                Error message.
              </small>
            </div>
            <div className='form-group px-3'>
              <label for='exampleInputReNewPassword'>
                Новый пароль еще раз
              </label>
              <input
                required
                name='re_new_password'
                type='password'
                className='form-control'
                id='exampleInputReNewPassword'
                aria-describedby='reNewPasswordHelp'
                placeholder='Password'
              />
              <small id='reNewPasswordHelp' className='form-text text-danger'>
                Error message.
              </small>
            </div>
          </div>
          <button type='submit' className='btn btn-info my-5 mx-auto d-block'>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { load_user, update_user })(Profile)
