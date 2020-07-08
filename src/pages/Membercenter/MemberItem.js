import React, {  useEffect } from "react";
import { Table, Row, Col,  Image } from "react-bootstrap";

function MemberItem(props) {
  const { member, isedit, setIsedit, ischangepwd, setIschangepwd } = props;
  useEffect(() => {
  });
  return (
    <>
      <Col md={3} xs={12}>
        <Table  className="membercenterlist" style={{border:"1px solid #4E95A1"}}>
          <thead>
            <tr>
              <th>頭像</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td colSpan={4}>
                <Row className="row-cols-2">
                  <Col>
                  <Image
                  style={{ width: "100px", height: "100px",objectFit:"cover" }}
                  src={`http://localhost:3002/img-uploads/${member.memberImg}`}
                  alt={member.memberImg}
                  roundedCircle
                />
                  </Col>
                  <Col><div>等級：貓奴</div></Col>
                </Row>
                
                
              </td>
            </tr>
          
          </tbody>
        </Table>
      </Col>
      <Col
        md={7}
        xs={12}
        className="mb-5"
      >
        <Table className="membercenterlist "style={{border:"1px solid #4E95A1"}}>
          <thead>
            <tr>
              <th>會員帳號(email)</th>
              <th>會員密碼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{member.email}</td>
              <td>
                ******
                <a href="#"onClick={() => setIschangepwd(!ischangepwd)}>
                  修改
                </a>
              </td>
            </tr>
          </tbody>
          <thead>
            <th>姓名</th>
            <th>聯絡電話</th>
          </thead>
          <tbody>
            <td>{member.memberName}</td>
            <td>{member.phone}</td>
          </tbody>
          <thead>
            <tr>
              <th>住址所在地</th>
              <th>詳細地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {member.paymentCity}
                {member.paymentDistrict}
              </td>
              <td>{member.shipAddress}</td>
            </tr>
          </tbody>
          <thead>
            <th>會員等級</th>
            <th>會員加入時間</th>
          </thead>
          <tbody>
            <td>{member.class}</td>
            <td>{member.created_at}</td>
          </tbody>
        </Table>
        <div className=" d-flex justify-content-end">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setIsedit(!isedit)}
          >
            Edit
          </button>
        </div>
      </Col>
    </>
  );
}
export default MemberItem;
