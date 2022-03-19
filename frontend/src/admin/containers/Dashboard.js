import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import '../hocs/AdminLayout.scss'
import { Link, Redirect } from 'react-router-dom'
// import ShowWeather from '../../components/admin/ShowWeather'
import SmallCard from '../../components/admin/SmallCard'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { load_user } from '../../redux/actions/auth/auth'
import {
  load_schedule,
  set_attendance,
} from '../../redux/actions/admin/schedule'
import './Students.css'
import {
  get_all_students,
  sort_students,
} from '../../redux/actions/admin/students'
import { get_all_teachers } from '../../redux/actions/admin/teachers'
import { load_study_materials } from '../../redux/actions/admin/study_materials'
import { MDBNav, MDBNavItem, MDBNavLink, MDBInput } from 'mdbreact'
import { load_groups_list } from '../../redux/actions/admin/groups'

import Chart from 'react-apexcharts'

import { Line, Circle } from 'rc-progress'

import axios from 'axios'
var fileDownload = require('js-file-download')

require('moment/locale/ru.js')

const Dashboard = ({
  isAuthenticated,
  load_study_materials,
  load_user,
  user,
  load_schedule,
  schedule_list,
  get_all_students,
  students_list,
  teachers_list,
  get_all_teachers,
  study_materials,
  load_groups_list,
  groups_list,
  sort_students,
  sorted_list,
  set_attendance,
  attendance,
}) => {
  useEffect(() => {
    load_groups_list()
    get_all_students()
    get_all_teachers()
    load_study_materials()
    load_schedule()
    if (!user) {
      load_user()
    }
  }, [])

  const [data, setData] = useState([])
  const [group, setGroup] = useState(null)
  const [studentsNumber, setStudentsNumber] = useState(null)
  const [teachersNumber, setTeachersNumber] = useState(null)
  const [studyMaterialsNumber, setStudyMaterialsNumber] = useState(null)
  const [teacher, setTeacher] = useState({})
  const [scheduleForToday, setScheduleForToday] = useState([])
  const [activeModal, setActiveModal] = useState(false)

  const [scheduleData, setScheduleData] = useState([])

  const [basicGroupsList, setBasicGroupsList] = useState([])

  const [activeItem, setActiveItem] = useState(null)
  const [scheduleItems, setScheduleItems] = useState([])
  const [groupName, setGroupName] = useState('')
  const [ids, setIds] = useState([])
  const [scheduleEvent, setScheduleEvent] = useState(null)
  const [studentsAttendant, setStudentsAttendant] = useState('')

  const [ratingAttendance, setRatingAttendance] = useState({
    options: {},
    series: [],
    labels: [],
    schedule_count: 0,
    attendances_count: 0,
    attendances_rating_prc: 0,
    attendances_rating: 0,
  })
  const [ratingCheckpoints, setRatingCheckpoints] = useState({
    options: {},
    series: [],
    labels: [],
    checkpoints_count: 0,
    completed_checkpoints: 0,
    completed_checkpoints_marks_avg: 0,
    checkpoints_rating: 0,
  })
  const [ratingTasks, setRatingTasks] = useState({
    options: {},
    series: [],
    labels: [],
    tasks_count: 0,
    solutions_count: 0,
    solutions_mark_avg: 0,
    tasks_rating: 0,
  })

  useEffect(() => {
    if (user && user.rating) {
      if (
        user.rating.schedule_count &&
        user.rating.attendances_count &&
        user.rating.attendances_rating_prc &&
        user.rating.attendances_rating
      ) {
        setRatingAttendance({
          ...ratingAttendance,
          series: [
            user.rating.attendances_count,
            user.rating.schedule_count - user.rating.attendances_count,
          ],
          labels: ['Посещено', 'Пропущено'],
          attendances_rating_prc: attendances_rating_prc,
          attendances_rating: attendances_rating,
        })
      }
      if (
        user.rating.checkpoints_count &&
        user.rating.completed_checkpoints &&
        user.rating.completed_checkpoints_marks_avg &&
        user.rating.checkpoints_rating
      ) {
        setRatingAttendance({
          ...ratingAttendance,
          series: [
            user.rating.completed_checkpoints,
            user.rating.checkpoints_count - user.rating.completed_checkpoints,
          ],
          labels: ['Сдано', 'Провалено'],
          completed_checkpoints_marks_avg: completed_checkpoints_marks_avg,
          checkpoints_rating: checkpoints_rating,
        })
      }
      if (
        user.rating.tasks_count &&
        user.rating.solutions_count &&
        user.rating.solutions_mark_avg &&
        user.rating.tasks_rating
      ) {
        setRatingAttendance({
          ...ratingAttendance,
          series: [
            user.rating.solutions_count,
            user.rating.tasks_count - user.rating.solutions_count,
          ],
          labels: ['Выполнено', 'Не выполнено'],
          // solutions_mark_avg: solutions_mark_avg,
          // tasks_rating: tasks_rating,
        })
      }
    }
  }, [])

  const toggle = (tab, name) => e => {
    if (activeItem !== tab) {
      setActiveItem(tab)
      setGroupName(name)
      setScheduleData(
        scheduleForToday.filter(item => item.training_group == tab)
      )
    }
  }

  useEffect(() => {
    if (groupName) {
      sort_students(groupName)
    }
  }, [groupName])

  const toggleAttendance = id => {
    setActiveModal(!activeModal)
    setScheduleEvent(id)
  }

  const cancelAttendance = () => {
    setIds([])
    setActiveModal(false)
  }

  const handleAttendance = () => {
    set_attendance(scheduleEvent, ids)
    // set_attendance(scheduleEvent, ids.join(', '))
    setActiveModal(false)
  }

  const handleAttendanceChange = e => {
    if (e.target.checked) {
      const arr1 = [...ids, e.target.id]
      setIds(arr1)
    } else if (!e.target.checked) {
      const arr2 = ids.length > 0 && ids.filter(item => item !== e.target.id)
      setIds(arr2)
    }
  }

  useEffect(() => {
    setBasicGroupsList(
      groups_list.sort(function (a, b) {
        return a.id - b.id
      })
    )
  }, [groups_list, basicGroupsList])

  const getTime = date => {
    let now = new Date(date).toLocaleTimeString().slice(0, -3)
    return now
  }

  useEffect(() => {
    if (Array.isArray(schedule_list) && schedule_list.length > 0) {
      setData(schedule_list)
    }
  }, [schedule_list])

  useEffect(() => {
    if (user) {
      if (user.schedule_for_today) {
        setScheduleForToday(user.schedule_for_today)
      }
    }
  }, [user])

  useEffect(() => {
    if (user && !user.is_student) {
      if (Array.isArray(students_list) && students_list.length > 0) {
        setStudentsNumber(students_list.length)
      }
      if (Array.isArray(teachers_list) && teachers_list.length > 0) {
        setTeachersNumber(teachers_list.length)
      }
      if (Array.isArray(study_materials) && study_materials.length > 0) {
        setStudyMaterialsNumber(study_materials.length)
      }
    }
  }, [study_materials, students_list, user, teachers_list])

  if (!isAuthenticated) {
    return <Redirect to='/login' />
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
    <>
      <div
        className={`modal fade ${activeModal ? 'show' : ''}`}
        style={{ display: activeModal ? 'block' : 'none' }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Контроль посещения</h4>
              <button
                type='button'
                className='close'
                aria-hidden='true'
                onClick={cancelAttendance}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <div className='pb-5'>Отметьте присутствующих слушателей</div>
              {sorted_list &&
                sorted_list.length > 0 &&
                sorted_list.map(item => (
                  <div key={item.id} className='d-flex justify-content-between px-0 px-lg-3 mb-3'>
                    <div>{item.name}</div>
                    <MDBInput
                      type='checkbox'
                      id={item.id}
                      onChange={handleAttendanceChange}
                    />
                  </div>
                ))}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-default' onClick={cancelAttendance}>
                Отменить
              </button>
              <button className='btn btn-primary' onClick={handleAttendance}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <Fragment>
          <div className='main-body__cards'>
            {user && !user.is_student && (
              <div className='cards' style={{ backgroundColor: 'transparent' }}>
                {user && !user.is_teacher && (
                  <SmallCard
                    cName='mb-3'
                    iconBG='document'
                    icon='chalkboard-teacher'
                    title='Всего'
                    titleStrong='Преподавателей'
                    subtitle={teachersNumber}
                  />
                )}
                <SmallCard
                  cName='mb-3'
                  iconBG='calendar'
                  icon='user'
                  title='Всего'
                  titleStrong='Слушателей'
                  subtitle={studentsNumber}
                />
                <SmallCard
                  cName='mb-3'
                  iconBG='photo'
                  icon='file-image'
                  title='Методических'
                  titleStrong='Материалов'
                  subtitle={studyMaterialsNumber}
                />
              </div>
            )}
            {user && user.is_student && (
              <div className='cards'>
                <div className='cards__header'>
                  <div className='cards__header-title admin-text-light'>
                    Прогресс <strong>обучения</strong>
                  </div>
                  <div
                    className='pr-2'
                    onClick={handleDownloadXml}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className='fas fa-cloud-download-alt pr-2'></i>Скачать
                  </div>
                </div>
                <div className='cards p-5'>
                  {/* <Circle
                      percent='10'
                      strokeWidth='4'
                      strokeColor='#D3D3D3'
                    /> */}
                  {user && user.rating && (
                    <>
                      <div className='row'>
                        <div className='col-4'>
                          <Chart
                            options={ratingAttendance.options}
                            series={ratingAttendance.series}
                            labels={ratingAttendance.labels}
                            type='donut'
                            height='140'
                          />
                        </div>
                        <div
                          className='col-8 pb-3'
                          style={{ borderBottom: '1px solid #EAEDF1' }}
                        >
                          <h5>Рейтинг посещаемости</h5>
                          <div className='row'>
                            <div className='col-10'>Всего занятий</div>
                            <div className='col-2'>
                              {ratingAttendance.schedule_count}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Посещено занятий</div>
                            <div className='col-2'>
                              {ratingAttendance.attendances_count}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>
                              Процент посещенных занятий
                            </div>
                            <div className='col-2'>
                              {ratingAttendance.attendances_rating_prc}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Рейтинг посещаемости</div>
                            <div className='col-2'>
                              {ratingAttendance.attendances_rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>
                          <Chart
                            options={ratingCheckpoints.options}
                            series={ratingCheckpoints.series}
                            labels={ratingCheckpoints.labels}
                            type='donut'
                            height='140'
                          />
                        </div>
                        <div
                          className='col-8 pb-3'
                          style={{ borderBottom: '1px solid #EAEDF1' }}
                        >
                          <h5 className='mt-4'>Рейтинг контрольных точек</h5>
                          <div className='row'>
                            <div className='col-10'>
                              Всего контрольных точек
                            </div>
                            <div className='col-2'>
                              {ratingCheckpoints.checkpoints_count}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>
                              Контрольных точек пройдено
                            </div>
                            <div className='col-2'>
                              {ratingCheckpoints.completed_checkpoints}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Средний балл</div>
                            <div className='col-2'>
                              {
                                ratingCheckpoints.completed_checkpoints_marks_avg
                              }
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>
                              Рейтинг контрольных точек
                            </div>
                            <div className='col-2'>
                              {ratingCheckpoints.checkpoints_rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-4'>
                          <Chart
                            options={ratingTasks.options}
                            series={ratingTasks.series}
                            labels={ratingTasks.labels}
                            type='donut'
                            height='140'
                          />
                        </div>
                        <div
                          className='col-8 pb-3'
                          style={{ borderBottom: '1px solid #EAEDF1' }}
                        >
                          <h5 className='mt-4'>Рейтинг заданий</h5>
                          <div className='row'>
                            <div className='col-10'>Всего заданий</div>
                            <div className='col-2'>
                              {ratingTasks.tasks_count}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Заданий сдано</div>
                            <div className='col-2'>
                              {ratingTasks.solutions_count}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Средний балл</div>
                            <div className='col-2'>
                              {ratingTasks.solutions_mark_avg}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-10'>Рейтинг заданий</div>
                            <div className='col-2'>
                              {ratingTasks.tasks_rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className='row mt-4'>
                    {user &&
                    user.training_group &&
                    user.training_group.length > 0 ? (
                      <>
                        <div className='col-4' style={{height:140, maxWidth: 140}}>
                          <Circle
                            percent={
                              user &&
                              user.training_group &&
                              user.training_group.length > 0 &&
                              user.training_group[0].progress
                            }
                            strokeWidth='8'
                            strokeColor={
                              user.training_group[0].progress < 25
                                ? '#FF0000'
                                : user.training_group[0].progress >= 25 &&
                                  user.training_group[0].progress < 50
                                ? '#FFA500'
                                : user.training_group[0].progress >= 50 &&
                                  user.training_group[0].progress < 75
                                ? '#FFFF00'
                                : '#008000'
                            }
                          />
                        </div>
                        <div className='col-8 w-100 d-flex justify-content-center align-items-center'>
                          <div className='text-bold'>
                            {user.training_group[0].progress < 25
                              ? 'Прекрасное начало!'
                              : user.training_group[0].progress >= 25 &&
                                user.training_group[0].progress < 50
                              ? 'Еще немного и экватор!'
                              : user.training_group[0].progress >= 50 &&
                                user.training_group[0].progress < 75
                              ? 'Половина пути пройдена!'
                              : 'Еще немного, еще чуть-чуть...'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className='my-5'>
                        <h3>Возникла ошибка при формировании рейтинга</h3>
                        <p>Сообщите о ней администратору</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className='cards'>
              <div className='cards__header'>
                <div className='cards__header-title admin-text-light'>
                  Расписание <strong>На сегодня</strong>
                </div>
              </div>
              <div className='cards'>
                {user && !user.is_student && (
                  <MDBNav className='nav-tabs mt-5'>
                    {basicGroupsList.length > 0 &&
                      basicGroupsList.map(item => (
                        <MDBNavItem>
                          <MDBNavLink
                            link
                            active={activeItem === item.id}
                            onClick={toggle(item.id, item.name)}
                            role='tab'
                          >
                            {item.name}
                          </MDBNavLink>
                        </MDBNavItem>
                      ))}
                  </MDBNav>
                )}
                {user &&
                  !user.is_student &&
                  scheduleData &&
                  scheduleData.length > 0 &&
                  scheduleData.map(item => (
                    <div
                      className='today-schedule-wrapper'
                      onClick={() => toggleAttendance(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className='event-row'>
                        <div>
                          {item.start_date ? getTime(item.start_date) : ''}
                        </div>
                        <div>
                          {item.teacher
                            ? item.teacher
                            : item.guest_star
                            ? item.guest_star
                            : ''}
                        </div>
                      </div>
                      <div className='today-schedule-event-text'>
                        {item.course}
                      </div>
                      <div className='event-row'>
                        <div>{item.room ? item.room : ''}</div>
                        <div>{item.checkpoint ? item.checkpoint : ''}</div>
                      </div>
                    </div>
                  ))}
                {user &&
                  !user.is_student &&
                  scheduleData &&
                  scheduleData.length === 0 && (
                    <div className='today-schedule-wrapper'>
                      <div className='event-row'>
                        <div></div>
                        <div></div>
                      </div>
                      <div className='today-schedule-event-text'>
                        Событий на сегодня нет
                      </div>
                      <div className='event-row'>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  )}
                {user &&
                  user.is_student &&
                  scheduleForToday &&
                  scheduleForToday.map(item => (
                    <div className='today-schedule-wrapper'>
                      <div className='event-row'>
                        <div>
                          {item.start_date ? getTime(item.start_date) : ''}
                        </div>
                        <div>
                          {item.teacher
                            ? item.teacher
                            : item.guest_star
                            ? item.guest_star
                            : ''}
                        </div>
                      </div>
                      <div className='today-schedule-event-text'>
                        {item.course}
                      </div>
                      <div className='event-row'>
                        <div>{item.room ? item.room : ''}</div>
                        <div>{item.checkpoint ? item.checkpoint : ''}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  schedule_list: state.schedule.schedule,
  attendance: state.schedule.attendance,
  students_list: state.students.students_list,
  teachers_list: state.teachers.teachers_list,
  study_materials: state.study_materials.study_materials,
  groups_list: state.groups.groups,
  sorted_list: state.students.sorted_list,
})

export default connect(mapStateToProps, {
  load_user,
  load_schedule,
  get_all_students,
  get_all_teachers,
  load_study_materials,
  load_groups_list,
  sort_students,
  set_attendance,
})(Dashboard)
