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
  MDBCardText, MDBCardImage, MDBContainer, MDBBtn, MDBIcon
} from "mdbreact";
import image1 from "../../assets/rating-idab.jpg"
import rating2020 from "../../assets/rating2020.jpg"
import rating2019 from "../../assets/rating2019.jpg"
import accred2019 from "../../assets/ratingIFA_Logo_Master_HR.png"
import rating2018 from "../../assets/rating2018.jpg"
import rating2016 from "../../assets/rating2016.jpg"
import rating2015 from "../../assets/rating2015.jpg"
import accred2014 from "../../assets/ratingIFA.jpg"
import rating2013 from "../../assets/rating2013.jpg"

import {connect} from "react-redux";

const RatingSection = ({page}) => {

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
        if (subsection.title === 'Рейтинги') {
          setImage(subsection.image)
          setText(subsection.excerption)
          setSub1(subsection.sub1)
          setSub2(subsection.sub2)
        }
      })
    }
  })

  useEffect(() => {
    image_block.current.height = height
  }, [height])

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
                      {sub1 || sub2 &&
                        <div className='mission-footer d-inline'><p className='d-inline'>{sub1 ? sub1 : ''} <span>{sub2 ? sub2 : ''}</span></p>
                      </div>
                      }
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
              Рейтинги и аккредитация
            </h2>
          </div>
        </MDBCol>
      </MDBRow>


      <div className='mx-5 pb-5'>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2020}
                alt=""
              />
              <a href="https://www.mba.su/narodnyj_rating_bschools_2020/" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'
                  className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>4 место в 2020 году</strong>
              </h3>
              <p>
                ИДАБ занимает 4 место в 2020 году в народном рейтинге российских бизнес школ, согласно сайту mba.su.
              </p>
              <a href="https://www.mba.su/narodnyj_rating_bschools_2020/" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте mba.su</MDBBtn>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>4 место в 2019 году</strong>
              </h3>
              <p>
                ИДАБ занимает 4 место в 2019 году в народном рейтинге российских бизнес школ, согласно сайту mba.su.
              </p>
              <a href="https://www.mba.su/narodnyj_rating_bschools_2019/" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте mba.su</MDBBtn>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2019}
                alt=""
              />
              <a href="https://www.mba.su/narodnyj_rating_bschools_2019/" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={accred2019}
                alt=""
              />
              <a href="">
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>Аккредитация Института финансовых аналитиков (IFA, Великобритания)</strong>
              </h3>
              <p>
                Институт финансовых аналитиков (IFA, Великобритания) пролонгировал аккредитацию программы «Мастер
                делового
                администрирования – Master of Business Administration (МВА)» ИДАБ ГУУ до 2021 года. Дипломы IFA имеют
                признание в 85 странах мира и подтверждают соответствие программы MBA ИДАБ ГУУ международным требованиям
                профессиональных программ.
              </p>
            </div>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>5 место в 2018 году</strong>
              </h3>
              <p>
                ИДАБ занимает 5 место в 2018 году в народном рейтинге российских бизнес школ, согласно сайту mba.su.
              </p>
              <a href="https://www.mba.su/narodnyj_rating_bschools_2018/" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте mba.su</MDBBtn>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2018}
                alt=""
              />
              <a href="https://www.mba.su/narodnyj_rating_bschools_2018/" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>


        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2016}
                alt=""
              />
              <a href="http://www.rbcplus.ru/news/57d92b9b7a8aa95a1a6b5ad2" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>2 место в 2016 году</strong>
              </h3>
              <p>
                ИДАБ занимает 2 место в 2016 году в народном рейтинге российских бизнес школ, согласно «РБК+».
              </p>
              <a href="http://www.rbcplus.ru/news/57d92b9b7a8aa95a1a6b5ad2" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте «РБК+»</MDBBtn>
              </a>
            </div>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>2 место в 2015</strong>
              </h3>
              <p>
                ИДАБ занимает 2 место в 2015 году в народном рейтинге российских бизнес школ, согласно бизнес-журналу
                «Секрет фирмы».
              </p>
              <a href="https://secretmag.ru/trends/tendencies/mba2015.htm" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте «Секрет фирмы»</MDBBtn>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2015}
                alt=""
              />
              <a href="https://secretmag.ru/trends/tendencies/mba2015.htm" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={accred2014}
                alt=""
              />
              <a href="">
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>Аккредитация Института финансовых аналитиков в 2014 году.</strong>
              </h3>
              <p>
                В 2014 году программа «Мастер делового администрирования – Master of Business Administration (МВА)» ИДАБ
                получила международное признание/аккредитацию Института финансовых аналитиков (IFA, Великобритания),
                диплом которого имеет признание в 85 странах мира и подтверждает соответствие программы «Master of
                business administration» ИДАБ международным требованиям профессиональных программ.
              </p>
            </div>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>
        <MDBRow>
          <MDBCol lg="7" className='d-flex justify-content-center align-items-center'>
            <div>
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>4 место в 2012-2013 гг. и 3 место в 2010-2011 гг.</strong>
              </h3>
              <p>
                ИДАБ занимает 4 место в 2012-2013 гг, 3 место в 2010-2011 гг. в народном рейтинге российских бизнес
                школ,
                согласно бизнес-журналу «Секрет фирмы».
              </p>
              <a href="http://www.mba.su/ratings_09-11/" target='_blank'>
                <MDBBtn outline color="idab" size="sm">Статья на сайте mba.su</MDBBtn>
              </a>
            </div>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src={rating2013}
                alt=""
              />
              <a href="http://www.mba.su/ratings_09-11/" target='_blank'>
                <MDBMask overlay="white-slight"/>
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5"/>

      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  page: state.pages.pages[0]
})

export default connect(mapStateToProps)(RatingSection);