import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
function DoctorListCard(props) {
  const { data } = props;
  

  return (
    <>
      <div class="row">
        <Table
          className="membercenterlist "
          style={{ border: "1px solid #4E95A1" }}
        >
          <thead>
            <tr>
              <th>序號</th>
              <th>醫師</th>
              <th>科別</th>
              <th>看診時間</th>
              <th>已預約人數</th>
              <th>剩餘名額</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{value.ArrangeId}</td>
                    <td>{value.DoctorName}</td>
                    <td>{value.DepartmentName}</td>
                    <td>{value.ArrangeTime}</td>
                    <td>{value.Parent.length}</td>
                    <td>{value.MaxAmount - value.Parent.length}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div className=" d-flex justify-content-end">
          <button className="btn btn-primary mb-3">Edit</button>
        </div>
      </div>
    </>
  );
}
export default DoctorListCard;
