import React, {  useEffect } from "react";
import Items from "../../components/Items";
import CategoryBar from "../../components/CategoryBar/CategoryBar";

function ProductList(props) {
  const { menuId, setMenuId } = props;
  
  useEffect(()=>{
    
  })


  return (
    <>
    <div className="row mt-5">
      <div className="col-md-2 col-sm-12 col-12">
        <p className="pdlTitle">商品分類</p>
        <CategoryBar menuId={menuId} setMenuId={setMenuId}/>
      </div>
      <div className="col-md-10 col-sm-12">
      <p className="pdlTitle">全部商品</p>
        <Items menuId={menuId} setMenuId={setMenuId}/>
      </div>
    </div>
    </>
  );
}

export default ProductList;
