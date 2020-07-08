import React, {  } from "react"
import {  Col } from "react-bootstrap"
import MemberSideLink from "./MemberSideLink"
import ItemTracking from ".././ItemTracking/ItemTracking"
import MyBreadcrumb from '../../components/MyBreadcrumbForMember'


function MemberItemtrack(props) {
  
  return (
    <>
    <MyBreadcrumb />
      <MemberSideLink>
        <Col md={10} className="mb-5" 
            style={{
            background: 'white',
            padding: '0',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
        <ItemTracking/>
        </Col>
      </MemberSideLink>
    </>
  )
}
export default MemberItemtrack