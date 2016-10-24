import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default React.createClass({
  render() {
    return (
    	<div className="home-header">
         <Navbar className="navbar navbar-normal-pages navbar-show">
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="navbar-brand" to="/">
                  <p>7hourdev Admin Panel</p>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="/profile" activeClassName="active">
                  <MenuItem  eventKey={2} >Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to="/logout" activeClassName="active">
                  <MenuItem  eventKey={3} >Log Out</MenuItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    	</div>
    	)
  }
})