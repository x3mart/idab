import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../../redux/actions/auth/auth";
import dummy_avatar from '../../assets/man.svg'

const AdminHeader = ({user, logout}) => {

  const [avatarDropdown, setAvatarDropdown] = useState(false)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.avatar !== null && user.avatar !== undefined) {
        setAvatar(user.avatar)
      }
    } else {
      setAvatar(dummy_avatar)
    }
  }, [user])

  return (
    <header className="header">
      <i className="fas fa-bars header__menu"/>
      <div className="header__search"/>
      <div
        className="header__avatar"
        onClick={() => setAvatarDropdown(!avatarDropdown)}
        style={{backgroundImage: `url(${avatar})`}}
      >
        <div className={`dropdown ${avatarDropdown ? "dropdown--active" : ""}`}>
          <ul className="dropdown__list">
            <li className="dropdown__list-item">
              <Link to="/dashboard/my-page">
                <span className="dropdown__icon"><i className="far fa-user"/></span>
                <span className="dropdown__title">Моя страница</span>
              </Link>
            </li>
            <li
              className="dropdown__list-item"
              onClick={() => logout()}
            >
              <span className="dropdown__icon"><i className="fas fa-sign-out-alt"/></span>
              <span className="dropdown__title">Выход</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {logout})(AdminHeader);
