import React, {useState, useEffect, useRef} from 'react';

import {connect} from 'react-redux'
import {load_event} from '../../redux/actions/events'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon, MDBInput,
  MDBLink, MDBModal, MDBModalBody, MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBView
} from "mdbreact";
import {event_bid} from '../../redux/actions/bids'
import {isNotEmptyObject} from "../../functions";

const EventSection = (props) => {

  const {id} = props.match.params
  const {load_event, event, event_bid, status} = props

  const [data, setData] = useState({});

  useEffect(() => {
    load_event(id)
  }, [])

  useEffect(() => {
    setData(event)
  }, [event])

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  const [error_email, setError_email] = useState({
    status: false,
    text: []
  })
  const [error_name, setError_name] = useState({
    status: false,
    text: []
  })
  const [error_phone, setError_phone] = useState({
    status: false,
    text: []
  })
  const [sent, setSent] = useState(false)
  const [error_data, setError_data] = useState({})
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setError_data({})
    if (status >= 200 && status < 300) {
      setPending(false)
      setSent(true)
    } else if (isNotEmptyObject(status)) {
      setPending(false)
      if (status.request.responseText) {
        setError_data(JSON.parse(status.request.responseText))
      }
    }
  }, [status])

  useEffect(() => {
    if (isNotEmptyObject(error_data)) {
      if ("email" in error_data) {
        setError_email({
          status: true,
          text: error_data.email
        })
      } else {
        setError_email({
          status: false,
          text: []
        })
      }
      if ("name" in error_data) {
        setError_name({
          status: true,
          text: error_data.name
        })
      } else {
        setError_name({
          status: false,
          text: []
        })
      }
      if ("phone" in error_data) {
        setError_phone({
          status: true,
          text: error_data.phone
        })
      } else {
        setError_phone({
          status: false,
          text: []
        })
      }
    }
  }, [error_data])


  const send_bid = () => {
    setPending(true)
    event_bid(email, name, phone, id);
  }

  const [modal, setModal] = useState(false)

  const image_block = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (data.image) {
      if (image_block.current) {
        setWidth(image_block.current.offsetWidth)
        if (width > 0) {
          setHeight(width / 3)
        }
      }
    }
  },)

  useEffect(() => {
    if (data.image) {
      image_block.current.height = height
    }
  }, [height])

  return (
    <React.Fragment>

      <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
        <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold"
                        toggle={() => setModal(!modal)}>Зарегистрироваться на мероприятие</MDBModalHeader>
        <MDBModalBody>
          {pending ?
            <div className='d-flex justify-content-center'>
              <div className="spinner-grow text-idab" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            :
            sent ? <div className='my-5 d-flex flex-column justify-content-center text-center'>
                <MDBIcon far icon="check-circle" size="4x" className='text-success mb-4'/>
                <h3 className='mb-4'>Ваша заявка успешно отправлена</h3>
                <h5>Наши сотрудники свяжутся с Вами в ближайшее время.</h5>
              </div>
              :
              <form className="mx-3 grey-text" onSubmit={(event) => event.preventDefault()}>
                <MDBInput
                  getValue={(v) => {
                    setName(v)
                  }}
                  label="Фамилия Имя Отчество"
                  group
                  type="text"
                  className={error_name.status ? "form-control is-invalid" : ""}
                  value={name}
                >
                  {error_name.text.map((item, i) => (
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
                  className={error_email.status ? "form-control is-invalid" : ""}
                  value={email}
                >
                  {error_email.text.map((item, i) => (
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
                  className={error_phone.status ? "form-control is-invalid" : ""}
                  value={phone}
                >
                  {error_phone.text.map((item, i) => (
                    <div key={i} className="invalid-feedback">
                      {item}
                    </div>
                  ))}
                </MDBInput>
              </form>
          }
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          {sent ? null :
              <MDBBtn outline color="dark" disabled={pending} onClick={send_bid}>Отправить</MDBBtn>}
            <MDBBtn outline color="dark" onClick={() => setModal(!modal)}>Закрыть</MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <MDBRow className="">
        <MDBCol md="12">

          {data.image && <div className='px-5'>
            <div
              ref={image_block}
              className="z-depth-2 position-relative"
              data-test="view"
              style={{
                backgroundImage: 'url(' + data.image + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: height,
                zIndex: '2',
                borderRadius: '.25rem',
                // boxShadow: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)',
              }}
            >
            </div>
          </div>}

          <div
            className='.z-depth-1 idab'
            style={{
              width: '100vw',
              padding: '4rem',
              margin: '-1rem 0'
            }}
          >
            <h2 className="white-text text-center font-weight-bolder">
              {data.title}
            </h2>
          </div>
        </MDBCol>
      </MDBRow>
      <MDBContainer className='mb-5'>
        <MDBCard>
          <MDBCardBody className='p-5'>
            <div className='mb-5'
                 dangerouslySetInnerHTML={{__html: data.body}}
            />
            <MDBRow className='d-flex justify-content-between'>
              <MDBLink to='/events' className='btn btn-outline-dark'><MDBIcon icon="arrow-left" className='mr-2'/>Обратно
                к
                странице событий</MDBLink>
              <MDBBtn onClick={() => setModal(!modal)} className='btn btn-outline-dark'>Зарегистрироваться на
                мероприятие</MDBBtn>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <MDBContainer>

      </MDBContainer>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  event: state.events.single_event,
  status: state.bids.event_bid_status
})

export default connect(mapStateToProps, {load_event, event_bid})(EventSection);