import React from 'react';
import {MDBContainer} from "mdbreact";
import map from '../../assets/russia_light.svg'
import IdabInfoNumbers from "./IdabInfoNumbers";

const IdabInfoMap = () => {
  return (
    <MDBContainer className=''>
      <div className='idab-info-map d-flex justify-content-center align-items-center' style={{backgroundImage: 'url('+map+')', backgroundPosition: 'center', backgroundSize: 'auto', backgroundRepeat: 'no-repeat', minHeight: '300px'}}>
        <IdabInfoNumbers desc='регионов России представлены нашими слушателями' number='57' />
      </div>
    </MDBContainer>
  );
}

export default IdabInfoMap;