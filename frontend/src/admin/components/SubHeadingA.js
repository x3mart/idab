import React, { useState, useEffect, Fragment } from 'react'

const SubHeadingA = ({ name, icon, list, link }) => {
  const [sublist, setSublist] = useState(false)

  const truncatedString = (str, n) => {
    return str.length > n ? str.substring(0, n - 3) + ' ' + '...' : str
  }

  const withList = (
    <li>
      <div
        className={`navList__subheading ${
          sublist ? 'navList__subheading--open' : ''
        }  row row--align-v-center`}
        onClick={() => setSublist(!sublist)}
      >
        <span className='navList__subheading-icon'>
          <i className={icon} />
        </span>
        <span className='navList__subheading-title'>
          {truncatedString(name, 15)}
        </span>
      </div>
      <ul className={`subList ${!sublist ? 'subList--hidden' : ''}`}>
        {list &&
          list.map(item => (
            <li className='subList__item'>
              <a href={item.link}>{truncatedString(item.name, 20)}</a>
            </li>
          ))}
      </ul>
    </li>
  )

  const withoutList = (
    <li>
      <a href={link} target='_blank'>
        <div className='navList__subheading row row--align-v-center'>
          <span className='navList__subheading-icon'>
            <i className={icon} />
          </span>
          <span className='navList__subheading-title'>
            {truncatedString(name, 15)}
          </span>
        </div>
      </a>
    </li>
  )

  return <Fragment>{list ? withList : withoutList}</Fragment>
}

export default SubHeadingA
