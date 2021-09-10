import React, {useState, useEffect, Fragment} from 'react';
import {connect} from "react-redux";
import '../hocs/AdminLayout.scss'
import {Redirect} from 'react-router-dom'
import ShowWeather from "../../components/admin/ShowWeather";
import SmallCard from "../../components/admin/SmallCard";
import Calendar from 'react-big-calendar';
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {load_user} from '../../redux/actions/auth/auth'

require('moment/locale/ru.js');

const Dashboard = ({isAuthenticated, load_user, user}) => {

  useEffect(() => {
    if(!user){
      load_user()
    }
  }, [])

  const localizer = Calendar.momentLocalizer(moment);

  const [events, setEvents] = useState(
    [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Какое-то дело'
      }
    ]
  )

  if (!isAuthenticated) {
    return <Redirect to='/login'/>
  }

  return (
    <Fragment>
      <div className="main-body-overview">
        <SmallCard iconBG="document" icon="chalkboard-teacher" title="Всего" titleStrong="Преподавателей"
                   subtitle="36"/>
        <SmallCard iconBG="calendar" icon="user" title="Всего" titleStrong="Слушателей" subtitle="126"/>
        <SmallCard iconBG="photo" icon="file-image" title="Методических" titleStrong="Материалов" subtitle="85"/>
        <SmallCard iconBG="mail" icon="envelope" title="Новых" titleStrong="Сообщений" subtitle="3"/>
      </div>
      <div className="main-body__cards">
        <div className="cards">
          <div className="cards__header">
            <div className="cards__header-title admin-text-light">Календарь <strong>Событий</strong>
            </div>

          </div>
          <div className="cards">
            <Calendar
              className="mx-3 mt-3"
              culture='ru-RU'
              localizer={localizer}
              defaultDate={new Date()}
              defaultView='month'
              events={events}
              style={{height: '50vh'}}
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
          </div>
        </div>
        <div className="cards">
          <div className="cards__header">
            <div className="cards__header-title admin-text-light">Расписание <strong>На сегодня</strong>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {load_user})(Dashboard);
