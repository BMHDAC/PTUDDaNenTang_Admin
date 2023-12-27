import React, { useEffect } from 'react'
import { logoutUser } from '../redux/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const navigte = useNavigate()
    useEffect(() => {
        dispatch(logoutUser())
        navigte('/home')
    })
  return (
    <div>Logout</div>
  )
}

export default Logout