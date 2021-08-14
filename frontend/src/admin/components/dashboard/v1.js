import React, { Component, Fragment } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBProgress,
} from 'mdbreact';
import moment from "moment";
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/ru.js')

const localizer = Calendar.momentLocalizer(moment);

class DV1 extends Component {
  state = {
    buttonStyle: {
      transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
      opacity: '0'
    },
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Какое-то дело'
      }
    ]
  };

  onHover = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(1) scaleX(1) translateY(0) translateX(0)',
        opacity: '1'
      }
    });
  };

  onMouseLeave = () => {
    this.setState({
      buttonStyle: {
        transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
        opacity: '0'
      }
    });
  };

  render() {

    return (
      <Fragment>
        <section>
          <MDBRow>
            <MDBCol xl='4' md='6' className='mb-5'>
              <MDBCard cascade className='cascading-admin-card'>
                <div className='admin-up'>
                  <MDBIcon
                    icon='chalkboard-teacher'
                    className='primary-color mr-3 z-depth-2'
                  />
                  <div className='data'>
                    <p>ПРЕПОДАВАТЕЛИ</p>
                    <h4 className='font-weight-bold dark-grey-text'>38</h4>
                  </div>
                </div>
                <MDBCardBody cascade>
                  <MDBProgress
                    value={25}
                    barClassName='bg-primary'
                    height='6px'
                    wrapperStyle={{ opacity: '.7' }}
                    className='mb-3'
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol xl='4' md='6' className='mb-5'>
              <MDBCard cascade className='cascading-admin-card'>
                <div className='admin-up'>
                  <MDBIcon icon='user' className='warning-color' />
                  <div className='data'>
                    <p>СЛУШАТЕЛИ</p>
                    <h4 className='font-weight-bold dark-grey-text'>124</h4>
                  </div>
                </div>
                <MDBCardBody cascade>
                  <MDBProgress
                    value={25}
                    barClassName='red accent-2'
                    height='6px'
                    wrapperStyle={{ opacity: '.7' }}
                    className='mb-3'
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol xl='4' md='6' className='mb-4'>
              <MDBCard cascade className='cascading-admin-card'>
                <div className='admin-up'>
                  <MDBIcon icon='book-open' className='light-blue lighten-1' />
                  <div className='data'>
                    <p>МАТЕРИАЛЫ</p>
                    <h4 className='font-weight-bold dark-grey-text'>28</h4>
                  </div>
                </div>

                <MDBCardBody cascade>
                  <MDBProgress
                    value={75}
                    barClassName='red accent-2'
                    height='6px'
                    wrapperStyle={{ opacity: '.7' }}
                    className='mb-3'
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>

        <section className='my-4'>
          <MDBCard style={{ marginBottom: '5rem' }}>
        <MDBCardBody>
          <Calendar
            culture='ru-RU'
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={this.state.events}
            style={{ height: '100vh' }}
            messages={{
                    next: "Вперед",
                    previous: "Назад",
                    today: "Сегодня",
                    month: "Месяц",
                    week: "Неделя",
                    day: "День",
                    agenda: "Список дел"
                  }}
          />
        </MDBCardBody>
      </MDBCard>
        </section>

      </Fragment>
    );
  }
}

export default DV1;
