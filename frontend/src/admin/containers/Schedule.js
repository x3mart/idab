import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { load_user } from '../../redux/actions/auth/auth'
import ScheduleComponent from './ScheduleComponent'

const Schedule = ({  user }) => {

  useEffect(() => {
    if (!user) {
      load_user()
    }
  }, [])


  return <ScheduleComponent />
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  load_user,
})(Schedule)
