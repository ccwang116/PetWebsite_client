import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import MainContent from "./components/MainContent";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductList from "./pages/ProductList/ProductList";
import ItemDetail from "./pages/ItemDetail/ItemDetail";

import ItemTracking from "./pages/ItemTracking/ItemTracking";

import CartComfirm from "./pages/Cart/CartComfirm";
import CartComfirmChange from "./pages/Cart/CartComfirmChange";
import CartComplete from "./pages/Cart/CartComplete";
import CartPayment from "./pages/Cart/CartPayment";
import Cart from "./pages/Cart/Cart";

import Membercenter from "./pages/Membercenter/Membercenter";
import Coupon from "./pages/Membercenter/Coupon";
import MemberOrders from "./pages/Membercenter/MemberOrders";
import MemberItemtrack from "./pages/Membercenter/MemberItemTrack";

import Login from "./pages/login/login";
import MyWelcome from "./pages/login/welcome";
import MyRegister from "./pages/login/register";
import MyForgetPwd from "./pages/login/forgetPwd";
import Faq from "./pages/Faq";
import Marketing from "./pages/Marketing";

import NotFoundPage from "./pages/NotFoundPage";
import MemberLogin from "./pages/MemberLogin";

import ProtectedRoute from "./utils/ProtectedRoute";

import Appointment from "./pages/Clinic/Appointment";

function App() {
  //類別用
  // const [menuId,setMenuId]=useState('1')
  function setMenuId(number) {
    localStorage.setItem("menuId", number);
  }
  const menuId = localStorage.getItem("menuId") || "1";

  return (
    <Router>
      <>
        <MyNavbar menuId={menuId} setMenuId={setMenuId} />
        <MainContent>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/shop/:second?/:third?/:fourth?/:page?">
              <ProductList menuId={menuId} setMenuId={setMenuId} />
            </Route>
            <Route path="/mall/itemDetail/:second?/:third?/:fourth?/:fifth?/:sixth?/:seventh?/:page?">
              <ItemDetail />
            </Route>

            <Route path="/appointment" exact>
              <Appointment />
            </Route>

            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/cart/comfirm" exact>
              <CartComfirm />
            </Route>
            <Route path="/cart/comfirm/change">
              <CartComfirmChange />
            </Route>
            <Route path="/cart/complete">
              <CartComplete />
            </Route>
            <Route path="/cart/payment">
              <CartPayment />
            </Route>

            {/* <Route path="/welcome">
              <MyWelcome logoutProcess={logoutProcess} />
            </Route> */}

            <Route path="/register">
              <MyRegister />
            </Route>

            <Route path="/forgetpwd">
              <MyForgetPwd />
            </Route>

            <Route path="/memberorders">
              <MemberOrders />
            </Route>
            <Route exact path="/membercenter">
              <Membercenter />
            </Route>
            <Route exact path="/membercenter/coupon">
              <Coupon />
            </Route>
            <Route exact path="/membercenter/memberorders">
              <MemberOrders />
            </Route>
            <Route exact path="/membercenter/memberitemtracking">
              <MemberItemtrack />
            </Route>
            <Route exact path="/life/marketing">
              <Marketing />
            </Route>

            <Route exact path="/">
              <Home menuId={menuId} setMenuId={setMenuId} />
            </Route>
            <Route exact path="/faq">
              <Faq />
            </Route>
            <Route exact path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </MainContent>
        <MyFooter />
      </>
    </Router>
  );
}

export default App;
