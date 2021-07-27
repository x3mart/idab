import React from 'react';
import background from '../../assets/faces.jpg'

const IdabNumbers = () => {
  return (
    <div>
      <div className="streak streak-photo streak-long-2" style={{backgroundImage: 'url(' + background + ')'}}>
        <div className="mask flex-center rgba-black-strong">
          <div className="container">
            <h3 className="text-center text-idab-2 mb-5 text-uppercase font-weight-bold wow fadeIn">ИДАБ В ЦИФРАХ</h3>
            <div className="row text-white text-center wow fadeIn">

              <div className="col-md-3 mb-2">
                <p className="h1 text-idab-3 mb-1 font-weight-bold">19</p>
                <p className='text-idab-2'>Лет на рынке</p>
              </div>

              <div className="col-md-3 mb-2">
                <p className="h1 text-idab-3 mb-1 font-weight-bold">11520</p>
                <p className='text-idab-2'>Профессионалов подготовлено</p>
              </div>

              <div className="col-md-3 mb-2">
                <p className="h1 text-idab-3 mb-1 font-weight-bold">36</p>
                <p className='text-idab-2'>Отраслей экономики</p>
              </div>

              <div className="col-md-3 mb-2">
                <p className="h1 text-idab-3 mb-1 font-weight-bold">32</p>
                <p className='text-idab-2'>Средний возраст</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdabNumbers;