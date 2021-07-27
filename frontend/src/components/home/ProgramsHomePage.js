import React, {useEffect, useState} from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography} from "mdbreact";
import {connect} from 'react-redux';
import HomeProgramBlock from "./HomeProgramBlock";

import {load_categories} from '../../redux/actions/programs'

const ProgramsHomePage = ({load_categories, programs}) => {

  const [progs, setProgs] = useState([])

  useEffect(() => {
    load_categories();
  }, [])

  useEffect(() => {
    if(programs) {
      setProgs(programs)
    }
  }, [programs])


  return (
    <div>
      <MDBContainer className="mt-5">
        <div className="home-titles">
          <h2>Программы и специализации</h2>
        </div>
        <MDBRow className="d-flex flex-row">

          {progs.map((item) => (
            <HomeProgramBlock key={item.id} item={item}/>
          ))}

        </MDBRow>
      </MDBContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  programs: state.programs.categories,
});

export default connect(mapStateToProps, {load_categories})(ProgramsHomePage);