import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../Students.css'
import '../../hocs/AdminLayout.scss'

import { Redirect } from 'react-router-dom'
import {
  load_specialities,
  load_programs,
  load_groups,
  add_student,
} from '../../../redux/actions/admin/students'

import {
  load_basic_groups_list,
  load_groups_list,
} from '../../../redux/actions/admin/groups'

import { load_user } from '../../../redux/actions/auth/auth'
import { isNotEmptyObject, proper_date } from '../../../functions'
import { MDBSpinner } from 'mdbreact'

const AddStudent = ({
  specialities,
  load_specialities,
  load_programs,
  programs,
  load_groups,
  groups,
  add_student,
  load_basic_groups_list,
  load_groups_list,
  basic_groups_list,
  groups_list,
}) => {

  const [specialitiesList, setSpecialitiesList] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  
  const [selectedSpeciality, setSelectedSpeciality] = useState('')
  const [groupsList, setGroupsList] = useState([])
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [studentMail, setStudentMail] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [addActive, setAddActive] = useState(false)

  

  useEffect(() => {
    load_specialities()
    load_basic_groups_list()
    load_groups_list()
  }, [])

  useEffect(() => {
    setSpecialitiesList(specialities)
  }, [specialities])

  useEffect(() => {
    setProgramsList(programs)
  }, [programs])

  useEffect(() => {
    setGroupsList(groups)
  }, [groups])

  useEffect(() => {
    if (selectedSpeciality) {
      load_programs(selectedSpeciality)
    }
  }, [selectedSpeciality])

  useEffect(() => {
    if (selectedProgram) {
      load_groups(selectedProgram)
    }
  }, [selectedProgram])

  const handleSpecialitiesSelect = e => {
    setSelectedSpeciality(e.target.value)
  }

  const handleProgramsSelect = e => {
    setSelectedProgram(e.target.value)
  }

  const handleGroupSelect = e => {
    setSelectedGroup(e.target.value)
  }

  const studentAdd = e => {
    e.preventDefault()
    let student = {
      name: studentName,
      email: studentMail,
      phone: studentPhone,
      training_group: selectedGroup,
    }
    add_student(student)
    setAddActive(false)
    setSelectedSpeciality('')
    setSelectedProgram('')
    setSelectedGroup(null)
    setStudentName('')
    setStudentMail('')
    setStudentPhone('')
  }

  const handleCancelAdd = () => {
    setAddActive(false)
    setSelectedSpeciality('')
    setSelectedProgram('')
    setSelectedGroup(null)
    setStudentName('')
    setStudentMail('')
    setStudentPhone('')
  }

  return (
    <Fragment>
      <div
        className={`modal fade ${addActive ? 'show' : ''}`}
        style={{ display: addActive ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <form onSubmit={e => studentAdd(e)}>
              <div className='modal-header' style={{ color: '#7099AD' }}>
                <h4 className='modal-title'>Добавить слушателя</h4>
                <button
                  type='button'
                  className='close'
                  onClick={() => setAddActive(false)}
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body' style={{ color: '#7099AD' }}>
                <div className='custom-modal-form'>
                  <div className='form-group'>
                    <select
                      className='form-select'
                      aria-label='Выберите программу'
                      onChange={event => handleSpecialitiesSelect(event)}
                    >
                      <option selected>Выберите программу</option>

                      {specialitiesList &&
                        specialitiesList.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {selectedSpeciality.length > 0 && (
                    <div className='form-group'>
                      <select
                        className='form-select'
                        aria-label='Выберите группу'
                        onChange={event => handleProgramsSelect(event)}
                      >
                        <option selected>Выберите группу</option>
                        {basic_groups_list &&
                          basic_groups_list
                            .filter(item => item.category == selectedSpeciality)
                            .map(item => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                      </select>
                    </div>
                  )}

                  {selectedProgram.length > 0 && (
                    <div className='form-group'>
                      <select
                        className='form-select'
                        aria-label='Выберите поток'
                        onChange={event => handleGroupSelect(event)}
                      >
                        <option selected>Выберите поток</option>
                        {groups_list &&
                          groups_list
                            .filter(item => item.basic == selectedProgram)
                            .map(item => (
                              <option key={item.id} value={item.id}>
                                {`${proper_date(item.start_date)}-${proper_date(
                                  item.graduation_date
                                )}`}
                              </option>
                            ))}
                      </select>
                    </div>
                  )}
                  <div className='form-group'>
                    <label>Фамилия Имя Отчество</label>
                    <input
                      type='text'
                      className='form-control'
                      value={studentName}
                      required
                      onChange={e => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Телефон</label>
                    <input
                      type='phone'
                      className='form-control'
                      value={studentPhone}
                      required
                      onChange={e => setStudentPhone(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      value={studentMail}
                      required
                      onChange={e => setStudentMail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-default'
                  value='Отменить'
                  onClick={() => handleCancelAdd()}
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

      <button className='btn btn-success' onClick={() => setAddActive(true)}>
        <i className='material-icons'>&#xE147;</i>{' '}
        <span>Добавить слушателя</span>
      </button>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  specialities: state.students.specialities,
  programs: state.students.programs,
  groups: state.students.groups,
  basic_groups_list: state.groups.basic_groups,
  groups_list: state.groups.groups,
})

export default connect(mapStateToProps, {
  load_specialities,
  load_programs,
  load_groups,
  add_student,
  load_basic_groups_list,
  load_groups_list,
})(AddStudent)
