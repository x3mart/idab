import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { load_user } from '../../redux/actions/auth/auth'
import { Redirect } from 'react-router-dom'
// import Scheduler from './components/Scheduler'
import { load_groups_list } from '../../redux/actions/admin/groups'
import {
  load_schedule,
  update_attendance,
} from '../../redux/actions/admin/schedule'
import { MDBNav, MDBNavItem, MDBNavLink, MDBSpinner } from 'mdbreact'
import { get_all_students } from '../../redux/actions/admin/students'
import moment from 'moment'
moment.locale('ru')

var fileDownload = require('js-file-download')

const Admittance = ({
  isAuthenticated,
  user,
  load_user,
  load_groups_list,
  groups_list,
  load_schedule,
  schedule_list,
  get_all_students,
  students,
  update_attendance,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  const [downloaded, setDownloaded] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const getProperDate = date => {
    return moment(new Date(date)).format('DD.MM.YYYY')
  }

  useEffect(() => {
    load_groups_list()
    load_schedule()
    get_all_students()
  }, [])

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])

  useEffect(() => {
    {
      let timer = setTimeout(
        () =>
          setBasicGroupsData({ loaded: false, pending: false, error: true }),
        10000
      )
      if (Array.isArray(groups_list) && groups_list.length > 0) {
        setBasicGroupsList(
          groups_list.sort(function (a, b) {
            return a.id - b.id
          })
        )
        if (Array.isArray(schedule_list) && schedule_list.length > 0) {
          setScheduleItems(schedule_list)
        }

        setBasicGroupsData({ loaded: true, pending: false, error: false })
        clearTimeout(timer)
      }
      return () => {
        clearTimeout(timer)
      }
    }
  }, [groups_list, basicGroupsList, schedule_list])

  useEffect(() => {
    if (Array.isArray(schedule_list) && schedule_list.length > 0) {
      setScheduleItems(schedule_list)
    }
    
  }, [schedule_list])


  const [basicGroupsList, setBasicGroupsList] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [scheduleItems, setScheduleItems] = useState([])
  
  const [activeStudents, setActiveStudents] = useState([])

  const toggle = tab => e => {
    if (activeItem !== tab) {
      setActiveItem(tab)
      setData(scheduleItems.filter(item => item.training_group == tab))
      setActiveStudents(
        students.filter(item =>
          item.training_group.some(group => group.id == tab)
        )
      )
    }
  }

  const [basicGroupsData, setBasicGroupsData] = useState({
    loaded: false,
    pending: true,
    error: false,
  })

  const handleReload = () => {
    setBasicGroupsData({ loaded: false, pending: true, error: false })
    window.location.reload(true)
  }

  const [data, setData] = useState([])

  useEffect(() => {
    if (scheduleItems.length > 0) {
      let today = Date.now()
      setData(
        scheduleItems.filter(
          item =>
            item.training_group == activeItem &&
            Date.parse(item.start_date) < today
        )
      )
    }
  }, [scheduleItems, activeItem])


  const handleUpdateAttendance = (student_id, schedule_id, bool) => {
    setButtonDisabled(true)

    setTimeout(() => setButtonDisabled(false), 1000)

    let obj = { schedule: schedule_id, attendance: !bool }
    update_attendance(student_id, obj)
    // load_schedule()
    
  }

  const handleDownload = () => {

    setActiveItem(groups_list[0].id)
    
    setData(
      schedule_list.filter(item => item.training_group == groups_list[0].id)
    )

    setActiveStudents(
      students.filter(item =>
        item.training_group.some(group => group.id == groups_list[0].id)
      )
    )
    setDownloaded(true)
  }

  const handleDownloadXml = async () => {
    const config = {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    }
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/export/xls/`,
      config
    )

    fileDownload(res.data, 'attendance.xls')
  }

  return (
    <div className='main-body__users'>
      <div className='cards dx-viewport'>
        <div className='cards__header table-title'>
          <div className='cards__header-title admin-text-light'>
            Контроль <strong>присутствия</strong>
          </div>
          <div
            className='pr-2'
            onClick={handleDownloadXml}
            style={{ cursor: 'pointer' }}
          >
            <i className='fas fa-cloud-download-alt pr-2'></i>Скачать
          </div>
        </div>

        {basicGroupsData.pending && (
          <div className='w-100 h-50 d-flex justify-content-center align-items-center my-5'>
            <MDBSpinner big />
          </div>
        )}

        {basicGroupsData.error && (
          <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center my-5'>
            <h2>Что-то пошло не так</h2>
            <h4>Попробуйте обновить страницу</h4>
            <button
              className='btn btn-outline-blue-grey'
              type='button'
              onClick={() => handleReload()}
            >
              Обновить
            </button>
          </div>
        )}

        {!downloaded && basicGroupsData.loaded && (
          <div className='w-100 h-50 d-flex flex-column justify-content-center align-items-center my-5'>
            <button
              className='btn btn-outline-blue-grey'
              type='button'
              onClick={() => handleDownload()}
            >
              Загрузить информацию
            </button>
          </div>
        )}
        {downloaded && basicGroupsData.loaded && (
          <>
            <MDBNav className='nav-tabs mt-5'>
              {basicGroupsList.length > 0 &&
                basicGroupsList.map(item => (
                  <MDBNavItem key={item.id}>
                    <MDBNavLink
                      to='#'
                      link
                      active={activeItem === item.id}
                      onClick={toggle(item.id)}
                      role='tab'
                    >
                      {item.name}
                    </MDBNavLink>
                  </MDBNavItem>
                ))}
            </MDBNav>

            <div className='cards'>
              <div id='table-scroll' className='table-scroll'>
                <div className='table-wrap'>
                  <table className='main-table'>
                    <thead className=''>
                      <tr>
                        <th className='fixed-side'></th>
                        {data &&
                          data.map(item => (
                            <th key={item.id}>
                              {/* <div>{item.start_date}</div> */}
                              <div>{getProperDate(item.start_date)}</div>
                              <div>{item.course}</div>
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeStudents &&
                        activeStudents.map(item => (
                          <tr key={item.id}>
                            <td className='fixed-side'>{item.name}</td>
                            {data &&
                              data.map(event => (
                                <td key={event.id}>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                      handleUpdateAttendance(
                                        item.id,
                                        event.id,
                                        event.visited_students.includes(item.id)
                                      )
                                    }
                                    className={`far fa-${
                                      event.visited_students.includes(item.id)
                                        ? 'check-circle text-success'
                                        : 'times-circle text-danger'
                                    } ${
                                      buttonDisabled ? 'button-disabled' : ''
                                    }`}
                                  ></i>
                                </td>
                              ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <table className='main-table clone'>
                  <thead>
                    <tr>
                      <th className='fixed-side'></th>
                      {data &&
                        data.map(item => (
                          <th key={item.id}>
                            {/* <div>{item.start_date}</div> */}
                            <div>{getProperDate(item.start_date)}</div>
                            <div>{item.course}</div>
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeStudents &&
                      activeStudents.map(item => (
                        <tr>
                          <td className='fixed-side'>{item.name}</td>
                          {/* {data &&
                            data.map(event => (
                              <td
                                onClick={() =>
                                  handleUpdateAttendance(
                                    item.id,
                                    event.id,
                                    event.visited_students.includes(item.id)
                                  )
                                }
                              >
                                <i
                                  className={`far fa-${
                                    event.visited_students.includes(item.id)
                                      ? 'check-circle text-success'
                                      : 'times-circle text-danger'
                                  }`}
                                ></i>
                              </td>
                            ))} */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  groups_list: state.groups.groups,
  schedule_list: state.schedule.schedule,
  students: state.students.students_list,
})

export default connect(mapStateToProps, {
  load_user,
  load_groups_list,
  load_schedule,
  get_all_students,
  update_attendance,
})(Admittance)
