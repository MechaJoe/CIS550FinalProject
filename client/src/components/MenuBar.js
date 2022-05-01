/* eslint-disable */
import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">MusicBar</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink active href="/">
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/song">
                Songs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/artist" >
                Artists
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar
