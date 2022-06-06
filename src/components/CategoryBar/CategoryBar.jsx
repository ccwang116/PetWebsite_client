import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setMenuId } from "../../features/menu/productsSlice";

function CategoryBar(props) {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [menuShow, setMenuShow] = useState(true);
  const pathlist = [
    "/shop",
    "/shop/dogfood",
    "/shop/dogcan",
    "/shop/dogwet",
    "/shop/catfood",
    "/shop/catcan",
    "/shop/catwet",
    "/shop/dogkidney",
    "/shop/dogstomach",
    "/shop/catkidney",
    "/shop/catstomach",
  ];
  const pathName = [
    "所有商品",
    "狗飼料",
    "狗罐頭",
    "狗鮮食",
    "貓飼料",
    "貓罐頭",
    "貓鮮食",
    "狗腎臟保健",
    "狗腸胃保健",
    "貓腎臟保健",
    "貓腸胃保健",
  ];

  // 先找出對應的中文詞
  let locationPathname = props.location.pathname;
  const index = pathlist.findIndex((v) => v === locationPathname);

  async function getData() {
    const request = new Request(`http://localhost:3002/category/show/`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();
    console.log("顯示的資料", data);
    // 設定資料
    setMenu(data);
  }

  useEffect(() => {
    getData();
    document.body.offsetWidth > 978 ? setMenuShow(true) : setMenuShow(false);
    console.log(index);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <button
          className="btn btn-primary w-100 navbar-toggler"
          type="button"
          onClick={() => {
            setMenuShow(!menuShow);
          }}
        >
          <span style={{ fontSize: "14pt" }}>
            {pathName[index]}
            <i className="fas fa-sort-down"></i>
          </span>
        </button>
        <div
          className={menuShow ? "" : "collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          <ListGroup>
            {menu.map((value, index) => {
              return (
                <ListGroup.Item key={index} className="list-group-item">
                  <Link
                    to={`${value.linkUrl}`}
                    onMouseDown={() => {
                      dispatch(setMenuId(value.categoryId));
                    }}
                  >
                    {value.categoryName}
                  </Link>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </nav>
    </>
  );
}

export default withRouter(CategoryBar);
