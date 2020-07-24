import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import doctorData from "./doctorData";
import DoctorListCard from "../../components/Clinic/DoctorListCard";
import MonthCard from "../../components/Clinic/MonthCard";

function Appointment(props) {
  const { history } = props;
  const [data, setData] = useState([]);
  const [isshow, setIsshow] = useState(-1);
  const [name, setName] = useState("");
  const [activeNumber, setActiveNumber] = useState(0);
  const [calenderShow, setCalenderShow] = useState(-1);


  const dayArr = ["日", "一", "二", "三", "四", "五", "六"];

  //search---
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  //search start----
  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
    props.history.push("/appointment");
  };
  const handleClickSearch = (searchTerm) => {
    const results = searchData.filter((oneorder) =>
      JSON.stringify(oneorder).includes(searchTerm)
    );
    results.length === 0 ? console.log("沒有資料", data) : setData(results);
    props.history.push("/appointment");
  };
  const Patientlist = {
    position: "absolute",
    right: "10px",
    top: "10px",
    width: "50%",
    fontSize: "12pt",
    padding: "5px",
  };

  // const [infoArr, setInfoArr] = useState([]);
  useEffect(() => {
    setData(doctorData);
    setSearchData(doctorData);
    // console.log(doctorData);
  }, []);

  function arrangeNewPeople(index, name) {
    let newarr = data;
    newarr[index].Patient.push(name);
    setData(newarr);
    alert("預約成功!");
    props.history.push("/appointment");
  }
  function deletePeople(index, name) {
    let newarr = data;
    newarr[index].Patient.pop(name);
    setData(newarr);
    alert("已取消!");
    props.history.push("/appointment");
  }

  const info = data.map((value, index) => {
    let atime = Date.parse(value.ArrangeTime);
    let month = new Date(atime).getMonth() + 1;
    let date = new Date(atime).getDate();
    let day = new Date(atime).getDay();
    let dayornight = value.ArrangeTime.substr(11,2)


    return (
      <>
        <p>
          {month}/{date}({dayArr[day]}){dayornight}:00
        </p>
        <p>{value.DoctorName}</p>
        <p>{value.ArrangeId}</p>
        <p>{value.DepartmentName}</p>
        <p>已預約：{value.Patient.length}</p>
        {isshow === index ? (
          <div className="bg-success text-white" style={Patientlist}>
            門診名單：{value.Patient.map((value) => value + ",")}
          </div>
        ) : (
          ""
        )}
        <p>剩餘：{value.MaxAmount - value.Patient.length}</p>
        <div className="row justify-content-between">
          <div className="col">
          <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            arrangeNewPeople(index, name);
          }}
        >
          預約
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            deletePeople(index, name);
          }}
        >
          取消
        </button>
          </div>
          <div className="col">
          <a
          href="#"
          className=""
          onMouseEnter={() => setIsshow(index)}
          onMouseLeave={() => setIsshow(-1)}
          className="position-relative"
        >
          查看名單
        </a>
          </div>
        </div>
        
        
      </>
    );
  });
  const activeStyle = {
    width: "120px",
    height: "44px",
    color: "#4E95A1",
    background: "#FFCC84",
    borderBottom: "2px solid #C5895A",
  };
  const topButtonStyle = { width: "120px", height: "44px", color: "#4E95A1" };

  return (
    <>
      <h2>本月看診日期</h2>
      <p>{name}您好 </p>
      <div className="row">
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="">預約姓名</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={(event) => setName(event.target.value)}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "44px",
          marginBottom: "32px",
          borderBottom: "2px solid #cccccc",
        }}
      >
        <button
          className="btn"
          style={activeNumber === 0 ? activeStyle : topButtonStyle}
          onMouseDown={() => {
            setSearchTerm("");
            setActiveNumber(0);
          }}
          onClick={() => {
            handleClickSearch(searchTerm);
          }}
        >
          全部
        </button>
        <button
          className="btn"
          style={activeNumber === 1 ? activeStyle : topButtonStyle}
          onMouseDown={() => {
            setSearchTerm("王東堯");
            setActiveNumber(1);
          }}
          onClick={() => {
            handleClickSearch(searchTerm);
          }}
        >
          王東堯
        </button>
        <button
          className="btn"
          style={activeNumber === 2 ? activeStyle : topButtonStyle}
          onMouseDown={() => {
            setSearchTerm("林怡君");
            setActiveNumber(2);
          }}
          onClick={() => {
            handleClickSearch(searchTerm);
          }}
        >
          林怡君
        </button>
        <button
          className="btn"
          style={activeNumber === 3 ? activeStyle : topButtonStyle}
          onMouseDown={() => {
            setSearchTerm("邱宏仁");
            setActiveNumber(3);
          }}
          onClick={() => {
            handleClickSearch(searchTerm);
          }}
        >
          邱宏仁
        </button>
        <button
          className="btn"
          style={activeNumber === 4 ? activeStyle : topButtonStyle}
          onMouseDown={() => {
            setSearchTerm("邱威智");
            setActiveNumber(4);
          }}
          onClick={() => {
            handleClickSearch(searchTerm);
          }}
        >
          邱威智
        </button>
      </div>
      <div className="row row-cols-4">
        {info.map((value, index) => {
          return <div key={index} className="col doctorinfo">{value}</div>;
        })}
      </div>
      <div
        style={{
          width: "100%",
          height: "44px",
          marginBottom: "32px",
          borderBottom: "2px solid #cccccc",
        }}
      >
        <button
          className="btn"
          style={topButtonStyle}
          onClick={() => {
            setCalenderShow(0);
          }}
        >
          預設
        </button>
        <button
          className="btn"
          style={topButtonStyle}
          onClick={() => {
            setCalenderShow(1);
          }}
        >
          月曆測試
        </button>
        <button
          className="btn"
          style={topButtonStyle}
          onClick={() => {
            setCalenderShow(2);
          }}
        >
          純列表展示
        </button>
        
      </div>
      {calenderShow===2?<DoctorListCard data={data}/>:""}
      {calenderShow===1?<MonthCard />:""}
      
      
    </>
  );
}
export default withRouter(Appointment);
