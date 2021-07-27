import React, {useEffect, useRef, useState} from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer, MDBIcon, MDBInput,
  MDBModal, MDBModalBody, MDBModalFooter,
  MDBModalHeader,
  MDBRow,
} from "mdbreact";
import {isNotEmptyObject} from "../../functions"

import MetaTags from 'react-meta-tags';

import {load_program} from "../../redux/actions/program"
import {program_bid, plan_bid} from "../../redux/actions/bids"

import {connect} from 'react-redux'
import ButtonBack from "./ButtonBack";

const ProgramSection = (props) => {

  const {program_data, load_program, program_bid, plan_bid, status, program_status} = props
  const {category_slug, program_slug} = props.match.params;

  useEffect(() => {
    load_program(program_slug)
  }, [])

  useEffect(() => {
    if (program_data) {
      setProgram(program_data)
    }
  }, [program_data])

  const [program, setProgram] = useState({})
  // const [valid, setValid] = useState(null)
  const [modalProgram, setModalProgram] = useState(false)
  const [modalPlan, setModalPlan] = useState(false)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [id, setId] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [work_experience, setWork_experience] = useState(null)
  const [education, setEducation] = useState('')


  const [error_email_plan, setError_email_plan] = useState({
    status: false,
    text: []
  })
  const [error_name_plan, setError_name_plan] = useState({
    status: false,
    text: []
  })
  const [error_phone_plan, setError_phone_plan] = useState({
    status: false,
    text: []
  })
  const [plan_sent, setPlan_sent] = useState(false)
  const [error_data_plan, setError_data_plan] = useState({})
  const [pending_plan, setPending_plan] = useState(false)


  const [error_email_program, setError_email_program] = useState({
    status: false,
    text: []
  })
  const [error_name_program, setError_name_program] = useState({
    status: false,
    text: []
  })
  const [error_phone_program, setError_phone_program] = useState({
    status: false,
    text: []
  })
  const [error_company_program, setError_company_program] = useState({
    status: false,
    text: []
  })
  const [error_position_program, setError_position_program] = useState({
    status: false,
    text: []
  })
  const [error_work_experience_program, setError_work_experience_program] = useState({
    status: false,
    text: []
  })
  const [error_education_program, setError_education_program] = useState({
    status: false,
    text: []
  })
  const [program_sent, setProgram_sent] = useState(false)
  const [error_data_program, setError_data_program] = useState({})
  const [pending_program, setPending_program] = useState(false)

  useEffect(() => {
    setError_data_program({})
    if (program_status >= 200 && program_status < 300) {
      setPending_program(false)
      setProgram_sent(true)
    } else if (isNotEmptyObject(program_status)) {
      setPending_program(false)
      if (program_status.request.responseText) {
        setError_data_program(JSON.parse(program_status.request.responseText))
      }
    }
  }, [program_status])

  useEffect(() => {
    if (isNotEmptyObject(error_data_program)) {
      if ("email" in error_data_program) {
        setError_email_program({
          status: true,
          text: error_data_program.email
        })
      } else {
        setError_email_program({
          status: false,
          text: []
        })
      }
      if ("name" in error_data_program) {
        setError_name_program({
          status: true,
          text: error_data_program.name
        })
      } else {
        setError_name_program({
          status: false,
          text: []
        })
      }
      if ("phone" in error_data_program) {
        setError_phone_program({
          status: true,
          text: error_data_program.phone
        })
      } else {
        setError_phone_program({
          status: false,
          text: []
        })
      }
      if ("company" in error_data_program) {
        setError_company_program({
          status: true,
          text: error_data_program.company
        })
      } else {
        setError_company_program({
          status: false,
          text: []
        })
      }
      if ("position" in error_data_program) {
        setError_position_program({
          status: true,
          text: error_data_program.position
        })
      } else {
        setError_position_program({
          status: false,
          text: []
        })
      }
      if ("work_experience" in error_data_program) {
        setError_work_experience_program({
          status: true,
          text: error_data_program.work_experience
        })
      } else {
        setError_work_experience_program({
          status: false,
          text: []
        })
      }
      if ("education" in error_data_program) {
        setError_education_program({
          status: true,
          text: error_data_program.education
        })
      } else {
        setError_education_program({
          status: false,
          text: []
        })
      }
    }
  }, [error_data_program])

  useEffect(() => {
    setError_data_plan({})
    if (status >= 200 && status < 300) {
      setPending_plan(false)
      setPlan_sent(true)
    } else if (isNotEmptyObject(status)) {
      setPending_plan(false)
      if (status.request.responseText) {
        setError_data_plan(JSON.parse(status.request.responseText))
      }
    }
  }, [status])

  useEffect(() => {
    if (isNotEmptyObject(error_data_plan)) {
      if ("email" in error_data_plan) {
        setError_email_plan({
          status: true,
          text: error_data_plan.email
        })
      } else {
        setError_email_plan({
          status: false,
          text: []
        })
      }
      if ("name" in error_data_plan) {
        setError_name_plan({
          status: true,
          text: error_data_plan.name
        })
      } else {
        setError_name_plan({
          status: false,
          text: []
        })
      }
      if ("phone" in error_data_plan) {
        setError_phone_plan({
          status: true,
          text: error_data_plan.phone
        })
      } else {
        setError_phone_plan({
          status: false,
          text: []
        })
      }
    }
  }, [error_data_plan])


  // useEffect(() => {
  //   setProgram(program_data)
  //   if (isNotEmptyObject(program)) {
  //     setValid(program.category.slug == category_slug)
  //   }
  // }, [program_data, program])

  useEffect(() => {
    setId(program.id)
  }, [program_data, program])

  const send_bid = () => {
    setPending_program(true)
    program_bid(email, name, phone, id, company, position, work_experience, education);
  }

  const send_plan = () => {
    setPending_plan(true)
    plan_bid(email, name, phone, id);
  }

  const form1 = (
    <form className="mx-3 grey-text" onSubmit={(event) => event.preventDefault()}>
      <MDBInput
        getValue={(v) => {
          setName(v)
        }}
        label="Фамилия Имя Отчество"
        group
        type="text"
        className={error_name_program.status ? "form-control is-invalid" : ""}
        value={name}
      >
        {error_name_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => {
          setEmail(v)
        }}
        label="Email"
        group
        type="email"
        className={error_email_program.status ? "form-control is-invalid" : ""}
        value={email}
      >
        {error_email_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setPhone(v)}
        label="Номер телефона"
        group
        type="phone"
        className={error_phone_program.status ? "form-control is-invalid" : ""}
        value={phone}
      >
        {error_phone_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setCompany(v)}
        label="Название Вашей организации"
        group
        type="text"
        className={error_company_program.status ? "form-control is-invalid" : ""}
        value={company}
      >
        {error_company_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setPosition(v)}
        label="Должность"
        group
        type="text"
        className={error_position_program.status ? "form-control is-invalid" : ""}
        value={position}
      >
        {error_position_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setWork_experience(v)}
        label="Опыт работы(полных лет)"
        group
        type="text"
        className={error_work_experience_program.status ? "form-control is-invalid" : ""}
        value={work_experience}
      >
        {error_work_experience_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setEducation(v)}
        label="Образование"
        group
        type="text"
        className={error_education_program.status ? "form-control is-invalid" : ""}
        value={education}
      >
        {error_education_program.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
    </form>
  )

  const form2 = (
    <form
      className="mx-3 grey-text"
      onSubmit={(event) => event.preventDefault()}
    >
      <MDBInput
        getValue={(v) => {
          setName(v)
        }}
        label="Фамилия Имя Отчество"
        group type="text"
        className={error_name_plan.status ? "form-control is-invalid" : ""}
        value={name}
      >
        {error_name_plan.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => {
          setEmail(v)
        }}
        label="Email"
        group
        type="email"
        className={error_email_plan.status ? "form-control is-invalid" : ""}
        value={email}
      >
        {error_email_plan.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
      <MDBInput
        getValue={(v) => setPhone(v)}
        label="Номер телефона"
        group
        type="phone"
        className={error_phone_plan.status ? "form-control is-invalid" : ""}
        value={phone}
      >
        {error_phone_plan.text.map((item, i) => (
          <div key={i} className="invalid-feedback">
            {item}
          </div>
        ))}
      </MDBInput>
    </form>
  )

  return (
    <React.Fragment>

      <MetaTags>
        <title>{program.short_description}</title>
        {program.meta_description &&
        <meta name="description" content={program.meta_description}/>
        }
        {/*<meta property="og:title" content="MyApp" />*/}
        {/*<meta property="og:image" content="path/to/image.jpg" />*/}
      </MetaTags>

      <ButtonBack/>
      <div>
        <MDBModal isOpen={modalProgram} toggle={() => setModalProgram(!modalProgram)}>
          <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold"
                          toggle={() => setModalProgram(!modalProgram)}>Записаться на
            программу</MDBModalHeader>
          <MDBModalBody>
            {pending_program ?
              <div className='d-flex justify-content-center'>
                <div className="spinner-grow text-idab" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :
              program_sent ? <div className='my-5 d-flex flex-column justify-content-center text-center'>
                  <MDBIcon far icon="check-circle" size="4x" className='text-success mb-4'/>
                  <h3 className='mb-4'>Ваша заявка успешно отправлена</h3>
                  <h5>Наши сотрудники свяжутся с Вами в ближайшее время.</h5>
                </div>
                :
                form1
            }
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            {program_sent ? null :
              <MDBBtn outline color="dark" disabled={pending_program} onClick={send_bid}>Отправить</MDBBtn>}
            <MDBBtn outline color="dark" onClick={() => setModalProgram(!modalProgram)}>Закрыть</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        <MDBModal isOpen={modalPlan} toggle={() => setModalPlan(!modalPlan)}>
          <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold"
                          toggle={() => setModalPlan(!modalPlan)}>Получить учебный план</MDBModalHeader>
          <MDBModalBody>
            {pending_plan ?
              <div className='d-flex justify-content-center'>
                <div className="spinner-grow text-idab" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              :
              plan_sent ? <div className='my-5 d-flex flex-column justify-content-center text-center'>
                <MDBIcon far icon="check-circle" size="4x" className='text-success mb-4'/>
                <h3 className='mb-4'>Ваша заявка успешно отправлена</h3>
                <h5>Наши сотрудники свяжутся с Вами в ближайшее время.</h5>
              </div> : form2
            }
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            {plan_sent ? null :
              <MDBBtn outline color="dark" disabled={pending_plan} onClick={send_plan}>Отправить</MDBBtn>}
            <MDBBtn outline color="dark" onClick={() => setModalPlan(!modalPlan)}>Закрыть</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>

      <MDBRow className="">
        <MDBCol md="12">
          <div className='px-5'>
            <img
              src={program.image}
              alt=""
              className="img-fluid z-depth-2"
              style={{
                zIndex: '2',
                borderRadius: '.25rem',
              }}
            />
          </div>
          <div
            className='.z-depth-1 idab'
            style={{
              width: '100vw',
              padding: '4rem',
              margin: '-1rem 0'
            }}
          >
            <MDBRow className="d-flex justify-content-between align-items-center">
              <MDBCol lg='6' className='text-center text-lg-left'>
                <h2 className="white-text font-weight-bolder">
                  {program.name}
                </h2>
              </MDBCol>
              <MDBCol lg='6' className='text-center text-lg-right'>
                <MDBBtn outline color="white" onClick={() => {
                  setModalProgram(!modalProgram)
                  setPending_program(false)
                }}>Записаться на
                  программу</MDBBtn>
              </MDBCol>
            </MDBRow>
          </div>
          <MDBContainer className='mb-5'>
            <MDBCard className='p-5'>
              <MDBCardBody>
                <div
                  dangerouslySetInnerHTML={{__html: program.full_description}}
                />
                <MDBRow>
                  <MDBCol lg='6' className='text-center'>
                    <MDBBtn className='idab-2' outline color="dark" onClick={() => {
                      setModalProgram(!modalProgram)
                      setPending_program(false)
                    }
                    }>Записаться
                      на
                      программу</MDBBtn>
                  </MDBCol>
                  <MDBCol lg='6' className='text-center'>
                    <MDBBtn outline color="dark" onClick={() => {
                      setModalPlan(!modalPlan)
                      setPending_plan(false)
                    }}>Получить учебный план</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>

            </MDBCard>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  program_data: state.program.program,
  status: state.bids.plan_bid_status,
  program_status: state.bids.program_bid_status
})

export default connect(mapStateToProps, {load_program, program_bid, plan_bid})(ProgramSection);
