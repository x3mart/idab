import React from "react";
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBContainer} from "mdbreact";
import header from "../../assets/headers/header1.jpg"
import IdabChart from "./IdabChart";
import IdabInfoMap from "./IdabInfoMap";
import IdabInfoNumbers from "./IdabInfoNumbers";
import IdabInfoPercentage from "./IdabInfoPercentage";
import image1 from "../../assets/mission.jpg";

const AboutSection = () => {
  return (
    <React.Fragment>
      <MDBRow className="">
        <MDBCol md="12">

          <div className='px-5'>
            <div
              className="z-depth-2 position-relative"
              data-test="view"
              style={{
                backgroundColor: '#ffffff',
                // backgroundPosition: 'center',
                height: 'auto',
                zIndex: '2',
                borderRadius: '.25rem',
                // boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
              }}
            >

              <div
              >

                <MDBRow className='p-5'>
                <MDBCol lg='4' className='d-flex justify-content-center align-items-center'>
                  <IdabChart/>
                </MDBCol>
                <MDBCol lg='4' className='d-flex justify-content-center align-items-center'>
                  <IdabInfoMap/>
                </MDBCol>
                <MDBCol lg='4' className='d-flex justify-content-center align-items-center'>
                  <IdabInfoPercentage/>
                </MDBCol>
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
                О нас
              </h2>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBContainer className='mb-5'>
        <MDBCard className='p-5'>
          <MDBCardBody>
            <p>
              Получать новые знания или нет – такого выбора современная экономика просто не оставляет, главный вопрос -
              какую школу для этого выбрать.
            </p>
            <p className='text-idab font-weight-bolder'>
              Поступив на программы в ИДАБ ГУУ, вы совершите правильный выбор, который на долгие годы определит успех
              вашей карьеры и качество принимаемых вами управленческих решений.
            </p>
            <p>
              ИДАБ - это:
              <ol>
                <li>уникальные собственные программы, нацеленные на развитие <span className='text-idab'>практических навыков</span> и <span
                  className='text-idab font-weight-bolder'>получение знаний</span> о
                  реальной экономике и современной бизнес-среде
                </li>
                <li><span className='text-idab font-weight-bolder'>возможность</span> общения с преподавателями, которые способны передать
                  свои <span className='text-idab font-weight-bolder'>знания и опыт</span>, накопленный за
                  годы <span className='text-idab font-weight-bolder'>практической деятельности</span> как в сфере MBA образования, так и
                  на
                  рынке разных стран мира
                </li>
                <li>богатая <a href="/about/history" className='font-weight-bolder'>история</a> выстраивания бизнес-образования в России,
                </li>
                <li><a href="/about/gallery" className='font-weight-bolder'>выпускники</a>, успехами которых мы гордимся,</li>
                <li><span className='text-idab font-weight-bolder'>удобные</span> и хорошо оснащенные <a href="/about/gallery" className='font-weight-bolder'>классы</a></li>
              </ol>
            </p>
            <p>
              Каждый из нас замечает насколько стремительно развивается современная экономика, как повышается ее
              сложность
              и растет уровень конкуренции. Инвесторы, компании и организации в любой отрасли постоянно ищут пути для
              <span className='text-idab font-weight-bolder'>создания стоимости</span>, открывая <span className='text-idab font-weight-bolder'>новые возможности</span> на
              рынке, совершенствуя организацию деятельности, управляя
              рисками, создавая стоимость компаний и развивая, самый важный и высокодоходный вид капитала – <span
              className='text-idab font-weight-bolder'>человеческий
            капитал</span>.
            </p>
            <p>
              Основной инструмент для создания стоимости, единый для всех руководителей и инвесторов – <span
              className='text-idab font-weight-bolder'>принятие решений</span>. От того насколько последовательными и успешными будут эти
              решения зависит <span className='text-idab font-weight-bolder'>будущее компаний</span> и <span
              className='text-idab font-weight-bolder'>карьера</span> ее
              <span className='text-idab font-weight-bolder'>сотрудников</span>, <span
              className='text-idab font-weight-bolder'>благосостояние</span> акционеров
              и <span className='text-idab font-weight-bolder'>конкурентоспособность</span> национальных экономик.
            </p>
            <p>
              Растет ценность решений, которые создают стоимость, <span className='text-idab font-weight-bolder'>повышается стоимость сотрудников</span>,
              которые <span className='text-idab font-weight-bolder'>способны
            принимать</span> и реализовывать такие <span className='text-idab font-weight-bolder'>решения</span>. При этом растет и
              конкуренция за возможность работать совместно с
              <span className='text-idab font-weight-bolder'>лучшими</span> и наиболее <span className='text-idab font-weight-bolder'>талантливыми</span> в
              передовых и быстроразвивающихся компаниях мирового уровня, повышаются
              <span className='text-idab font-weight-bolder'>требования</span> к уровню <span className='text-idab font-weight-bolder'>знаний</span> и <span
              className='text-idab font-weight-bolder'>навыков</span> кандидатов на каждую <span className='text-idab font-weight-bolder'>управленческую позицию</span>.
            </p>
            <p>
              В ИДАБ вы получите актуальные знания и разовьете свои управленческие навыки.
            </p>
            <p>
              <span className='text-idab font-weight-bolder'>Выбирайте МВА, приходите в ИДАБ ГУУ</span>.
            </p>
          </MDBCardBody>

        </MDBCard>
      </MDBContainer>
    </React.Fragment>
  );
}

export default AboutSection;