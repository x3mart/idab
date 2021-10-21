import React from "react";

const SmallCard = ({iconBG, icon, title, titleStrong, subtitle, cName}) => {
  return (
    <div className={`overviewCard${cName ? ' ' + cName : ''}`}>
      <div className={`overviewCard-icon overviewCard-icon--${iconBG}`}>
        <i className={`fas fa-${icon}`}/>
      </div>
      <div className="overviewCard-description">
        <h3 className="overviewCard-title admin-text-light">{title} <strong>{titleStrong}</strong></h3>
        <p className="overviewCard-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default SmallCard