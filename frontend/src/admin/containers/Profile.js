import React, { Fragment, useEffect, useState } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import {
  load_user,
  update_user,
  reset_password,
} from '../../redux/actions/auth/auth'
import { Redirect } from 'react-router-dom'
import dummy_avatar from '../../assets/man.svg'

const Profile = ({
  load_user,
  update_user,
  user,
  isAuthenticated,
  reset_password,
  status,
  ...props
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [sex, setSex] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [avatar, setAvatar] = useState('')
  // const [avatar, setAvatar] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [short_position, setShort_position] = useState('')
  const [full_position, setFull_position] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [on_site, setOn_site] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [passChange, setPassChange] = useState(false)
  const [statusData, setStatusData] = useState(false)

  useEffect(() => {
    if(status >= 200 && status < 300) {
      setStatusData(true)
    }
  }, [status])

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
      setCompany(user.company)
      setPosition(user.position)
      setShort_position(user.short_position)
      setFull_position(user.full_position)
      setDescription(user.description)
      setLink(user.link)
      setOn_site(user.on_site)
    }
  }, [user])

  const handleSex = (e) => {
      setSex(e.target.value)
  }

  const handleUserUpdate = () => {
    setDisabled(true)
    let data = {
      name: name,
      email: email,
      birthday: birthday,
      sex: sex,
      phone: phone,
      adress: adress,
    }
    data = avatar ? { avatar: avatar, ...data } : data
    data = company ? { company: company, ...data } : data
    data = position ? { position: position, ...data } : data
    data = short_position ? { short_position: short_position, ...data } : data
    data = full_position ? { full_position: full_position, ...data } : data
    data = description ? { description: description, ...data } : data
    data = link ? { link: link, ...data } : data
    data = on_site ? { on_site: on_site, ...data } : data
    update_user(data)
  }

  const handleDisabled = () => {
    if (passChange) {
      setPassChange(false)
      setDisabled(true)
    } else {
      setDisabled(!disabled)
    }
  }
  const ModalHandler = () => {
    setPassChange(false)
    setDisabled(true)
    setStatusData(false)
  }
  const handlePassChange = () => {
    reset_password(email)
    if (status >= 200 && status < 300) {
      setStatusData(true)
    }
  }

  return (
    <Fragment>
      <div
        className={`modal fade ${statusData ? 'show' : ''}`}
        style={{ display: statusData ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Смена пароля</h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={() => setStatusData(false)}
              >
                &times;
              </button>
            </div>
            <div className='modal-body height-auto'>
              <p className='text-success'>
                Вы успешно инициировали смену пароля! В течение нескольких минут
                Вам на почту поступит письмо с дальнейшими инструкциями.
              </p>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-default' onClick={ModalHandler}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 container-fluid st-details'>
        <h2 className='text-center mb-5'>
          {passChange ? 'Сменить пароль' : 'Персональная информация'}
        </h2>
        <div className='row'>
          <div className='col-xl-3 mb-5'>
            <div className='mx-auto st-details-avatar-wraper'>
              <img
                src={`${user && user.avatar ? user.avatar : dummy_avatar}`}
                className='w-100'
                alt=''
              />
            </div>
            {!disabled && (
              <div className='custom-file mt-3 mx-auto st-details-avatar-input-wraper'>
                <input
                  name='avatar'
                  type='file'
                  className='custom-file-input'
                  id='inputGroupFile01'
                  onChange={e => setAvatar(e.target.files[0])}
                />
                <label className='custom-file-label' for='inputGroupFile01'>
                  выбрать фото
                </label>
              </div>
            )}
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
            <div className='flex-column justify-content-center  d-xl-flex d-none'>
              {!passChange && (
                <button
                  type='button'
                  className={`btn my-3 ${
                    disabled ? 'btn-primary' : 'btn-danger'
                  }`}
                  onClick={() => handleDisabled()}
                >
                  {disabled ? 'Редактировать' : 'Отменить'}
                </button>
              )}

              {!disabled && (
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={() => handleUserUpdate()}
                >
                  Сохранить
                </button>
              )}
              {disabled && (
                <button
                  type='button'
                  onClick={() => setPassChange(!passChange)}
                  className={`btn my-3 ${
                    passChange ? 'btn-danger' : 'btn-info'
                  }`}
                >
                  {!passChange ? 'Смена пароля' : 'Отменить'}
                </button>
              )}
              {passChange && (
                <button
                  type='button'
                  className='btn btn-info'
                  onClick={handlePassChange}
                >
                  Сменить
                </button>
              )}
            </div>
          </div>

          {!passChange && (
            <Fragment>
              <div className='col-xl-9 row'>
                <div className='form-group px-3'>
                  <label for='exampleInputEmail1'>Email</label>
                  <input
                    disabled
                    name='email'
                    type='email'
                    value={email ? email : 'Ваш email'}
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
                    value={name ? name : 'Ваше имя'}
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
                    value={phone}
                    aria-describedby='phoneHelp'
                    placeholder='+70000000000'
                    onChange={e => setPhone(e.target.value)}
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
                    aria-describedby='birthdateHelp'
                    onChange={e => setBirthday(e.target.value)}
                    placeholder=''
                  />
                  {/* <small id='birthdateHelp' className='form-text text-danger'></small> */}
                </div>
                <div className='form-group px-3'>
                  <label>Пол</label>
                  {user && user.sex}
                  {!disabled && (
                    <select
                      name='sex'
                      className='form-control'
                      value={sex}
                      onChange={handleSex}
                    >
                      <option value='male'>Мужчина</option>
                      <option value='female'>Женщина</option>
                    </select>
                  )}
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
              </div>

              {user && user.is_student && (
                <Fragment>
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
                      onChange={e => setCompany(e.target.value)}
                    />
                    {/* <small id='companyHelp' className='form-text text-danger'>
              Error message.
            </small> */}
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
                      onChange={e => setPosition(e.target.value)}
                    />
                    {/* <small id='positionHelp' className='form-text text-danger'>
              Error message.
            </small> */}
                  </div>
                </Fragment>
              )}

              {user && user.is_teacher && (
                <Fragment>
                  <div className='form-group px-3 st-details-input-wraper__min-width-320'>
                    <label for='inputShortPosition'>Должность кратко</label>
                    <input
                      disabled={disabled}
                      name='short_position'
                      type='text'
                      className='form-control'
                      id='inputShortPosition'
                      aria-describedby='shortPositionHelp'
                      placeholder='Краткое название должности'
                      onChange={e => setShort_position(e.target.value)}
                    />
                    {/* <small id='shortPositionHelp' className='form-text text-danger'>
            Error message.
          </small> */}
                  </div>
                  <div className='form-group px-3 st-details-input-wraper__min-width-320'>
                    <label for='inputFullPosition'>Должность</label>
                    <input
                      disabled={disabled}
                      name='full_position'
                      type='text'
                      className='form-control'
                      id='inputFullPosition'
                      aria-describedby='fullPositionHelp'
                      placeholder='Полное название должности'
                      onChange={e => setFull_position(e.target.value)}
                    />
                    {/* <small id='fullPositionHelp' className='form-text text-danger'>
            Error message.
          </small> */}
                  </div>
                  <div className='form-group px-3 st-details-input-wraper__min-width-320'>
                    <label for='inputLink'>Персональная страница</label>
                    <input
                      disabled={disabled}
                      name='link'
                      type='text'
                      className='form-control'
                      id='inputLink'
                      aria-describedby='linkHelp'
                      placeholder='Ссылка на персональный сайт'
                      onChange={e => setDescription(e.target.value)}
                    />
                    {/* <small id='linkHelp' className='form-text text-danger'>
            Error message.
          </small> */}
                  </div>
                  <div className='form-group px-3 w-100'>
                    <label for='descriptionTextarea'>Описание</label>
                    <textarea
                      disabled={disabled}
                      className='form-control'
                      id='exampleFormControlTextarea1'
                      rows='3'
                      onChange={e => setLink(e.target.value)}
                    ></textarea>
                  </div>
                  {!disabled && (
                    <div className='px-3'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          checked={on_site}
                          id='onSiteCheck'
                          onChange={e => setOn_site(e.target.checked)}
                        />
                        <label className='form-check-label' for='onSiteCheck'>
                          Показывать на сайте
                        </label>
                      </div>
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}

          {passChange && (
            <div className='col-xl-9 row'>
              <div className='mx-auto'>
                <div className='my-5'>
                  <div className='row justify-content-center'>
                    <h5>
                      <center>
                        После нажатия "Сменить", Вам на почту будет отправлена
                        ссылка на страницу смены/восстановления пароля
                      </center>
                    </h5>
                    <div className='form-group px-3'>
                      {!email && <label for='exampleInputEmail1'>Email</label>}
                      <input
                        disabled={email}
                        value={email ? email : 'Ваш email'}
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='введите email'
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='row justify-content-center mx-auto d-xl-none'>
          {!passChange && (
            <button
              type='button'
              className={`btn my-5 ${disabled ? 'btn-primary' : 'btn-danger'}`}
              onClick={() => setDisabled(!disabled)}
            >
              {disabled ? 'Редактировать' : 'Отменить'}
            </button>
          )}

          {!disabled && (
            <button
              type='button'
              className='btn btn-info my-5 ml-5'
              onClick={() => handleUserUpdate()}
            >
              Сохранить
            </button>
          )}
          {disabled && (
            <button
              type='button'
              onClick={() => setPassChange(!passChange)}
              className={`btn my-5 ${passChange ? 'btn-danger' : 'btn-info'}`}
            >
              {!passChange ? 'Смена пароля' : 'Отменить'}
            </button>
          )}
          {passChange && (
            <button
              type='button'
              className='btn btn-info my-5 ml-5'
              onClick={() => handlePassChange()}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  status: state.auth.status,
})

export default connect(mapStateToProps, {
  load_user,
  update_user,
  reset_password,
})(Profile)
