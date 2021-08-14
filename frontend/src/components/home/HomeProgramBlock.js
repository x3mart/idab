import React, {useEffect, useRef, useState} from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBLink, MDBRow, MDBTypography} from "mdbreact";
import {connect} from 'react-redux';

const HomeProgramBlock = ({item}) => {

  const {name, id, short_description, programs, slug} = item

  const [height, setHeight] = useState(0);
  const colRef = useRef({})
  const cardRef = useRef({})
  const dataRef = useRef({})

  useEffect(() => {
    setHeight(colRef.current[id].offsetHeight)
  }, [])

  useEffect(() => {
    if(height > 0) {
      cardRef.current[id].style.maxHeight=`${visible ? '1000' : height}px`
      if(dataRef.current[id].classList.contains('hidden-hidden-program')) {
        dataRef.current[id].classList.remove('hidden-hidden-program')
      }
    }
  })


  const [visible, setVisible] = useState(false)

  return (
    <div
      ref={(element) => colRef.current[id] = element}
      id={`col-${id}`}
      data-test="col"
      className="col-lg-4 mb-4"
    >
      <div
        ref={(element) => cardRef.current[id] = element}
        id={`card-${id}`}
        data-test="card"
        className="white-text prog-card idab-3 z-depth-2"
      >
        <MDBCardBody className=''>
          {id == 1
            ?
            <a href={`/index.php/programmy/${slug}`}>
            <h3 className="home-program-title">
            {name}
          </h3>
          </a>
            :
            <h3 className="home-program-title">
            {name}
          </h3>
          }
          <p className="font-smaller font-weight-light">{short_description}</p>
          <div style={{cursor: 'pointer'}} onClick={() => setVisible(!visible)} className='mb-2'>
            <MDBRow className='mb-3'>
              <MDBCol size='1'>
                <div className={`active-banner w-10 ${visible ? "hidden" : ""}`}>
                  <MDBIcon
                    icon="chevron-down" className='mr-2'/>
                </div>
                <div className={`active-banner w-10 ${visible ? "" : "hidden"}`}>
                  <MDBIcon
                    icon="chevron-up" className='mr-2'/>
                </div>
              </MDBCol>
              <MDBCol size='10'>
                Специализации
              </MDBCol>
            </MDBRow>
          </div>
          <div
            ref={(element) => dataRef.current[id] = element}
            className={`mt-2 pt-3 hidden-hidden-program active-program ${visible ? "" : "hidden-program"}`}
          >
            <ul className='font-smaller font-weight-light list-unstyled'>
              {programs.map(pr => (
                <li key={pr.id}>
                  <a href={`/index.php/programmy/${slug}/${pr.slug}`} className='white-text'>
                    <MDBIcon icon="arrow-right" className="mr-2"
                             style={{fontSize: '0.8rem', paddingBottom: '0.2rem'}}/>
                    <div className="d-inline">{pr.name}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </MDBCardBody>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  programs: state.home.home_programs,
});

export default connect(mapStateToProps,)(HomeProgramBlock);