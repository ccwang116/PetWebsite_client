import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";

function MyNavbar(props) {
  const { menuId, setMenuId } = props;
  const [dogShow, setDogShow] = useState(false);
  const [catShow, setCatShow] = useState(false);
  const [healthShow, setHealthShow] = useState(false);

  const member = JSON.parse(localStorage.getItem("member")) || [
    { memberName: "" },
  ];

  const slideDownStyle = {
    position: "absolute",
    // width: "185px",
    left: "0",
    top: "5px",
    // border: "1px solid #cccccc",
    whiteSpace: "nowrap",
    borderRadius: "1px",
    lineHeight: "12px",
    zIndex: "100",
    transform: "translate(-35%, 30px)",
  };
  const loginButton = (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          props.history.push("/login");
        }}
      >
        登入
      </Button>
    </>
  );
  const logoutButton = (
    <>
      <span style={{ color: "#ffffff" }}>{member[0].memberName}, 你好</span>
      <Button
        variant="outline-light"
        onClick={() => {
          props.history.push("/login");
        }}
      >
        登出
      </Button>
    </>
  );

  const displayButton =
    member[0].memberName !== "" ? logoutButton : loginButton;

  return (
    <>
      <Navbar
        variant={"dark"}
        fixed="top"
        className="d-flex justify-content-between bg-secondary"
        style={{ height: "63px" }}
      >
        <Navbar.Brand href="/">PET FEED</Navbar.Brand>
        <div>
          <Nav className="mr-auto">
            <a
              href="http://localhost:3000/shop/dogfood"
              style={{ position: "relative" }}
              className="nav-link"
              onMouseEnter={() => setDogShow(true)}
              onMouseLeave={() => setDogShow(false)}
              onClick={() => {
                setDogShow(false);
                setMenuId(2);
              }}
            >
              狗食
              {dogShow ? (
                <div
                  className="d-flex justify-content-center nav-show-box bg-primary"
                  style={slideDownStyle}
                >
                  <a
                    className="nav-link"
                    href="http://localhost:3000/shop/dogfood"
                    onClick={() => {
                      setDogShow(false);
                      setMenuId(2);
                      // localStorage.setItem("page", 1);
                    }}
                  >
                    乾糧
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/dogcan"
                    onClick={() => {
                      setDogShow(false);
                      setMenuId(3);
                    }}
                  >
                    罐頭
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/dogwet"
                    onClick={() => {
                      setDogShow(false);
                      setMenuId(4);
                    }}
                  >
                    冷凍食品
                  </a>
                </div>
              ) : (
                ""
              )}
            </a>

            <a
              href="http://localhost:3000/shop/catfood"
              style={{ position: "relative" }}
              className="nav-link"
              onMouseEnter={() => setCatShow(true)}
              onMouseLeave={() => setCatShow(false)}
              onClick={() => {
                setCatShow(false);
                setMenuId(5);
              }}
            >
              貓食
              {catShow ? (
                <div
                  className="d-flex justify-content-center nav-show-box bg-primary"
                  style={slideDownStyle}
                >
                  <a
                    className="nav-link"
                    href="http://localhost:3000/shop/catfood"
                    onClick={() => {
                      setCatShow(false);
                      setMenuId(5);
                      // localStorage.setItem("page", 1);
                    }}
                  >
                    乾糧
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/catcan"
                    onClick={() => {
                      setCatShow(false);
                      setMenuId(6);
                    }}
                  >
                    罐頭
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/catwet"
                    onClick={() => {
                      setCatShow(false);
                      setMenuId(7);
                    }}
                  >
                    冷凍食品
                  </a>
                </div>
              ) : (
                ""
              )}
            </a>

            <a
              href="http://localhost:3000/shop/catfood"
              style={{ position: "relative" }}
              className="nav-link"
              onMouseEnter={() => setHealthShow(true)}
              onMouseLeave={() => setHealthShow(false)}
              onClick={() => {
                setHealthShow(false);
                setMenuId(9);
              }}
            >
              健康保健
              {healthShow ? (
                <div
                  className="d-flex justify-content-center nav-show-box bg-primary"
                  style={slideDownStyle}
                >
                  <a
                    className="nav-link"
                    href="http://localhost:3000/shop/dogkidney"
                    onClick={() => {
                      setHealthShow(false);
                      setMenuId(8);
                      // localStorage.setItem("page", 1);
                    }}
                  >
                    狗腎臟保健
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/dogstomach"
                    onClick={() => {
                      setHealthShow(false);
                      setMenuId(9);
                    }}
                  >
                    狗腸胃保健
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/catkidney"
                    onClick={() => {
                      setHealthShow(false);
                      setMenuId(10);
                    }}
                  >
                    貓腎臟保健
                  </a>
                  <a
                    className="nav-link"
                    href="/shop/catstomach"
                    onClick={() => {
                      setHealthShow(false);
                      setMenuId(11);
                    }}
                  >
                    貓腸胃保健
                  </a>
                </div>
              ) : (
                ""
              )}
            </a>
            <a className="nav-link" href="/appointment">
              合作診所
            </a>
            <a className="nav-link" href="/gcalendar.html">
              寵物美容行程
            </a>
          </Nav>
        </div>
        {/* <Nav.Link as={NavLink} to="/faq">
          常見問題
        </Nav.Link>
        <Nav.Link as={NavLink} to="/about">
          關於我們
        </Nav.Link> */}
        <div>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/membercenter">
              <i className="fas fa-user-alt"></i>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" style={{ width: "44px" }}>
              <i className="fas fa-sign-in-alt"></i>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}

export default withRouter(MyNavbar);
