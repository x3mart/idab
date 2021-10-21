import React from 'react'

const EventTemplate = event => {

    event.guest_star = event.guest_star === null ? '' : event.guest_star
    event.checkpoint = event.checkpoint ? event.checkpoint : ''

    return (
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-weight: bold; padding: 15px 0 10px 0;">
                {event.course}
            </div>
            <div style="display:flex; justify-content: center; font-weight: light; font-size: 12px; font-style: italic; padding: 5px 0;">
                {event.teacher ? event.teacher : event.guest_star}
            </div>
            <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;">
            <div style="font-size: 10px">{event.room}</div>
            <div style="font-size: 10px">{event.checkpoint}</div>
            </div>
        </div>
    )
}

export default EventTemplate