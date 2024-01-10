import React from 'react'
import Auth from "./../components/Auth.jsx"
import LoginCSS from "./../assets/css/Login.module.css"

const Login = () => {
  return (
    <div className={LoginCSS.loginBody}>
        <Auth />
    </div>
  )
}

export default Login