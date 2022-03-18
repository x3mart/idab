import React, {useEffect, useState} from "react";
import {MDBNav, MDBNavItem, MDBNavLink} from "mdbreact";

const GroupSelectMenu = ({list, action}) => {
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    if(list) {
      if(!activeItem) {
        setActiveItem(list && list.length>0 && list[0].id)
      }
    }
  }, [list])

  useEffect(() => {
    if(activeItem) {
      action(activeItem)
    }
  }, [activeItem])
  return (
    <MDBNav className='nav-tabs mt-5'>
      {list.length > 0 &&
        list.map(item => (
          <MDBNavItem>
            <MDBNavLink
              link='#'
              active={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
              role='tab'
            >
              {item.name}
            </MDBNavLink>
          </MDBNavItem>
        ))}
    </MDBNav>
  )
}

export default GroupSelectMenu
