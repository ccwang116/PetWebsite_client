import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'

const Faq = () => (
  <div className="container">
    <div className="py-4">
      <h4 className="grass text-center fs-32 mb-3">常見問題集Q&A</h4>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Q1：如何註冊為會員?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              請點選右上角的「登入|註冊」或人形圖示（若您用手機瀏覽），再點選「註冊帳號」並依畫面指示填寫資料，最後到您註冊的Email信箱中收取確認信即可。
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Q2：PETFEED提供那些付款方式?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              我們提供以下付費方式：
              「信用卡」、「ATM轉帳」、「貨到付款」、「7-11
              ibon付款」、「超商取貨付款」；另針對行動裝置提供四種行動支付：「Apple
              Pay」、「Google Pay」、「LINE Pay」、「Samsung
              Pay」。目前尚無臨櫃匯款、支票和現金等方式。
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Q3：訂購商品需要先加入會員嗎?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              本站希望能全心服務每一位客人，為了避免客人後續服務的品質受影響，希望訂購商品前能先加入會員，感謝您的配合。
            </Card.Body>
          </Accordion.Collapse>
        </Card>

       

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              Q4：今天訂購的商品可以明天到貨嗎? 我急著使用!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              本站的出貨時間為，下單後起計算3個工作日，若您有急需使用的商品，建議您提前1-2天訂購較妥，以免忙中有誤，造成您的不便請見諒。
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        
      </Accordion>
      
    </div>
  </div>
)

export default Faq
