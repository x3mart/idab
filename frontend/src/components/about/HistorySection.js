import React, {useEffect, useRef, useState} from "react";
import {
  MDBTimeline,
  MDBTimelineStep,
  MDBIcon,
  MDBCol,
  MDBCard,
  MDBView,
  MDBMask,
  MDBCardBody,
  MDBRow,
  MDBContainer
} from "mdbreact";

import history1 from "../../assets/history/history1.jpg"
import history2 from "../../assets/history/history2.jpg"
import history3 from "../../assets/history/history3.jpg"
import history4 from "../../assets/history/history4.jpg"
import history5 from "../../assets/history/history5.jpg"
import history6 from "../../assets/history/history6.jpg"
import history7 from "../../assets/history/history7.jpg"
import history8 from "../../assets/history/history8.jpg"
import history9 from "../../assets/history/history9.jpg"
import history10 from "../../assets/history/history10.jpg"
import history11 from "../../assets/history/history11.jpg"
import history12 from "../../assets/history/history12.jpg"
import history13 from "../../assets/history/history13.jpg"
import history14 from "../../assets/history/history14.jpg"
import history15 from "../../assets/history/history15.jpg"
import history16 from "../../assets/history/history16.jpg"
import history17 from "../../assets/history/history17.jpg"
import history18 from "../../assets/history/history18.jpg"
import history19 from "../../assets/history/history19.jpg"
import image1 from "../../assets/history.jpg"
import history20 from "../../assets/history/history20.jpg";
import history21 from "../../assets/history/history21.jpg";
import history22 from "../../assets/history/history22.jpg";

import {connect} from "react-redux";

const HistorySection = ({page}) => {

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
        if (subsection.title === 'История') {
          setImage(subsection.image)
          setText(subsection.excerption)
          setSub1(subsection.sub1)
          setSub2(subsection.sub2)
        }
      })
    }
  }, [subsections])

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
                        <div className='mission-footer d-inline'><p className='d-inline'>{sub1 ? sub1 : ''} <span>{sub2 ? sub2 : ''}</span></p>
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
              Наша история
            </h2>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBContainer className=''>
        <div className="">
          <MDBTimeline clasName="">
            <MDBTimelineStep colorful hoverable color="idab-3" label="1">
              <img src={history1} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Образование
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> 20 ноября 2002 г.
              </p>
              <p className="mb-0 p-4">
                Образование Института делового администрирования и бизнеса как правопреемника бизнес-школы МВА
                Финакадемии.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="2">
              <img src={history2} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Первая программа проф переподготовки
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Февраль 2003 г.
              </p>
              <p className="mb-0 p-4">
                Открытие первой программы профессиональной переподготовки «Куратор коммерческого банка – банковский
                менеджер» для специалистов надзорного блока Банка России.
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="3">
              <img src={history3} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Открытие новых программ
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Март 2004 г.
              </p>
              <p className="mb-0 p-4">
                Открытие программы профессиональной переподготовки «Инспектор коммерческого банка – банковский менеджер»
                для специалистов надзорного блока Банка России.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="4">
              <img src={history4} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новый проект
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2004 г.
              </p>
              <p className="mb-0 p-4">
                Открытие проекта с «Международной школой бизнеса» Республики Казахстан по подготовке топ-менеджеров и
                собственников бизнеса Республики по программе «МВА – Финансы».ф
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="5">
              <img src={history5} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Запуск проекта
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2004 г.
              </p>
              <p className="mb-0 p-4">
                Запуск проекта «Школа финансового директора» с ОАО РАО «ЕЭС России» и подготовка слушателей по программе
                МВА – Финансы в рамках реструктуризации энергетический отрасли России.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="6">
              <img src={history6} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Апрель 2005 г.
              </p>
              <p className="mb-0 p-4">
                Начало программы «МВА-Финансы» для специалистов ОАО «ЛУКОЙЛ».
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="7">
              <img src={history7} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2005 г.
              </p>
              <p className="mb-0 p-4">
                Открытие программы «МВА – Банковский менеджмент» для открытого набора.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="8">
              <img src={history8} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Второе место в конкурсе
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Апрель 2007 г.
              </p>
              <p className="mb-0 p-4">
                Второе призовое место в конкурсе решения кейсов «МВА Case Competition» в Американской Торговой палате в
                Москве.
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="9">
              <img src={history9} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Победа на конкурсе
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Апрель 2008 г.
              </p>
              <p className="mb-0 p-4">
                Победа на конкурсе кейсов «МВА Case Competition» в Американской Торговой палате в Москве.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="10">
              <img src={history10} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Учреждение дискуссионного клуба
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Май 2008 г.
              </p>
              <p className="mb-0 p-4">
                ИДАБ, ММВБ, ФК «Открытие» учредили дискуссионный клуб «Инвест-менеджер».
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="11">
              <img src={history11} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая совместная программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Декабрь 2009 г.
              </p>
              <p className="mb-0 p-4">
                Начало реализации совместной программы «Financial accountant Diploma» совместно с Институтом финансовых
                аналитиков Великобритании (IFA).
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="12">
              <img src={history12} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2011 г.
              </p>
              <p className="mb-0 p-4">
                Открыта новая программа МВА-HR-менеджмент для специалистов ОАО «РЖД».
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="13">
              <img src={history13} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Премия "Лучшие бизнес-школы двух столиц 2012"
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Октябрь 2012 г.
              </p>
              <p className="mb-0 p-4">
                Премия "Лучшие бизнес-школы двух столиц 2012" по версии издания «Элитный персонал».
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="14">
              <img src={history14} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая специализация
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Октябрь 2012 г.
              </p>
              <p className="mb-0 p-4">
                Открытие специализации МВА «Управление стоимостью бизнеса» совместно с компанией American Appraisal.
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="15">
              <img src={history15} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая специализация
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Октябрь 2015 г.
              </p>
              <p className="mb-0 p-4">
                Открытие специализации МВА «Управление продажами» совместно с Владиславом Завадским.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="16">
              <img src={history16} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая специализация
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Октябрь 2015 г.
              </p>
              <p className="mb-0 p-4">
                Открытие специализации МВА «Банки» для работников главной инспекции Банка России.
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="17">
              <img src={history17} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> 2016 г.
              </p>
              <p className="mb-0 p-4">
                Открытие программы профессиональной переподготовки «Управление бизнес-проектами».
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="18">
              <img src={history18} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Международное признание
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Февраль 2017 г.
              </p>
              <p className="mb-0 p-4">
                Программы MBA ИДАБ получили международное признание Института финансовых аналитиков Великобритании
                (IFA).
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="19">
              <img src={history19} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новый центр
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2017 г.
              </p>
              <p className="mb-0 p-4">
                ИДАБ новый центр профессионального бизнес-образования старейшего в России управленческого вуза
                Государственного университета управления.
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="20">
              <img src={history20} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Выпуск группы
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Ноябрь 2017 г.
              </p>
              <p className="mb-0 p-4">
                Выпуск группы компании ВРК-3
              </p>
            </MDBTimelineStep>


            <MDBTimelineStep colorful hoverable color="idab-3" label="21">
              <img src={history21} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Выпуск группы МВА
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> Июнь 2019 г.
              </p>
              <p className="mb-0 p-4">
                Первый Выпуск группы МВА на новой площадке ГУУ
              </p>
            </MDBTimelineStep>
            <MDBTimelineStep colorful inverted hoverable color="idab-3" label="22">
              <img src={history22} className="img-fluid" alt=""/>
              <h4 className="font-weight-bold p-4 mb-0">
                Новая программа
              </h4>
              <p className="text-muted px-4 mb-0">
                <MDBIcon icon="clock"/> 2020 г.
              </p>
              <p className="mb-0 p-4">
                Запуск президентской программы
              </p>
            </MDBTimelineStep>

          </MDBTimeline>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  page: state.pages.pages[0]
})

export default connect(mapStateToProps)(HistorySection);