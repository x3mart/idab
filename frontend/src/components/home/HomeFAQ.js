import React, {useState} from "react";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard,
  MDBCardBody, MDBIcon, MDBCollapseHeader, MDBCollapse
} from "mdbreact";
import {connect} from 'react-redux'

const HomeFAQ = ({faq}) => {

  const [collapseID, setCollapseID] = useState('')

  const toggleCollapse = id => setCollapseID(collapseID !== id ? id : '')

  const length = Math.ceil(faq.length / 2)

  const chunkArray = (myArray, chunk_size) => {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  const faqs = chunkArray(faq, length)

  const createMarkup = (html) => {
  return {__html: html};
}

  return (
    <div className='idab-2 w-100 z-depth-1'>
      <MDBContainer className='md-accordion py-5'>
        <div className="home-titles">
          <h2>Частые вопросы</h2>
        </div>
        <MDBRow className='mt-3'>

          {faqs.map((group, index) => (
            <MDBCol lg='6' key={index + 1}>
              {group.map((item) => (
                <MDBCard key={item.id+1} style={{minHeight:'104px'}}>
                  <MDBCollapseHeader
                    tagClassName='d-flex justify-content-between'
                    onClick={() => toggleCollapse(`collapse${item.id+1}`)}
                    style={{minHeight:'104px'}}
                  >
                    {item.question}
                    <MDBIcon
                      icon={collapseID === `collapse${item.id+1}` ? 'angle-up' : 'angle-down'}
                    />
                  </MDBCollapseHeader>
                  <MDBCollapse id={`collapse${item.id + 1}`} isOpen={collapseID}>
                    <MDBCardBody>
                      <p dangerouslySetInnerHTML={createMarkup(item.answer)}/>
                    </MDBCardBody>
                  </MDBCollapse>
                </MDBCard>
              ))}
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  faq: state.home.home_faq
})

export default connect(mapStateToProps)(HomeFAQ);