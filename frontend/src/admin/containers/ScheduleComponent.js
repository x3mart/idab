import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { load_user } from '../../redux/actions/auth/auth'
import { Redirect } from 'react-router-dom'
import Scheduler from './components/Scheduler'
import { load_groups_list } from '../../redux/actions/admin/groups'
import { get_all_teachers } from '../../redux/actions/admin/teachers'
import { load_schedule } from '../../redux/actions/admin/schedule'
import { MDBNav, MDBNavItem, MDBNavLink, MDBSpinner } from 'mdbreact'

const ScheduleComponent = ({
  isAuthenticated,
  user,
  load_user,
  load_groups_list,
  groups_list,
  get_all_teachers,
  teachers_list,
  load_schedule,
  schedule_list,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  useEffect(() => {
    load_groups_list()
    get_all_teachers()
    load_schedule()
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
        // setBasicGroupsList(groups_list.reverse())
        setActiveItem(groups_list[0].id)
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

  const [basicGroupsList, setBasicGroupsList] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [scheduleItems, setScheduleItems] = useState([])

  const toggle = tab => e => {
    if (activeItem !== tab) {
      setActiveItem(tab)
      setData(scheduleItems.filter(item => item.training_group == tab))
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
      setData(scheduleItems.filter(item => item.training_group == activeItem))
    }
  }, [scheduleItems, activeItem])

  return (
    <div className='main-body__users'>
      <div className='cards dx-viewport'>
        <div className='cards__header table-title'>
          <div className='cards__header-title admin-text-light'>
            Расписание <strong>занятий</strong>
          </div>
          <div></div>
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

        {basicGroupsData.loaded && (
          <>
            {user && !user.is_student && (
              <MDBNav className='nav-tabs mt-5'>
                {basicGroupsList.length > 0 &&
                  basicGroupsList.map(item => (
                    <MDBNavItem>
                      <MDBNavLink
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
            )}

            <div className='cards'>
              <div className='scheduler-container'>
                <Scheduler
                  events={data}
                  timeFormatState={true}
                  teachers={teachers_list}
                  training_group={activeItem}
                  // course={course_list}
                />
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
  teachers_list: state.teachers.teachers_list,
  schedule_list: state.schedule.schedule,
})

export default connect(mapStateToProps, {
  load_user,
  load_groups_list,
  get_all_teachers,
  load_schedule,
})(ScheduleComponent)
