import React, {useState} from "react";
import {MDBContainer, MDBRow, MDBCol} from "mdbreact";
import Lightbox from "react-image-lightbox";
import "../../Lightbox.css";

const GalleryItem = ({images}) => {

  const [state, setState] = useState({
    photoIndex: 0,
    isOpen: false,
  })

  const renderImages = () => {
    let photoIndex = -1;

    return images.map(imageSrc => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="4" key={photoIndex}>
          <figure>
            <img src={imageSrc.tmb} alt={`image-${imageSrc.id}`} className="img-fluid" onClick={() =>
              setState({photoIndex: privateKey, isOpen: true})
            }
            />
          </figure>
        </MDBCol>
      );
    })
  }

  return (
      <MDBContainer>
        <div className="mdb-lightbox">
          <MDBRow>
            {renderImages()}
          </MDBRow>
        </div>
        {state.isOpen && (
          <Lightbox
            mainSrc={images[state.photoIndex].image}
            nextSrc={images[(state.photoIndex + 1) % images.length].image}
            prevSrc={images[(state.photoIndex + images.length - 1) % images.length].image}
            imageTitle={state.photoIndex + 1 + "/" + images.length}
            onCloseRequest={() => setState({...state, isOpen: false})}
            onMovePrevRequest={() =>
              setState({
                ...state,
                photoIndex: (state.photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              setState({
                ...state,
                photoIndex: (state.photoIndex + 1) % images.length
              })
            }
          />
        )}
      </MDBContainer>
    );
}

export default GalleryItem;