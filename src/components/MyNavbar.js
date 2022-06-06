import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";

function MyNavbar(props) {
  const { menuId, setMenuId } = props;
  const [activeBar, setActiveBar] = useState(0);

  const member = JSON.parse(localStorage.getItem("member")) || [
    { memberName: "" },
  ];
  const menuList = [
    {
      name: "狗食",
      id: 2,
      url_key: "dogfood",
      submenuList: [
        { name: "乾糧", id: 2, url_key: "dogfood" },
        { name: "罐頭", id: 3, url_key: "dogcan" },
        { name: "冷凍食品", id: 4, url_key: "dogwet" },
      ],
    },
    {
      name: "貓食",
      id: 5,
      url_key: "catfood",
      submenuList: [
        { name: "乾糧", id: 5, url_key: "catfood" },
        { name: "罐頭", id: 6, url_key: "catcan" },
        { name: "冷凍食品", id: 7, url_key: "catwet" },
      ],
    },
    {
      name: "健康保健",
      id: 9,
      url_key: "health",
      submenuList: [
        { name: "狗腎臟", id: 8, url_key: "dogkidney" },
        { name: "狗腸胃", id: 9, url_key: "dogstomach" },
        { name: "貓腎臟", id: 10, url_key: "catkidney" },
        { name: "貓腸胃", id: 11, url_key: "catstomach" },
      ],
    },
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
            {menuList.map((menu) => (
              <a
                key={menu.id}
                href={`http://localhost:3000/shop/${menu.url_key}`}
                style={{ position: "relative" }}
                className="nav-link"
                onMouseEnter={() => setActiveBar(menu.id)}
                onMouseLeave={() => setActiveBar(0)}
                onClick={() => {
                  setActiveBar(0);
                  setMenuId(menu.id);
                }}
              >
                {menu.name}
                {activeBar === menu.id && (
                  <div
                    className="d-flex justify-content-center nav-show-box bg-primary"
                    style={slideDownStyle}
                  >
                    {menu.submenuList.map((sub) => (
                      <a
                        className="nav-link"
                        href={`http://localhost:3000/shop/${sub.url_key}`}
                        onClick={() => {
                          setActiveBar(0);
                          setMenuId(sub.id);
                        }}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </a>
            ))}
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
