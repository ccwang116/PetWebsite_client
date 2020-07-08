import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Image,
  InputGroup,
  Col,
  Card,
  Container,
  Row,
  ListGroup,
  FormControl,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { BsFillPlayFill } from "react-icons/bs";

function ItemDetail(props) {
  const { history } = props;
  const [single, setSingle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cartamount, setCartamount] = useState(1);
  const [tempItem, setTempItem] = useState("");

  //單一商品
  async function getItemsData() {
    let params = new URLSearchParams(props.location.search);
    let itemId = Number(params.get("itemId"));
    const request = new Request(
      `http://localhost:3002/items/detail/${itemId}`,
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
    console.log("商品的資料", data);
    // 設定資料
    setSingle(data[0]);
  }
  useEffect(() => {
    getItemsData();
  }, []);
  function addToCart(data) {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log('currentCart', currentCart)
    const newCart = [...currentCart, data];
    localStorage.setItem("cart", JSON.stringify(newCart));

    // console.log('newCart', newCart)
  }

  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>加入購物車訊息</Modal.Title>
      </Modal.Header>
      <Modal.Body>產品：{single.itemName} 已成功加入購物車</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          繼續購物
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const path = history.location.pathname;
            history.push("/cart");
          }}
        >
          前往購物車結帳
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <div className="container">
        {messageModal}
        <Container className="mt-5 itemDetailAll">
          <Row>
            <Col xs={12} md={3}>
              <h4>所有分類</h4>
              <CategoryBar index={single.itemCategoryId}/>
            </Col>
            <Col xs={12} md={9}>
              <Row>
                <Col xs={12} md={6}>
                  <Image
                    style={{ objectFit: "cover" }}
                    src={`/items/${single.itemImg}`}
                    alt={single.itemImg}
                    thumbnail
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Card class="d-flex">
                    <Card.Body className="card-detail">
                      <Card.Title
                        style={{
                          fontSize: "36px",
                        }}
                      >
                        {single.itemName}
                      </Card.Title>
                      <p className="itemDetail-price">原價${single.MSRP}</p>
                      <h3 className="itemDetail-price">${single.itemPrice}</h3>

                      <select>
                        <option>請選擇商品規格</option>
                        <option>{single.Size}</option>
                      </select>

                      <ListGroup style={{ width: "35%" }}>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <Button
                              className="course-btn"
                              onClick={() => setCartamount(cartamount - 1)}
                            >
                              -
                            </Button>
                          </InputGroup.Prepend>
                          <FormControl
                            style={{
                              textAlign: "center",
                            }}
                            onChange={(event) => {
                              setCartamount(event.target.value);
                            }}
                            value={cartamount < 1 ? 1 : cartamount}
                          />
                          <InputGroup.Append>
                            <Button
                              className="course-btn"
                              onClick={() => setCartamount(cartamount + 1)}
                            >
                              +
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </ListGroup>

                      <div className="cart-btn">
                        <Button
                          className="btn btn-primary text-white w-100"
                          onMouseDown={() => {
                            setTempItem({
                              ...single,
                              amount: cartamount,
                            });
                          }}
                          onClick={() => {
                            addToCart(tempItem);
                            handleShow();
                          }}
                        >
                          add to cart
                          <i
                            class="fas fa-shopping-cart"
                            style={{ marginLeft: "8px" }}
                          ></i>
                        </Button>

                        <Button
                          className="btn btn-outline-secondary  w-100 mt-2 text-secondary"
                          style={{ background: "transparent" }}
                        >
                          add to favtorite
                          <i
                            class="fas fa-heart"
                            style={{ marginLeft: "8px" }}
                          ></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: "15px 0" }}>
                  <h4 style={{ width: "100%" }}>
                    <BsFillPlayFill />
                    商品詳情
                  </h4>
                  <Card body>{single.itemDescription}</Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: "15px 0" }}>
                  <h4 style={{ width: "100%" }}>
                    <BsFillPlayFill />
                    商品規格
                  </h4>
                  <Card body>
                    成分：鮭魚，油鯡魚粉，鯡魚粉，豌豆，菜籽油（以維生素E及檸檬酸保存），鮭魚粉，木薯，乾燥番茄碎粒，天然香料，鮭魚油，蒙脫石粘土（協助吸附黴菌和有害細菌，加強粘膜保護），鹽，氯化鉀，紅蘿蔔，蘋果，蔓越莓，氯化膽鹼，維生素群（L-抗壞血酸-2-多聚磷酸鹽，維生素E，菸鹼酸，維生素B1，維生素B5，維生素A，維生素B2，維生素B6，維生素B12，維生素B9，維生素D3，維生素B7），礦物質（鋅蛋白鹽，鐵蛋白鹽，銅蛋白鹽，錳蛋白鹽，亞硒酸鈉，乙二胺二氫碘化物），凍乾鱈魚，乾燥芽孢乳酸菌，迷迭香萃取物。
                    <br />營養分析： 粗蛋白(最少)37.5％ 粗脂肪(最少)20.0％
                    <br />粗纖維(最多)3.5％ 水分(最多)10.0％ 維生素E(最少)100IU／kg
                    <br />維生素C(最少)85mg／kg Omega-3脂肪酸(最少)1.8％
                    <br />Omega-6脂肪酸(最少)2.7％ 熱量(代謝能量)4450大卡／公斤
                  </Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: "15px 0" }}>
                  <h4 style={{ width: "100%" }}>
                    <BsFillPlayFill />
                    運送及其他規則
                  </h4>
                  <Card body>
                  運費說明：常溫商品滿800免運，未滿需加運費100元；冷凍鮮食商品滿1200免運，未滿需加運費150元。
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default withRouter(ItemDetail);
