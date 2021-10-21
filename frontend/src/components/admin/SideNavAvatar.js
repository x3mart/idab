import React, {useEffect, useState} from "react";
import dummy_avatar from '../../assets/man.svg'

const SideNavAvatar = ({user}) => {

  const [avatar, setAvatar] = useState('')
  const [name,setName] = useState('')

  useEffect(() => {
    if (user !== null && user !== undefined) {
      if (user.avatar !== null && user.avatar !== undefined) {
        setAvatar(user.avatar)
      } else {
        setAvatar(dummy_avatar)
      }
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

export default SideNavAvatar