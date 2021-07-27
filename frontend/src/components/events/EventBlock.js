import React, {useEffect, useState} from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBLink,
  MDBTooltip
} from "mdbreact";
import Moment from "react-moment";

const EventBlock = ({item}) => {

  const [views, setViews] = useState(0)

  useEffect(() => {
    setViews(item.view)
  }, [item.view])

  return (
    <MDBCard narrow ecommerce className='mb-2 w-100'>
      <MDBCardBody className='d-flex flex-column justify-content-between'>
        <MDBCardTitle>
          <strong>
            <a href={`/events/${item.id}`}>{item.title}</a>
          </strong>
        </MDBCardTitle>
        <MDBCardText className='my-3'>
          <div className='ml-2 d-table about-event'>
            <div className='d-table-row'>
              <div className='d-table-cell pr-3'>Дата:</div>
              <div className='d-table-cell text-idab'>
                {item.event_date}
              </div>
            </div>
            <div className='d-table-row'>
              <div className='d-table-cell pr-3'>Время:</div>
              <div className='d-table-cell text-idab'>
                {item.event_time}
              </div>
            </div>
            <div className='d-table-row'>
              <div className='d-table-cell pr-3'>Формат:</div>
              <div className='d-table-cell text-idab'>{item.is_online ? 'Онлайн' : 'Оффлайн'}</div>
            </div>
          </div>
        </MDBCardText>
        <MDBCardFooter>
          <MDBLink to={`/events/${item.id}`} className='text-center'>
            <MDBBtn outline color="idab" size="sm">Подробнее</MDBBtn>
          </MDBLink>
          <div className='px-1 event-footer'>
            <div className='event-footer-inner'>
                              <span className='float-left'>
                              <MDBTooltip domElement placement='top'>
                                <i className='grey-text fa fa-eye mr-2'/>
                                <span>Просмотры</span>
                              </MDBTooltip>{views}
                            </span>
            </div>
          </div>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
}

export default EventBlock;