import React, {useEffect, useRef, useState} from 'react';
import {
  MDBAvatar,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBMask,
  MDBRow,
  MDBView
} from "mdbreact";

import {connect} from "react-redux"

import image1 from "../../assets/team.jpg";
import TeacherComponent from "./TeacherComponent";
import ManagementComponent from "./ManagementComponent";

const TeamSection = ({page, leader, management, teachers}) => {

  const image_block = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [subsections, setSubsections] = useState([])
  const [image, setImage] = useState('')
  const [text, setText] = useState('')
  const [sub1, setSub1] = useState('')
  const [sub2, setSub2] = useState('')

  useEffect(() => {
    if (image_block.current) {
      setWidth(image_block.current.offsetWidth)
      if (width > 0) {
        setHeight(width / 2)
      }
    }
  })

  useEffect(() => {
    if(page){
      setSubsections(page.subsections)
    }
  }, [page])

  useEffect(() => {
    if (subsections) {
      subsections.map(subsection => {
        if (subsection.title === 'Команда') {
          setImage(subsection.image)
          setText(subsection.excerption)
          setSub1(subsection.sub1)
          setSub2(subsection.sub2)
        }
      })
    }
  })

  return (
    <React.Fragment>

      <MDBRow className="">
        <MDBCol md="12">

          <div className='px-5'>
            <div
              ref={image_block}
              className="z-depth-2 position-relative"
              data-test="view"
              style={{
                backgroundImage: 'url(' + image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: height,
                zIndex: '2',
                borderRadius: '.25rem',
                // boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
              }}
            >

              <MDBRow className='mx-auto justify-content-end' style={{maxWidth: 1200}}>
                  <MDBCol size='6' className='d-flex align-items-center justify-content-center' style={{marginTop: 90}}>
                    <div className='d-flex flex-column'>
                      <h3 className='mission-text'>{text}</h3>
                      {sub1 || sub2 &&
                        <div className='mission-footer d-inline text-white'><p className='d-inline'>{sub1 ? sub1 : ''} <span>{sub2 ? sub2 : ''}</span></p>
                      </div>
                      }
                    </div>
                  </MDBCol>
                </MDBRow>
            </div>
          </div>

          <div
            className='.z-depth-1 idab'
            style={{
              width: '100vw',
              padding: '4rem',
              margin: '-1rem 0'
            }}
          >
            <h2 className="white-text text-center font-weight-bolder">
              Наша команда
            </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer className='mb-5'>
        <MDBCard>
          <MDBCardBody className='pt-5 pl-5 pr-5 pb-3'>
            <h3 className="mb-5 text-center">
              Лидер ИДАБ
            </h3>
            <MDBRow className='justify-content-center'>
              <TeacherComponent data={leader}/>
            </MDBRow>
            <h3 className="mb-5 text-center">
              Команда
            </h3>
            <MDBRow>
              {management.map((item) => <TeacherComponent data={item} key={item.id}/>)}
                {teachers.map((item) => <TeacherComponent data={item} key={item.id}/>)}
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  leader: state.about.about_leader,
  management: state.about.about_management,
  teachers: state.about.about_teachers,
  page: state.pages.pages[0]
})

export default connect(mapStateToProps)(TeamSection);