import React from 'react';
import {MDBIcon} from "mdbreact";

const ButtonBack = (props) => {
  return (
    <React.Fragment>
      <a href="/index.php/programmy" className='button-back'>
        <div className='button-back-container'>
          <div className='button-back-icon'><MDBIcon icon="arrow-left" /></div>
          <div className='button-back-text'>Назад&nbsp;на&nbsp;страницу&nbsp;"Программы"</div>
        </div>
      </a>
    </React.Fragment>
  );
}

export default ButtonBack;