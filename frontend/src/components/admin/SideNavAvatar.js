import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

const SideNavAvatar = ({user}) => {

  const [avatar, setAvatar] = useState("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1609106/headshot.png")

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.avatar !== null && user.avatar !== undefined) {
        setAvatar(user.avatar)
      }
    }
  }, [user])

  const[name,setName] = useState('')


  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.name !== null && user.name !== undefined) {
        setName(user.name)
      }
    }
  }, [user])

  return (
    <div className="sidenav__profile">
      <div
        className="sidenav__profile-avatar"
        style={{backgroundImage: `url(${avatar})`}}
      />
      <div className="sidenav__profile-title admin-text-light">{name}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, )(SideNavAvatar)