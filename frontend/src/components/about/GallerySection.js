import React from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

import {connect} from 'react-redux'
import GalleryItem from "./GalleryItem";

const GallerySection = ({gallery}) => {
  return (
    <React.Fragment>
      {gallery.map(item => (
        <React.Fragment>
          <MDBRow className="" key={item.id}>
            <MDBCol md="12">
              <div
                className='.z-depth-1 idab'
                style={{
                  width: '100vw',
                  padding: '4rem',
                  margin: '-1rem 0'
                }}
              >
                <h2 className="white-text text-center font-weight-bolder">
                  {item.name}
                </h2>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBContainer>
            <GalleryItem images={item.images}/>
          </MDBContainer>
        </React.Fragment>

      ))}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  gallery: state.about.about_gallery
})

export default connect(mapStateToProps)(GallerySection);