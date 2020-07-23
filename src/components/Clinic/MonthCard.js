import React, { useState, useEffect } from "react";
function MonthCard(props) {
  const [daysArr, setDaysArr] = useState([]);
  
  const [allday, setAllday] = useState({sun:[],mon:[],tue:[],wed:[],thu:[],fri:[],sat:[]});


  const today = new Date();
  const dayObj = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: today.getDay(),
  };

  function whatDayis(datetime) {
    const milliseconds = Date.parse(datetime);
    const date = new Date(milliseconds);
    return date.getDay();
  }
  function getDaysinMonth(Y, M) {
    let tempArr = [];
    const days = new Date(Y, M, 0).getDate();
    const firstday = whatDayis(Y, M, 1)
    for (let i = 0; i < days; i++) {
      tempArr.push({
        year: Y,
        month: M,
        date: i + 1,
        day: firstday + i,
      });
    }
    setDaysArr(tempArr);
    weekShow(tempArr)
    console.log(tempArr)

  }
  function weekShow(Arr){
    let sunArr=[],monArr=[],tueArr=[],wedArr=[],thuArr=[],friArr=[],satArr=[]
    // let monArr=[]
    Arr.map((value, index) => {
      if(value.day % 7 === 0){sunArr.push(value.date)
      }else if(value.day % 7 === 1){
        monArr.push(value.date)
      }else if(value.day % 7 === 2){
        tueArr.push(value.date)
      }else if(value.day % 7 === 3){
        wedArr.push(value.date)
      }else if(value.day % 7 === 4){
        thuArr.push(value.date)
      }else if(value.day % 7 === 5){
        friArr.push(value.date)
      }else if(value.day % 7 === 6){
        satArr.push(value.date)
      }})
      setAllday({sun:sunArr,mon:monArr,tue:tueArr,wed:wedArr,thu:thuArr,fri:friArr,sat:satArr})
      // setSundaysArr(sunArr)
      // console.log(sunArr)
  }
  useEffect(() => {
    getDaysinMonth(dayObj.year, dayObj.month);
  }, []);
  return (
    <>
      <h1>本月班表</h1>

      <div className="d-flex">
        <p>{today.getFullYear()}年</p>
        <p>{today.getMonth() + 1}月</p>
      </div>

      <div class="row row-cols-12">
        <div class="col">日</div>
        <div class="col">一</div>
        <div class="col">二</div>
        <div class="col">三</div>
        <div class="col">四</div>
        <div class="col">五</div>
        <div class="col">六</div>
      </div>
      <div class="row row-cols-12">
        <div class="col">{allday.sun[0]}</div>
        <div class="col">{allday.mon[0]}</div>
        <div class="col">{allday.tue[0]}</div>
        <div class="col">{allday.wed[0]}</div>
        <div class="col">{allday.thu[0]}</div>
        <div class="col">{allday.fri[0]}</div>
        <div class="col">{allday.sat[0]}</div>
      </div>
      <div class="row row-cols-12">
        <div class="col">{allday.sun[1]}</div>
        <div class="col">{allday.mon[1]}</div>
        <div class="col">{allday.tue[1]}</div>
        <div class="col">{allday.wed[1]}</div>
        <div class="col">{allday.thu[1]}</div>
        <div class="col">{allday.fri[1]}</div>
        <div class="col">{allday.sat[1]}</div>
      </div>
      <div class="row row-cols-12">
        <div class="col">{allday.sun[2]}</div>
        <div class="col">{allday.mon[2]}</div>
        <div class="col">{allday.tue[2]}</div>
        <div class="col">{allday.wed[2]}</div>
        <div class="col">{allday.thu[2]}</div>
        <div class="col">{allday.fri[2]}</div>
        <div class="col">{allday.sat[2]}</div>
      </div>
      <div class="row row-cols-12">
        <div class="col">{allday.sun[3]}</div>
        <div class="col">{allday.mon[3]}</div>
        <div class="col">{allday.tue[3]}</div>
        <div class="col">{allday.wed[3]}</div>
        <div class="col">{allday.thu[3]}</div>
        <div class="col">{allday.fri[3]}</div>
        <div class="col">{allday.sat[3]}</div>
      </div>
      <div class="row row-cols-12">
        <div class="col">{allday.sun[4]}</div>
        <div class="col">{allday.mon[4]}</div>
        <div class="col">{allday.tue[4]}</div>
        <div class="col">{allday.wed[4]}</div>
        <div class="col">{allday.thu[4]}</div>
        <div class="col">{allday.fri[4]}</div>
        <div class="col">{allday.sat[4]}</div>
      </div>
    </>
  );
}
export default MonthCard;
