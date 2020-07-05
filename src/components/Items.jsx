import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Pagination,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Item from "./Item";

function Items(props) {
  const { menuId, setMenuId } = props;
  const [data, setData] = useState([]);
  const [pageNow, setPagenow] = useState(1);
  const [pageArr, setPagearr] = useState([1]);
  const [orderby,setOrderby] = useState('')

  async function getData(menuId, page ,orderby) {
    const request = new Request(
      `http://localhost:3002/items/show/${menuId}/${page}/${orderby}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    // console.log("顯示的資料", data);
    // 設定資料
    setData(data);
  }
  //商品幾筆
  async function getPageData(menuId) {
    const request = new Request(
      `http://localhost:3002/items/itempage/${menuId}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    console.log("總共商品幾筆的arr", data);
    // 設定總共幾筆訂單
    setPagearr(data);
  }
  useEffect(() => {
    getData(menuId, 1,orderby);
    getPageData(menuId);
  }, []);
  return (
    <>
      <Row className="flex justify-content-between">
        <Col>
          <select className="" name="" id=""   onChange={(event)=>{getData(menuId,pageNow,event.target.value)}}>
            <option value="">排列順序</option>
            <option value="priceASC">依價格由小到大排列</option>
            <option value="priceDESC">依價格由大到小排列</option>
            <option value="creactedDESC">依最新上架時間排列</option>
          </select>
        </Col>
        <Col>
          <Row>
            <Col style={{ textAlign: "end",fontSize:'9pt'}}>
              {/* 共{data.length}筆結果    */}
              </Col>
              <Col style={{ textAlign: "end",letterSpacing:'3px',fontSize:'9pt' }}>
              <a
                href="#"
                onClick={() => {
                  setPagenow(pageNow - 1);
                  getData(menuId, pageNow - 1,orderby);
                }}
              >
                {"<"}
              </a>
              {pageNow}/{pageArr.length}
              <a
                href="#"
                onClick={() => {
                  let nextnum = 1;
                  if (pageNow + 1 > pageArr.length) {
                    nextnum = 1;
                    setPagenow(1);
                  } else {
                    nextnum = pageNow + 1;
                    setPagenow(pageNow + 1);
                  }

                  getData(menuId, nextnum,orderby);
                }}
              >
                {">"}
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Item data={data} />
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              setPagenow(pageNow - 1);
              getData(menuId, pageNow - 1,orderby);
            }}
          />
          {pageArr.map((value) => {
            return (
              <>
                <Pagination.Item
                  key={value}
                  value={value}
                  active={value === pageNow}
                  onClick={() => {
                    getData(menuId, value,orderby);
                    setPagenow(value);
                  }}
                >
                  {value}
                </Pagination.Item>
              </>
            );
          })}
          <Pagination.Next
            onClick={() => {
              let nextnum = 1;
              if (pageNow + 1 > pageArr.length) {
                nextnum = 1;
                setPagenow(1);
              } else {
                nextnum = pageNow + 1;
                setPagenow(pageNow + 1);
              }

              getData(menuId, nextnum,orderby);
            }}
          />
        </Pagination>
      </div>
    </>
  );
}

export default Items;
