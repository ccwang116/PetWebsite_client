import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import TopBanner from '../components/TopBanner'
import MyBreadcrumb from '../components/MyBreadcrumb'

function About(props) {
 // console.log(props)

  return (
    <>
      <TopBanner imageUrl="https://cdn.pixabay.com/photo/2016/01/19/17/41/friends-1149841_960_720.jpg" h1Title="關於我們"pageDesciption="PET FEED在乎您與寵物的生活品質。" />
      
    </>
  )
}

// 高階元件的用法
export default withRouter(About)
