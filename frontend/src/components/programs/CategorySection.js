import React, {useEffect, useRef, useState} from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBMask, MDBRow, MDBView} from "mdbreact";

import {connect} from 'react-redux'

import {load_category} from "../../redux/actions/programs"
import ButtonBack from "./ButtonBack";
import MetaTags from "react-meta-tags";

const CategorySection = (props) => {

  const {category_slug} = props.match.params;

  const {category_data, load_category} = props

  const [category, setCategory] = useState({})

  console.log(category_slug)

  const image_block = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (image_block.current) {
      setWidth(image_block.current.offsetWidth)
      if (width > 0) {
        setHeight(width / 2)
      }
    }
  },)

  useEffect(() => {
    image_block.current.height = height
  }, [height])

  useEffect(() => {
    load_category(category_slug)
  }, [category_slug])

  useEffect(() => {
    if (category_data) {
      setCategory(category_data)
    }
  }, [category_data])

  return (
    <React.Fragment>
      {category_slug === 'mba' &&
      <MetaTags>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/finansy"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/bankovskij-menedzhment"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/upravlenie-prodazhami"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/upravlenie-stoimostyu-biznesa"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/hotur"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/mba/upravlenie-stoimostyu-biznesa"/>
        <link rel="canonical"
              href="https://idab.mba/index.php/programmy/podgotovka-upravlencheskikh-kadrov-dlya-organizatsij-narodnogo-khozyajstva-pretendentskaya-programma/organizatsionnye-i-ekonomicheskie-osnovy-effektivnogo-funktsionirovaniya-proizvodstvennogo-kompleksa-tip-b"/>
        <link rel="canonical" href="
              https://idab.mba/index.php/programmy/podgotovka-upravlencheskikh-kadrov-dlya-organizatsij-narodnogo-khozyajstva-pretendentskaya-programma/organizatsionnye-i-ekonomicheskie-osnovy-effektivnogo-funktsionirovaniya-proizvodstvennogo-kompleksa-tip-b"/>
        <link rel="canonical" href="https://idab.mba/index.php/programmy/master-gosudarstvennogo-upravleniya-mpa"/>
        <link rel="canonical"
              href="https://idab.mba/index.php/programmy/podgotovka-upravlencheskikh-kadrov-dlya-organizatsij-narodnogo-khozyajstva-pretendentskaya-programma/praktika-upravleniya-biznes-proektami-tip-a"/>
      </MetaTags>}

      <ButtonBack/>
      <MDBRow className="">
        <MDBCol md="12">

          <div className='px-5'>
            <div
              ref={image_block}
              className="z-depth-2 position-relative"
              data-test="view"
              style={{
                backgroundImage: 'url(' + category.image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: height,
                zIndex: '2',
                borderRadius: '.25rem',
                // boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
              }}
            >
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
              {category.name}
            </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer className='mb-5'>
        <MDBCard className='p-5'>
          <MDBCardBody>
            <div
              dangerouslySetInnerHTML={{__html: category.full_description}}
            />
          </MDBCardBody>

        </MDBCard>
      </MDBContainer>
    </React.Fragment>

  );
}

const mapStateToProps = state => ({
  category_data: state.programs.category
})

export default connect(mapStateToProps, {load_category})(CategorySection);