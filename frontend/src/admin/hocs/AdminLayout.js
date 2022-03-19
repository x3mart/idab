import React, { useState, useEffect, Fragment } from 'react'
import './AdminLayout.scss'
import SubHeading from '../components/SubHeading'
import logo from '../../assets/logo-big.svg'
import AdminHeader from '../../components/admin/AdminHeader'
import SideNavAvatar from '../../components/admin/SideNavAvatar'
import { connect } from 'react-redux'
import ShowWeather from '../../components/admin/ShowWeather'
import bg_image from '../../assets/lake-shadow-water.jpeg'
import { load_user } from '../../redux/actions/auth/auth'
import SubHeadingA from '../components/SubHeadingA'

const AdminLayout = ({ children, user }) => {
  const [name, setName] = useState('')

  const date = new Date().getFullYear()

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.name !== null && user.name !== undefined) {
        setName(user.name)
      }
    }
  }, [user])

  return (
    <div className='grid'>
      <AdminHeader />

      {user && (
        <>
          <aside className='sidenav'>
            <div className='sidenav__brand'>
              {/*<i className="fas fa-feather-alt sidenav__brand-icon"/>*/}
              <a className='sidenav__brand-link' href='/'>
                <img src={logo} alt='logo' width='100' />
              </a>
              {/*<a className="sidenav__brand-link" href="/">Ux<span className="admin-text-light">Pro</span></a>*/}
              <i className='fas fa-times sidenav__brand-close' />
            </div>
            <SideNavAvatar user={user} />
            <div className='row row--align-v-center row--align-h-center mb-5'>
              <ul className='navList'>
                <SubHeading
                  name='Главная'
                  icon='fas fa-tachometer-alt'
                  link='/dashboard/main'
                />
                {user.is_student && (
                  <>
                    <SubHeading
                      link='/dashboard/study/materials'
                      icon='fas fa-book-open'
                      name='Методические материалы'
                    />
                    <SubHeading
                      link='/dashboard/study/library'
                      icon='fas fa-book'
                      name='Библиотека'
                    />
                    <SubHeading
                      link='/dashboard/study/tasks'
                      icon='fas fa-user-check'
                      name='Задания'
                    />
                    <SubHeading
                      link='/dashboard/study/schedule'
                      icon='fas fa-calendar'
                      name='Расписание'
                    />
                  </>
                )}
                {user.is_teacher && (
                  <>
                    <SubHeading
                      name='Слушатели'
                      icon='fas fa-user'
                      link='/dashboard/study/students'
                    />
                    <SubHeading
                      link='/dashboard/study/materials'
                      icon='fas fa-book-open'
                      name='Методические материалы'
                    />
                    <SubHeading
                      link='/dashboard/study/library'
                      icon='fas fa-book'
                      name='Библиотека'
                    />
                    <SubHeading
                      link='/dashboard/study/tasks'
                      icon='fas fa-user-check'
                      name='Задания'
                    />
                    <SubHeading
                      link='/dashboard/study/schedule'
                      icon='fas fa-calendar'
                      name='Расписание'
                    />
                    <SubHeading
                      link='/dashboard/study/admittance'
                      icon='fas fa-calendar-check'
                      name='Посещение занятий'
                    />
                  </>
                )}
                {(user.is_superuser || user.is_staff) && (
                  <>
                    <li className='navList__heading'>
                      Академический раздел
                      <i className='fas fa-graduation-cap' />
                    </li>
                    <SubHeading
                      name='Слушатели'
                      icon='fas fa-user'
                      link='/dashboard/study/students'
                    />
                    <SubHeading
                      name='Преподаватели'
                      icon='fas fa-chalkboard-teacher'
                      link='/dashboard/study/teachers'
                    />
                    <SubHeading
                      name='Программы'
                      icon='fab fa-codepen'
                      link='/dashboard/study/programs'
                    />
                    <SubHeading
                      link='/dashboard/study/groups'
                      icon='fas fa-users'
                      name='Группы'
                    />
                    {/* <SubHeading
                        link='/dashboard/study/subjects'
                        icon='fas fa-puzzle-piece'
                        name='Дисциплины'
                      /> */}
                    <SubHeading
                      link='/dashboard/study/schedule'
                      icon='fas fa-calendar'
                      name='Расписание'
                    />
                    <SubHeading
                      link='/dashboard/study/materials'
                      icon='fas fa-book-open'
                      name='Методические материалы'
                    />
                    <SubHeading
                      link='/dashboard/study/library'
                      icon='fas fa-book'
                      name='Библиотека'
                    />
                    {/*<SubHeading*/}
                    {/*  link='/dashboard/study/tasks'*/}
                    {/*  icon='fas fa-user-check'*/}
                    {/*  name='Задания'*/}
                    {/*/>*/}
                    <SubHeading
                      link='/dashboard/study/admittance'
                      icon='fas fa-calendar-check'
                      name='Посещение занятий'
                    />
                    {/* <SubHeading
                        link='/dashboard/study/milestones'
                        icon='fas fa-map-signs'
                        name='Контрольные точки'
                      />
                       */}
                    <li className='navList__heading'>
                      Управление сайтом
                      <i className='fas fa-cogs' />
                    </li>
                    {/* <SubHeading
                        list={[
                          {
                            link: '/dashboard/admin/bids/study',
                            name: 'Запись на обучение',
                          },
                          {
                            link: '/dashboard/admin/bids/program',
                            name: 'Запись на программу',
                          },
                          {
                            link: '/dashboard/admin/bids/participation',
                            name: 'Запись на участие',
                          },
                          {
                            link: '/dashboard/admin/bids/plan',
                            name: 'Скачивание плана',
                          },
                        ]}
                        icon='fas fa-file-alt'
                        name='Запросы с сайта'
                      /> */}
                    {/* <SubHeading
                        list={[
                          {
                            link: '/dashboard/admin/blocks/faq',
                            name: 'Частые вопросы',
                          },
                          {
                            link: '/dashboard/admin/blocks/contacts',
                            name: 'Контакты',
                          },
                          {
                            link: '/dashboard/admin/blocks/testimonials',
                            name: 'Отзывы',
                          },
                          {
                            link: '/dashboard/admin/blocks/block',
                            name: 'Раздел сайта',
                          },
                          {
                            link: '/dashboard/admin/blocks/subblock',
                            name: 'Подраздел сайта',
                          },
                          {
                            link: '/dashboard/admin/blocks/social',
                            name: 'Соцсети',
                          },
                          {
                            link: '/dashboard/admin/blocks/phone',
                            name: 'Телефон',
                          },
                        ]}
                        icon='fas fa-layer-group'
                        name='Разделы сайта'
                      /> */}
                    {/* <SubHeading
                        link='/dashboard/admin/blocks/gallery'
                        icon='fas fa-grip-horizontal'
                        name='Галерея'
                      /> */}
                    <SubHeadingA
                      link='/admin/'
                      icon='fas fa-cog'
                      name='Административный разде'
                    />
                    {/* <SubHeading
                        link='/dashboard/admin/blocks/events'
                        icon='fab fa-elementor'
                        name='События'
                      /> */}
                  </>
                )}
              </ul>
            </div>
          </aside>
        </>
      )}
      <main className='main-body'>
        <div
          className='main-body-header'
          style={{ backgroundImage: `url("${bg_image}")` }}
        >
          <div className='main-body-header__intro-wrapper'>
            <div className='main-body-header__welcome'>
              <div className='main-body-header__welcome-title admin-text-light'>
                Добро пожаловать, <strong>{name}</strong>
              </div>
            </div>
            <div className='quickview'>
              <ShowWeather />
            </div>
          </div>
        </div>
        {children}
      </main>
      <footer className='footer'>
        <p>
          <span className='footer__copyright'>&copy;</span> {date}
        </p>
        <p>
          <a
            href='https://idab.mba'
            target='_blank'
            className='footer__signature'
          >
            ИДАБ
          </a>
        </p>
      </footer>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { load_user })(AdminLayout)
