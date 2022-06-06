import React, { useEffect } from "react";
import Items from "../../components/Items";
import CategoryBar from "../../components/CategoryBar/CategoryBar";

function ProductList() {
  useEffect(() => {});

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-2 col-sm-12 col-12">
          <p className="pdlTitle">商品分類</p>
          <CategoryBar />
        </div>
        <div className="col-md-10 col-sm-12">
          <p className="pdlTitle">全部商品</p>
          <Items />
        </div>
      </div>
    </>
  );
}

export default ProductList;
