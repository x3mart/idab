import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css'
import 'dhtmlx-scheduler/codebase/locale/locale_ru'
import './Scheduler.css'
import EventContent from './EventContent'
import './EventContent.css'
import { add_schedule } from '../../../redux/actions/admin/schedule'

const scheduler = window.scheduler

class Scheduler extends Component {
  state = {
    teacher_options:
      this.props.teachers && this.props.teachers.length > 0
        ? this.props.teachers
        : [],
    schedule_items: this.props.events,
  }

  initSchedulerEvents() {
    if (scheduler._$initialized) {
      return
    }

    // const onDataUpdated = this.props.onDataUpdated

    // // scheduler.attachEvent('onClick', (id, ev) => {
    // //   scheduler.showLightbox(id)
    // //   return true
    // // })

    // scheduler.attachEvent('onEventAdded', (id, ev) => {
    //   ev = { ...ev, training_group: this.props.training_group }
    //   ev.teacher = ev.guest_star ? '' : ev.teacher

    //   this.props.add_schedule(ev)

    //   if (onDataUpdated) {
    //     onDataUpdated('create', ev, id)
    //   }
    // })

    // scheduler.attachEvent('onEventChanged', (id, ev) => {
    //   ev = { ...ev, training_group: this.props.training_group }
    //   ev.teacher = ev.guest_star ? '' : ev.teacher
    //   if (onDataUpdated) {
    //     onDataUpdated('update', ev, id)
    //   }
    // })

    // scheduler.attachEvent('onEventDeleted', (id, ev) => {
    //   if (onDataUpdated) {
    //     onDataUpdated('delete', ev, id)
    //   }
    // })
    scheduler._$initialized = true
  }

  componentDidMount() {
    scheduler.skin = 'material'
    scheduler.config.header = ['day', 'week', 'date', 'prev', 'today', 'next']
    scheduler.config.first_hour = 10
    scheduler.config.last_hour = 23
    scheduler.config.hour_date = '%g:%i %A'
    scheduler.xy.scale_width = 70

    scheduler.config.readonly = true
    // scheduler.config.responsive_lightbox = true
    // scheduler.config.details_on_dblclick = true
    // scheduler.config.details_on_create = true

    // scheduler.config.lightbox.sections = [
    //   // {
    //   //   name: 'Предмет',
    //   //   height: 40,
    //   //   map_to: 'course',
    //   //   type: 'select',
    //   //   options: this.state.course_options.map(item => ({
    //   //     key: item.id,
    //   //     label: item.name,
    //   //   })),
    //   // },
    //   {
    //     name: 'Лектор',
    //     height: 40,
    //     map_to: 'teacher',
    //     type: 'select',
    //     options: this.state.teacher_options.map(item => ({
    //       key: item.id,
    //       value: item.name,
    //       label: item.name,
    //     })),
    //   },
    //   {
    //     name: 'Класс',
    //     height: 50,
    //     map_to: 'room',
    //     type: 'textarea',
    //   },
    //   {
    //     name: 'Приглашенный учитель',
    //     height: 50,
    //     map_to: 'guest_star',
    //     type: 'textarea',
    //   },
    //   { name: 'time', height: 72, type: 'time', map_to: 'auto' },
    // ]

    // this.initSchedulerEvents()

    const content = ''

    scheduler.attachEvent('onTemplatesReady', function () {
      scheduler.config.hour_date = '%H:%i'
      scheduler.templates.event_date = function (date) {
        var formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date)
        return formatFunc(date)
      }
      // scheduler.templates.hour_scale = scheduler.date.date_to_str(
      //   scheduler.config.hour_date
      // )
      scheduler.templates.event_header = function (start, end, ev) {
        return (
          scheduler.templates.event_date(start) +
          ' - ' +
          scheduler.templates.event_date(end)
        )
      }
      scheduler.templates.event_text = function (start, end, event) {
        console.log('event: ', event)
        event.guest_star = event.guest_star === null ? '' : event.guest_star
        event.teacher = event.guest_star ? '' : event.teacher
        event.checkpoint = event.checkpoint ? event.checkpoint.basic : ''
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
    scheduler.init(this.schedulerContainer, new Date())
    scheduler.clearAll()
    scheduler.parse(this.props.events)
    // scheduler.parse(this.state.schedule_items)
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.events !== nextProps.events
  // }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.events !== nextProps.events
  // }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      scheduler.clearAll()
      scheduler.parse(this.props.events)
    }
    scheduler.render()
  }

  setHoursScaleFormat(state) {
    scheduler.config.hour_date = '%H:%i'
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    )
  }

  render() {
    console.log(this.state.schedule_items)
    console.log(this.props.events)
    const { timeFormatState } = this.props
    this.setHoursScaleFormat(timeFormatState)
    return (
      <div
        ref={input => {
          this.schedulerContainer = input
        }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    )
  }
}

export default connect(null, { add_schedule })(Scheduler)
