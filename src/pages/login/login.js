import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { error } from 'jquery'

var sha1 = require('sha1')

function MyLogin(props) {
  const {
    data,
    setData,
    username,
    setUsername,
    setPassword,
    loginProcess,
    logoutProcess,
    loginErrors,
  } = props

  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`)
    const json = await response.json()
    const items = json.rows
    setData(items)

    return data
  }

  // 錯誤訊息陣列的呈現
  const displayErrors = loginErrors.length ? (
    <div className="alert alert-danger" role="alert">
      <ul className="list-unstyled">
        {loginErrors.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  ) : (
    ''
  )

  // login成功時的callback
  const loginSuccessCallback = () => {
    localStorage.setItem('member', JSON.stringify(data))
    alert('登入成功，跳到Welcome')
    props.history.push('/welcome', { from: '從登入頁來的' })
  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    alert('登出成功，跳回上一頁')
    props.history.goBack()
  }

  const forgetCallback = () => {
    props.history.push('/forgetpwd', { from: '從登入頁來的' })
  }

  const registerCallback = () => {
    props.history.push('/register', { from: '從登入頁來的' })
  }

  const forgetButton = (
    <div className="">
      <button
        className="btn btn-secondary mb-2 w-100"
        onClick={() => {
          logoutProcess(forgetCallback)
        }}
      >
        forget password?
      </button>
    </div>
  )

  const registerButton = (
    <div className="">
      <button
        className="btn btn-success mb-2 w-100"
        onClick={() => {
          logoutProcess(registerCallback)
        }}
      >
        register
      </button>
    </div>
  )

  const displayForm =  (
    
    <>
      <form action="" method="">
      <div className=" position-absolute bg-white" style={{width:"250px",height:"320px",left:"840px",top:"140px",opacity:"0.8",borderRadius:"10px"}}></div>
        <div className=" position-absolute " style={{left:"860px",top:"160px"}}>
                <h5>Account</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  // value={username}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="請輸入帳號"
                  onChange={(event) => {
                    setUsername(event.target.value)
                  }}
                />
                <h5>Password</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  required="required"
                  placeholder="請輸入密碼"
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
                
                  <input
                    value="login"
                    type="submit"
                    className="btn btn-warning mb-2 w-100"
                    onMouseEnter={() => {
                      console.log(data)
                      getData(username)
                    }}
                    onClick={() => {
                      loginProcess(loginSuccessCallback)
                    }}
                  />
                
                {registerButton}
                {forgetButton}
                {displayErrors}
        </div>
      </form>
    </>
  )

  return <><div className="W-100 position-relative" style={{height:"506px",backgroundClip:'cover',background:"url('https://cdn.pixabay.com/photo/2018/01/02/13/01/dog-3056131_960_720.jpg')"}}></div>
  {displayForm}</>
}

export default withRouter(MyLogin)
