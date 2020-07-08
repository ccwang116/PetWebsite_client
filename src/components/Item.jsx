import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {
  Row,
  Col,
} from "react-bootstrap";

function Item(props) {
  const { data } = props;
  const [tempItem,setTempItem]= useState("");
  // console.log(props)
 
  function addToCart(data) {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    // console.log('currentCart', currentCart)
    const newCart = [...currentCart, data]
    localStorage.setItem('cart', JSON.stringify(newCart))

    // console.log('newCart', newCart)
    
    alert("已加入購物車!");
  }
 
  return (
    <Row className="row-cols-md-4 row-cols-1 mb-5">
      {data.map((value, index) => {
        return (
          <>
            <Col key={index} className=" item-card p-1">
              <a href={`/mall/itemDetail/categoryId=${value.itemCategoryId}?itemId=${value.itemId}`} title={value.itemName}>
                <img src={`/items/${value.itemImg}`} />
              </a>
              <Row>
                <Col title={value.itemName} style={{height:"24px",overflow:"hidden"}} >
                  <span className="itemName ellipsis">
                    {value.itemName}
                  </span>
                </Col>
              </Row>
              <Row className="flex justify-content-between">
                <Col>
                  <span className="msrp">原價${value.MSRP}</span>
                </Col>
                <Col className="text-right">
                  <span className="itemprice">特價${value.itemPrice}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button
                    className="btn btn-primary"
                    onMouseDown={()=>{
                      setTempItem({
                        ...data[index],
                        amount:1
                      })
                    }}
                    onClick={() => {
                      addToCart(tempItem);
                    }}
                  >
                    加入購物車
                  </button>
                </Col>{" "}
              </Row>
            </Col>
          </>
        );
      })}
    </Row>
  );
}

export default withRouter(Item);
