import React, {useState} from 'react';
import {
  MDBAvatar,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import {connect} from "react-redux";

const HomeTestimonialBlock = ({name, company, position, avatar, body, video}) => {

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal);
  }

  const truncate = (str) => {
    return str.length > 35 ? str.substring(0, 32) + "..." : str;
  }

  return (
    <React.Fragment>

      <MDBModal isOpen={modal} toggle={toggle} centered size='lg'>
        <MDBModalHeader toggle={toggle} className='idab'>
        </MDBModalHeader>
        <MDBModalBody>
          <h4>{name}</h4>
          <h6>{position}</h6>
          <hr/>
          <p className='small'>{body}</p>
          {video && <React.Fragment>
            <hr/>
            <iframe className="z-depth-2 video-al" src={`https://www.youtube.com/embed/${video}`} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
          </React.Fragment>}

        </MDBModalBody>
      </MDBModal>


      <div className='w-100 z-depth-2 mb-3' style={{borderRadius: '.25rem', cursor: 'pointer'}} onClick={toggle}>
        <div className='d-flex'>
          <MDBAvatar className="white m-2">
            <img
              src={avatar}
              alt=""
              height="75px"
              width="75px"
              className="rounded-circle img-fluid"
            />
          </MDBAvatar>
          <div className='ml-2'>
            <h5 className="mt-2 m-0">{name}</h5>
            <p className="small mb-2">{company}</p>
            <p className='m-0'><MDBIcon icon="quote-right" className='mr-2'/>{truncate(body)}</p>
          </div>
        </div>
      </div>

    </React.Fragment>
  );


}

const mapStateToProps = state => ({
  testimonials: state.home.home_testimonials,
});

export default connect(mapStateToProps)(HomeTestimonialBlock);