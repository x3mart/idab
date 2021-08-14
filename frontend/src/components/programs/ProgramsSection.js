import React, {useEffect, useRef, useState} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdbreact";
import HomeProgramBlock from "../home/HomeProgramBlock";
import MetaTags from 'react-meta-tags';
import {connect} from "react-redux";
import {load_categories} from '../../redux/actions/programs'

const ProgramsSection = ({programs, page, load_categories}) => {

  useEffect(() => {
    load_categories();
  }, [])

  useEffect(() => {
    if (programs) {
      setProgs(programs)
    }
  }, [programs])


  const image_block = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [progs, setProgs] = useState([])
  const [image, setImage] = useState('')
  const [text, setText] = useState('')
  const [sub1, setSub1] = useState('')
  const [sub2, setSub2] = useState('')

  useEffect(() => {
    if (image_block.current) {
      setWidth(image_block.current.offsetWidth)
      if (width > 0) {
        setHeight(width / 3)
      }
    }
  })

  useEffect(() => {
    image_block.current.height = height
  }, [height])

  useEffect(() => {
    if (page) {
      setImage(page.image)
      setText(page.excerption)
      setSub1(page.sub1)
      setSub2(page.sub2)
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

              <div
                data-test="container"
                className="container position-absolute h-100"
              >

                <MDBRow className='mx-5 h-100'>
                  <MDBCol size='8' className='d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column'>


                    </div>
                  </MDBCol>
                  <MDBCol size='4'></MDBCol>
                </MDBRow>

              </div>
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
              Программы института
            </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer>
        <MDBRow className="d-flex flex-row">

          {progs.map((item) => (
            <HomeProgramBlock key={item.id} item={item}/>
          ))}

        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  programs: state.programs.categories,
  page: state.pages.pages[1]
});

export default connect(mapStateToProps,{load_categories})(ProgramsSection);