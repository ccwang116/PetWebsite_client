import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import TopBanner from '../components/TopBanner'




function Marketing(props) {
  
  return (
    <>
      <TopBanner imageUrl="https://cdn.pixabay.com/photo/2019/02/20/06/10/yorkshire-terrier-4008493_960_720.jpg" h1Title="會員等級說明"pageDesciption="加入會員升等優惠多更多" />
      <div className="row ">
        <p className="w-100 text-center">貓平民>貓奴>貓皇上</p>
      
      </div>
      <div className="row mb-5">
      <p className="w-100 text-center">狗平民>狗奴>狗國王</p>
      
      </div>
    </>
  )
}

export default withRouter(Marketing)
