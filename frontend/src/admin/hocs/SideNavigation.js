import React from 'react';
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon
} from 'mdbreact';

import logo from '../static/logo/logo-big.svg'

class SideNavigation extends React.Component {
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div className='white-skin'>
        <MDBSideNav
          href="/"
          logo={logo}
          bg='https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg'
          mask='strong'
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: 'padding-left .3s' }}
        >
          <MDBSideNavNav>
            <MDBSideNavLink
              style={{pointerEvents:'none', color:'#879099'}}
              topLevel
            >
              Академический раздел
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/students' onClick={onLinkClick}>
              <MDBIcon icon='user mr-2 mr-2' />
              Слушатели
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/teachers' onClick={onLinkClick}>
              <MDBIcon icon='chalkboard-teacher mr-2' />
              Преподаватели
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/programs' onClick={onLinkClick}>
              <MDBIcon fab icon='codepen mr-2' />
              Программы
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/groups' onClick={onLinkClick}>
              <MDBIcon icon='users mr-2' />
              Группы
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/subjects' onClick={onLinkClick}>
              <MDBIcon icon='puzzle-piece mr-2' />
              Дисциплины
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/materials' onClick={onLinkClick}>
              <MDBIcon icon='book-open mr-2' />
              Методические материалы
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/schedule' onClick={onLinkClick}>
              <MDBIcon far icon='calendar mr-2' />
              Расписание
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/admittance' onClick={onLinkClick}>
              <MDBIcon far icon='calendar-check mr-2' />
              Посещение занятий
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/milestones' onClick={onLinkClick}>
              <MDBIcon icon='map-signs mr-2' />
              Контрольные точки
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/library' onClick={onLinkClick}>
              <MDBIcon icon='book mr-2' />
              Библиотека
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/study/reflective' onClick={onLinkClick}>
              <MDBIcon icon='user-check mr-2' />
              Рефлективная диагностика
            </MDBSideNavLink>

            <MDBSideNavLink
              style={{pointerEvents:'none', color:'#879099'}}
              topLevel
            >
              Административный раздел
            </MDBSideNavLink>

            <MDBSideNavCat
              name='Запросы с сайта'
              id='bids'
              icon='file-alt'
            >
              {this.rSNL('/dashboard/admin/bids/study', 'Запись на обучение')}
              {this.rSNL('/dashboard/admin/bids/program', 'Запись на программу')}
              {this.rSNL('/dashboard/admin/bids/participation', 'Запись на участие')}
              {this.rSNL('/dashboard/admin/bids/plan', 'Скачивание плана')}
            </MDBSideNavCat>

             <MDBSideNavCat
              name='Разделы сайта'
              id='site-blocks'
              icon='layer-group'
            >
              {this.rSNL('/dashboard/admin/blocks/faq', 'Частые вопросы')}
              {this.rSNL('/dashboard/admin/blocks/contacts', 'Контакты')}
              {this.rSNL('/dashboard/admin/blocks/testimonials', 'Отзывы')}
              {this.rSNL('/dashboard/admin/blocks/block', 'Раздел сайта')}
              {this.rSNL('/dashboard/admin/blocks/subblock', 'Подраздел сайта')}
              {this.rSNL('/dashboard/admin/blocks/social', 'Соцсети')}
              {this.rSNL('/dashboard/admin/blocks/phone', 'Телефон')}
            </MDBSideNavCat>

            <MDBSideNavLink topLevel to='/dashboard/admin/blocks/gallery' onClick={onLinkClick}>
              <MDBIcon icon='grip-horizontal mr-2' />
              Галерея
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to='/dashboard/admin/blocks/events' onClick={onLinkClick}>
              <MDBIcon fab icon='elementor mr-2' />
              События
            </MDBSideNavLink>

          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
