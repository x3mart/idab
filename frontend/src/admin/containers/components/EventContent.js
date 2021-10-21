import React from 'react'
import './EventContent.css'

const EventContent = ({content}) => {
  return (
    <div className='event-content'>
      <div className='event-content-text'>{content.text}</div>
      <div className='event-content-teacher'>
        {content.teacher ? content.teacher : content.guest_star}
      </div>
      <div className='event-content-row'>
        <div className='event-content-row-room'>{content.room}</div>
        <div className='event-content-row-checkpoint'>{content.checkpoint}</div>
      </div>
    </div>
  )
}

export default EventContent
