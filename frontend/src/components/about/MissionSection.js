import React, {useEffect, useRef, useState} from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBView,
  MDBBox,
  MDBTypography,
  MDBCardTitle,
  MDBCardText, MDBCardImage, MDBContainer
} from "mdbreact";
import image2 from "../../assets/mission1-cutted-min.jpg"
import image3 from "../../assets/mission3-cutted-min.jpg"
import image4 from "../../assets/mission4-cutted-min.jpg"

import {connect} from "react-redux";

const MissionSection = ({page}) => {

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
    image_block.current.height = height
  }, [height])

  useEffect(() => {
    if (subsections) {
      subsections.map(subsection => {
        if (subsection.title === 'Миссия') {
          setImage(subsection.image)
          setText(subsection.excerption)
          setSub1(subsection.sub1)
          setSub2(subsection.sub2)
        }
      })
    }
  })

  console.log('subsections: ', subsections)
  console.log('image: ', image)
  console.log('text: ', text)
  console.log('sub1: ', sub1)
  console.log('sub2: ', sub2)

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
                  <MDBCol size='7' className='d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column'>
                      <h3 className='mission-text'>{text}</h3>
                      <div className='mission-footer d-inline'><p className='d-inline'>{sub1} <span>{sub2}</span></p>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol size='5'></MDBCol>
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
              Наши ценности
            </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow className="px-5 pb-5">
        <MDBCol md='4'>
          <MDBCard wide cascade>
            <MDBView cascade>
              <MDBCardImage
                hover
                overlay='white-slight'
                className='card-img-top'
                src={image2}
                alt='Card cap'
              />
            </MDBView>

            <MDBCardBody cascade className='text-center'>
              <MDBCardTitle className='mission-card-title'>
                Бизнес-решения как инструмент для создания стоимости
              </MDBCardTitle>

              <MDBCardText>
                Реальность сегодняшней деловой среды - это то поле, на котором конкурируют лучшие мировые компании,
                причем все чаще не только и не столько технологиями, сколько решениями и алгоритмами. Мы создаем
                атмосферу творческого поиска новых решений, создающих ценность.
              </MDBCardText>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard wide cascade>
            <MDBView cascade>
              <MDBCardImage
                hover
                overlay='white-slight'
                className='card-img-top'
                src={image3}
                alt='Card cap'
              />
            </MDBView>

            <MDBCardBody cascade className='text-center'>
              <MDBCardTitle className='mission-card-title'>
                Аутентичная образовательная среда
              </MDBCardTitle>

              <MDBCardText>
                Мы создаем такие условия обучения, которые помогают развивать практические навыки и получать знания о
                современной бизнес-среде, способствующие личностной и профессиональной трансформации лидеров завтрашнего
                дня.
              </MDBCardText>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard wide cascade>
            <MDBView cascade>
              <MDBCardImage
                hover
                overlay='white-slight'
                className='card-img-top'
                src={image4}
                alt='Card cap'
              />
            </MDBView>

            <MDBCardBody cascade className='text-center'>
              <MDBCardTitle className='mission-card-title'>
                Близость к российскому деловому сообществу
              </MDBCardTitle>

              <MDBCardText>
                Наши слушатели – это представители деловых сообществ различных регионов России и отраслей национальной
                экономики. Это дает нам уникальную возможность обладать экспертным знанием о текущей ситуации и
                перспективных трендах развития бизнеса в России.a
              </MDBCardText>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  page: state.pages.pages[0]
})

export default connect(mapStateToProps)(MissionSection);