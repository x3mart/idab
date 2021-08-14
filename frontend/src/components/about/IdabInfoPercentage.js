import React from 'react';
import {MDBCol, MDBContainer} from "mdbreact";
import IdabInfoNumbers from "./IdabInfoNumbers";

const IdabInfoPercentage = (props) => {
  return (
    <MDBContainer className=''>
      <IdabInfoNumbers desc='слушателей имеют второе высшее экономическое образование' number='30%'/>
      <IdabInfoNumbers desc='слушателей занимают руководящие должности' number='80%'/>
      <IdabInfoNumbers desc='слушателей - женщины' number='43%'/>
    </MDBContainer>
  );
}

export default IdabInfoPercentage;