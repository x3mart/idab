import React from 'react';

const IdabInfoNumbers = ({number, desc}) => {
  return (
    <div className='d-flex flex-row'>
      <div className='d-flex align-items-center' style={{fontSize: 55, fontWeight: '300'}}>{number}</div>
      <div className='d-flex align-items-center' style={{fontSize: 55, marginTop: -8, fontWeight: '300'}}>|</div>
      <div className='d-flex align-items-center'>{desc}</div>
    </div>
  );
}

export default IdabInfoNumbers;