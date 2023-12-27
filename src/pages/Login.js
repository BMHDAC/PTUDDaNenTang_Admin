
import React from 'react'
import { useState,useRef,useEffect } from 'react'
import CryptoJS from 'crypto-js'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../api/login'
const Login = () => {
    const user = useSelector((state) => state.user?.currentUser)
    const usernameRef =useRef()
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [errMsg,setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect (()=> {
        usernameRef.current.focus();
    },[])

    useEffect(()=> {
        if(user) {
            navigate('/home')
        }
    },[])

    useEffect(()=>{
        setErrMsg('')

    },[username,password])


    
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
            navigate('/home')
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
    <section>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            
        </section>
  )
}

export default Login