
import React from 'react'
import { useState,useRef,useEffect } from 'react'
import CryptoJS from 'crypto-js'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { login } from '../api/login'

const Login = () => {
    const usernameRef =useRef()
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect (()=> {
        usernameRef.current.focus();
    },[])
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!username || !password) {
            toast.error("Vui lòng nhập đầy đủ thông tin ")
            return 
        } 
        const cryptedPwd = CryptoJS.AES.encrypt(
            password,
            "yWkbaF1IaBF2N5VE0A5g8ixM3okcKXfvauVASPmgzP4="
        ).toString()

        try {
            const response = await login(dispatch, username, cryptedPwd)
            if(response.data.user.role ==="admin") {
                navigate('/home')
            } else {
                toast.error("you are not admin")
                setUsername('')
                setPassword('')
                window.location.reload()
            }
            
        } catch(error) {
            console.log(error)
            if (error.response?.data && error.response?.data.code === 1) {
                toast.error("Tên đăng nhập không tồn tại")
            }
            if (error.response?.data && error.response?.data.code === 2) {
                toast.error("Mật khẩu không chính xác")
            }
            if (error.response?.data && error.response?.data.code === 3) {
                toast.error("Xảy ra lỗi trong quá trình đăng nhập")
            }
        }
    }

  return (
    <section className='loginContainer'>
            <h1>Quản lý ứng dụng thiện nguyện</h1>
            <h2>Đăng nhập</h2>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button className='loginButton'>Sign In</button>
            </form>
            
        </section>
  )
}

export default Login