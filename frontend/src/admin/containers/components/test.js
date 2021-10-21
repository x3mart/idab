import React, { useEffect, useState } from 'react'
import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css'
import 'dhtmlx-scheduler/codebase/locale/locale_ru'
import './Scheduler.css'
import EventContent from './EventContent'
import './EventContent.css'

const scheduler = window.scheduler
let schedulerContainer = document.getElementById('scheduler-container')

const Scheduler = props => {
  const { events, teachers, timeFormatState, training_group } = props

  const [teacher_options, setTeacher_options] = useState([])
  const [schedule_items, setSchedule_items] = useState([])

  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setTeacher_options(teachers)
    }
  }, [teachers])

  const initSchedulerEvents = () => {
    if (scheduler._$initialized) {
      return
    }

    const onDataUpdated = props.onDataUpdated

    scheduler.attachEvent('onClick', (id, ev) => {
      scheduler.showLightbox(id)
      return true
    })

    scheduler.attachEvent('onEventAdded', (id, ev) => {
      ev = { ...ev, training_group: this.props.training_group }
      ev.teacher = ev.guest_star ? '' : ev.teacher

      if (onDataUpdated) {
        onDataUpdated('create', ev, id)
      }
    })

    scheduler.attachEvent('onEventChanged', (id, ev) => {
      ev = { ...ev, training_group: this.props.training_group }
      ev.teacher = ev.guest_star ? '' : ev.teacher
      if (onDataUpdated) {
        onDataUpdated('update', ev, id)
      }
    })

    scheduler.attachEvent('onEventDeleted', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('delete', ev, id)
      }
    })
    scheduler._$initialized = true
  }

  // const schedulerContainer = document.getElementById('scheduler-container');

  useEffect(() => {
    scheduler.skin = 'material'
    scheduler.config.header = ['day', 'week', 'date', 'prev', 'today', 'next']
    scheduler.config.first_hour = 10
    scheduler.config.last_hour = 23
    scheduler.config.hour_date = '%g:%i %A'
    scheduler.xy.scale_width = 70
    scheduler.config.details_on_dblclick = true
    scheduler.config.details_on_create = true

    scheduler.config.lightbox.sections = [
      {
        name: 'Занятие',
        height: 50,
        map_to: 'course',
        type: 'textarea',
        focus: true,
      },
      {
        name: 'Лектор',
        height: 40,
        map_to: 'teacher',
        type: 'select',
        options: teacher_options.map(item => ({
          key: item.id,
          value: item.name,
          label: item.name,
        })),
      },
      {
        name: 'Класс',
        height: 50,
        map_to: 'room',
        type: 'textarea',
      },
      {
        name: 'Приглашенный учитель',
        height: 50,
        map_to: 'guest_star',
        type: 'textarea',
      },
      {
        name: 'Учебная группа',
        height: 0,
        map_to: 'training_group',
        type: 'textarea',
        value: training_group,
      },
      { name: 'time', height: 72, type: 'time', map_to: 'auto' },
    ]

    initSchedulerEvents()

    const content = ''

    scheduler.attachEvent('onTemplatesReady', function () {
      scheduler.config.hour_date = '%H:%i'
      scheduler.templates.event_date = function (date) {
        var formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date)
        return formatFunc(date)
      }

      scheduler.templates.event_header = function (start, end, ev) {
        return (
          scheduler.templates.event_date(start) +
          ' - ' +
          scheduler.templates.event_date(end)
        )
      }
      scheduler.templates.event_text = function (start, end, event) {
        event.teacher = event.guest_star ? '' : event.teacher
        event.checkpoint = event.checkpoint ? event.checkpoint : ''
        return (
          '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><div style="font-weight: bold; padding: 15px 0 10px 0;">' +
          event.course +
          '</div><div style="display:flex; justify-content: center; font-weight: light; font-size: 12px; font-style: italic; padding: 5px 0;">' +
          event.teacher +
          event.guest_star +
          '</div><div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;"><div style="font-size: 10px">' +
          event.room +
          '</div><div style="font-size: 10px">' +
          event.checkpoint +
          '</div></div></div>'
        )
      }
    })
    scheduler.init(schedulerContainer, new Date())
    // scheduler.clearAll()
    // scheduler.parse(this.props.events)
  }, [])

  useEffect(() => {
    scheduler.clearAll()
    scheduler.parse(events)
    scheduler.render()
  }, [events])

  const setHoursScaleFormat = state => {
    scheduler.config.hour_date = '%H:%i'
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    )
  }

  setHoursScaleFormat(timeFormatState)

  return (
    <div
      ref={input => {
        let schedulerContainer = input
      }}
      style={{ width: '100%', height: '100%' }}
    ></div>
  )
}

export default Scheduler
