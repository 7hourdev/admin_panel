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
                  <p>HEADER</p>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <LinkContainer to="#" activeClassName="active">
                  <MenuItem  eventKey={1} >Link 1</MenuItem>
                </LinkContainer>
                <LinkContainer to="#" activeClassName="active">
                  <MenuItem  eventKey={2} >Link 2</MenuItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    	</div>
    	)
  }
})