import React, {  } from 'react'
import {  NavLink  } from "react-router-dom";
import {  Nav } from "react-bootstrap";



function MyFooter(props) {
  return (
    <>
      <footer className="footer mt-auto py-3">
        <div className="container text-center">
          <Nav.Link as={NavLink} to="/faq" className="text-muted d-inline">
          常見問題
        </Nav.Link>
        <Nav.Link as={NavLink} to="/about" className="text-muted d-inline">
          關於我們
        </Nav.Link>
        </div>
      </footer>
    </>
  )
}

export default MyFooter
