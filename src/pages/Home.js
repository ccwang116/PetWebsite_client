import React from "react";
import { Link, withRouter } from "react-router-dom";
import TopBanner from "../components/TopBanner";
import ProductList from "./ProductList/ProductList";

function Home() {
  return (
    <>
      <TopBanner
        imageUrl="https://cdn.pixabay.com/photo/2018/04/10/16/05/people-3307913_960_720.jpg"
        h1Title="PET FEED"
        pageDesciption="我們提供多種寵物健康鮮食選擇，讓您與寵物生活更無憂無慮"
      />
      <div className="row">
        <ProductList />
      </div>
    </>
  );
}

export default withRouter(Home);
