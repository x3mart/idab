import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge
} from 'mdbreact';

class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggleClickA = this.handleToggleClickA.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleToggleClickA() {
    this.props.onSideNavToggleClick();
  }

  render() {
    const navStyle = {
      paddingLeft: this.props.toggle ? '16px' : '240px',
      transition: 'padding-left .3s'
    };
    return (
      <Router>
        <MDBNavbar
          className='flexible-MDBNavbar'
          light
          expand='md'
          scrolling
          fixed='top'
          style={{ zIndex: 3 }}
        >
          <div
            onClick={this.handleToggleClickA}
            key='sideNavToggleA'
            style={{
              lineHeight: '32px',
              marginleft: '1em',
              verticalAlign: 'middle',
              cursor: 'pointer'
            }}
          >
            <MDBIcon icon='bars' color='white' size='lg' />
          </div>

          <MDBNavbarBrand href='/' style={navStyle}>
            <strong>{this.props.routeName}</strong>
          </MDBNavbarBrand>
          <MDBNavbarNav expand='sm' right style={{ flexDirection: 'row' }}>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBBadge color='red' className='mr-2'>
                  3
                </MDBBadge>
                <MDBIcon icon='bell' />{' '}
                <span className='d-none d-md-inline'>Уведомления</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu right style={{ minWidth: '400px' }}>
                <MDBDropdownItem href='#!'>
                  <MDBIcon icon='money-bill-alt' className='mr-2' />
                  New order received
                  <span className='float-right'>
                    <MDBIcon icon='clock' /> 13 min
                  </span>
                </MDBDropdownItem>
                <MDBDropdownItem href='#!'>
                  <MDBIcon icon='money-bill-alt' className='mr-2' />
                  New order received
                  <span className='float-right'>
                    <MDBIcon icon='clock' /> 33 min
                  </span>
                </MDBDropdownItem>
                <MDBDropdownItem href='#!'>
                  <MDBIcon icon='chart-line' className='mr-2' />
                  Your campaign is about to end
                  <span className='float-right'>
                    <MDBIcon icon='clock' /> 53 min
                  </span>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon='user' />{' '}
                <span className='d-none d-md-inline'>Admin</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu right style={{ minWidth: '200px' }}>
                <MDBDropdownItem href='#!'>Выход</MDBDropdownItem>
                <MDBDropdownItem href='#!'>Моя страница</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarNav>
        </MDBNavbar>
      </Router>
    );
  }
}

export default TopNavigation;
