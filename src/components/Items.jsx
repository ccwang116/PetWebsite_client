import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Item from "./Item";

function Items(props) {
  const { menuId } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [pageNow, setPagenow] = useState(1);
  const [pageArr, setPagearr] = useState([1]);
  const [orderby, setOrderby] = useState("");
  //search start---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tempData, setTempData] = useState([]);

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClickSearch = (searchTerm) => {
    const results = searchResults.filter((onething) =>
      JSON.stringify(onething).includes(searchTerm)
    );
    results.length === 0
      ? console.log("沒有資料", searchResults)
      : setData(results);
    const finalpage = Math.ceil(results.length / 5);
    const arr = [];
    for (let i = 1; i <= finalpage; i++) {
      arr.push(i);
    }
    setPagearr([1]);
  };
  const handleClickSearchOrder = (searchTerm) => {
    const results = tempData.filter((onething) =>
      JSON.stringify(onething).includes(searchTerm)
    );
    results.length === 0 ? console.log("沒有資料", results) : setData(results);
    const finalpage = Math.ceil(results.length / 5);
    const arr = [];
    for (let i = 1; i <= finalpage; i++) {
      arr.push(i);
    }
    setPagearr([1]);
  };
  async function getSearchData(menuId, page, orderby) {
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
    // 設定資料
    setSearchResults(data);
  }
  //search end------
  async function getData(menuId, page, orderby) {
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
    setTempData(data);
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
    // console.log("總共商品幾筆的arr", data);
    // 設定總共幾筆
    setPagearr(data);
  }
  useEffect(() => {
    getData(menuId, 1, "");
    getPageData(menuId);
    getSearchData(menuId, 1, "");
  }, [menuId]);
  const searchicon = {
    borderRadius: "5px 0 0 5px",
    width: "20%",
    height: "100%",
    border: "1px solid #4E95A1",
    borderRight: "none",
    color: "#cccccc",
    padding: "0",
  };
  const searchbar = {
    borderRadius: "0 5px 5px 0",
    width: "80%",
    height: "100%",
    background: "transparent",
    border: "1px solid #4E95A1",
    borderLeft: "none",
    color: "#4E95A1",
  };
  const inputshow = (
    <Form
      inline
      style={{ width: "166px", height: "30px" }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Button
        variant="outline-success"
        style={searchicon}
        onClick={() => {
          handleClickSearch(searchTerm);
        }}
      >
        <i class="fas fa-search"></i>
      </Button>
      <FormControl
        type="text"
        placeholder="搜尋商品"
        onChange={(event) => {
          handleChangeSearch(event);
        }}
        onKeyPress={(event) => {
          // 處理按下 Enter鍵
          if (event.key === "Enter" && event.target.value !== "") {
            handleClickSearch(searchTerm);
          }
        }}
        className="outline-success"
        style={searchbar}
      />
    </Form>
  );
  return (
    <>
      <Row className="flex justify-content-between row-cols-xs-1">
        <Col className="d-flex  flex-wrap">
          <select
            className="text-success"
            name=""
            id=""
            onChange={(event) => {
              getData(menuId, pageNow, event.target.value);
            }}
            style={{
              borderRadius: "5px",
              background: "transparent",
              border: "1px solid #4E95A1",
              color: "#4E95A1",
            }}
          >
            <option value="">排列順序</option>
            <option value="priceASC">依價格由小到大排列</option>
            <option value="priceDESC">依價格由大到小排列</option>
            <option value="creactedDESC">依最新上架時間排列</option>
          </select>
          {inputshow}
        </Col>
        <Col>
          <Row>
            {/* <Col style={{ textAlign: "end",fontSize:'9pt'}}> */}
            {/* 共{data.length}筆結果    */}

            {/* </Col> */}
            <Col
              style={{
                textAlign: "end",
                letterSpacing: "3px",
                fontSize: "9pt",
              }}
            >
              <a
                href="#"
                onClick={() => {
                  setPagenow(pageNow - 1);
                  getData(menuId, pageNow - 1, orderby);
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

                  getData(menuId, nextnum, orderby);
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
              getData(menuId, pageNow - 1, orderby);
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
                    getData(menuId, value, orderby);
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

              getData(menuId, nextnum, orderby);
            }}
          />
        </Pagination>
      </div>
    </>
  );
}

export default Items;
