import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Image, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { FaUndo } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";

function Cart(props) {
  const [mycart, setMycart] = useState([]);
  const [mycartDisplay, setMycartDisplay] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(() => {
    const initCart = localStorage.getItem("cart") || "[]";
    const cartJson = JSON.parse(initCart);
    const member = JSON.parse(localStorage.getItem("member")) || [
      { memberName: "", memberId: "" },
    ];

    setMycart(cartJson);
    setMember(member);
    console.log(cartJson);
  }, []);
  useEffect(() => {
    let newMycartDisplay = [];

    console.log("mycart", mycart);

    for (let i = 0; i < mycart.length; i++) {
      const index = newMycartDisplay.findIndex(
        (value) => value.itemId === mycart[i].itemId
      );

      if (index !== -1) {
        newMycartDisplay[index].amount += mycart[i].amount;
      } else {
        const newItem = { ...mycart[i] };
        newMycartDisplay = [...newMycartDisplay, newItem];
      }
    }

    console.log("newMycartDisplay", newMycartDisplay);
    setMycartDisplay(newMycartDisplay);
  }, [mycart]);

  function updateCartToLocalStorage(value) {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const newCart = [...currentCart, value];
    localStorage.setItem("cart", JSON.stringify(newCart));

    setMycart(newCart);
    // for (let i = 0; i < currentCart.length; i++) {
    // if (currentCart[i].itemId == id) {
    //   currentCart[i].amount = 1 + parseInt(currentCart[i].amount);
    //   localStorage.setItem("cart",JSON.stringify(currentCart));
    //   break;
    //   }
    //   }
  }

  function substarctCartToLocalStorage(value) {
    let foundObj = mycart.find((obj) => obj.name === value.name);
    let filtered = mycart.filter((el) => el !== foundObj);
    const newCart = filtered;
    localStorage.setItem("cart", JSON.stringify(newCart));

    setMycart(newCart);
  }

  function sumShipping(items) {
    let shipColdMoney = 0;
    let coldItemTotal = 0;
    let shipRoomMoney = 0;
    let roomItemTotal = 0;
    let shipMoney = 0;
    let shiptotalMoney = 0;

    //計算個別單獨運費
    for (let i = 0; i < items.length; i++) {
      if (items[i].shippingId === "S001") {
        shipColdMoney += 150;
        coldItemTotal += items[i].itemPrice * items[i].amount;
      } else if (items[i].shippingId === "S002") {
        shipRoomMoney += 100;
        roomItemTotal += items[i].itemPrice * items[i].amount;
      } else {
        shipMoney += 0;
      }
    }
    //避免運費重複計算
    if (shipColdMoney > 150) {
      shipColdMoney = 150;
    }
    if (shipRoomMoney > 100) {
      shipRoomMoney = 100;
    }
    //設定滿額免運
    if (coldItemTotal > 1199) {
      shipColdMoney -= 150;
    }
    if (roomItemTotal > 799) {
      shipRoomMoney -= 100;
    }
    //計算運費總額
    shiptotalMoney += shipColdMoney;
    shiptotalMoney += shipRoomMoney;
    shiptotalMoney += shipMoney;
    //先把訂單總金額加上運費=(0+運費)
    return shiptotalMoney;
  }

  // 計算總價用的函式
  function sum(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].itemPrice;
    }
    return total;
  }

  return (
    <>
      <Container className="mt-5">
        <h5 className="text-success ">
          <BsFillPlayFill />
          購買的商品
        </h5>
        <Row className="row-cols-4 mb-2">
          <Col className="p-0 ">
            <button
              type="button"
              className="btn border border-primary w-100 rounded-0 bg-primary"
            >
              購物車
            </button>
          </Col>
          <Col className="p-0">
            <button
              type="button"
              className="btn border border-primary w-100 rounded-0"
            >
              確認結帳
            </button>
          </Col>
          <Col className="p-0">
            <button
              type="button"
              className="btn border border-primary w-100 rounded-0"
            >
              前往付款
            </button>
          </Col>
          <Col className="p-0">
            <button
              type="button"
              className="btn border border-primary w-100 rounded-0"
            >
              完成
            </button>
          </Col>
        </Row>
        <Row>
          <Col sm={9} className="">
            <Table className="cart-table ">
              <thead className="thead-dark2 text-center">
                <tr>
                  <th colSpan={2}>商品</th>
                  {/* <th></th> */}
                  <th>價格</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {mycartDisplay.map((value, index) => (
                  <tr key={index}>
                    <td colSpan={2}>
                      <Image
                        width={50}
                        height={50}
                        className="mr-3"
                        src={`/items/${value.itemImg}`}
                        alt={value.img}
                      />
                      <span className="">{value.itemName}</span>
                    </td>
                    {/* <td></td> */}
                    <td>
                      <p className="text-center">${value.itemPrice}</p>
                    </td>
                    <td>
                      <Row className="justify-content-center">
                        <Col className="text-right col-lg-1">
                          <a
                            href=""
                            onClick={() =>
                              substarctCartToLocalStorage({
                                MSRP: value.MSRP,
                                Size: value.Size,
                                amount: 1,
                                comment: value.comment,
                                created_at: value.created_at,
                                currentOrder: value.currentOrder,
                                discount: value.discount,
                                itemCategoryId: value.itemCategoryId,
                                itemColor: value.itemColor,
                                itemDescription: value.itemDescription,
                                itemId: value.itemId,
                                itemImg: value.itemImg,
                                itemName: value.itemName,
                                itemPrice: value.itemPrice,
                                itemQty: value.itemQty,
                                ranking: value.ranking,
                                shippingId: value.shippingId,
                                updated_at: value.updated_at,
                              })
                            }
                          >
                            {"-"}
                          </a>
                        </Col>
                        <Col className="text-center col-md-auto">
                          {value.amount}
                        </Col>
                        <Col className="text-left col-lg-1">
                          <a
                            href=""
                            onClick={() => {
                              updateCartToLocalStorage({
                                MSRP: value.MSRP,
                                Size: value.Size,
                                amount: 1,
                                comment: value.comment,
                                created_at: value.created_at,
                                currentOrder: value.currentOrder,
                                discount: value.discount,
                                itemCategoryId: value.itemCategoryId,
                                itemColor: value.itemColor,
                                itemDescription: value.itemDescription,
                                itemId: value.itemId,
                                itemImg: value.itemImg,
                                itemName: value.itemName,
                                itemPrice: value.itemPrice,
                                itemQty: value.itemQty,
                                ranking: value.ranking,
                                shippingId: value.shippingId,
                                updated_at: value.updated_at,
                              });
                            }}
                          >
                            {"+"}
                          </a>
                        </Col>
                      </Row>
                    </td>
                    <td>
                      <p className="text-center">
                        ${value.itemPrice * value.amount}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row className="justify-content-end mr-1 mb-3">
              {mycartDisplay.length <= 0 ? (
                <p className="w-100 text-center text-secondary">
                  購物車沒有東西
                </p>
              ) : (
                ""
              )}
              <Button
                className="btn btn-warning"
                onClick={() => localStorage.setItem("page", 1)}
                style={{ width: "212px", height: "36px", borderRadius: "0" }}
              >
                <Link to="/shop" className="text-secondary">
                  繼續購物 <FaUndo />
                </Link>
              </Button>
              {mycartDisplay.length > 0 ? (
                <Button
                  className="btn btn-primary ml-2"
                  variant=""
                  style={{ width: "212px", height: "36px", borderRadius: "0" }}
                  onClick={() => {
                    if (member[0].memberName === "") {
                      props.history.push("/login");
                    } else {
                      localStorage.setItem(
                        "finalCart",
                        JSON.stringify(mycartDisplay)
                      );

                      localStorage.setItem(
                        "shipTotal",
                        sumShipping(mycartDisplay)
                      );
                      localStorage.setItem(
                        "shopTotal",
                        sum(mycartDisplay) + sumShipping(mycartDisplay)
                      );

                      props.history.push("/cart/comfirm");
                    }
                  }}
                >
                  去買單
                </Button>
              ) : (
                ""
              )}
            </Row>
          </Col>

          <Col sm={3} className="">
            <Table className="cart-table">
              <thead className="thead-dark2 text-center">
                <tr>
                  <th>總計</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr >
                  <td>商品小計 ${sum(mycartDisplay)}<br />
                運費 ${sumShipping(mycartDisplay)}
                <br />
                  <span style={{fontWeight:"800",lineHeight:"120px"}}>
                    總金額 ${sum(mycartDisplay) + sumShipping(mycartDisplay)}
                  </span>
                  <p className="text-muted">
                    運費說明：常溫商品滿800免運，未滿需加運費100元;
                    <br />冷凍鮮食商品滿1200免運，未滿需加運費150元。
                  </p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default withRouter(Cart);
