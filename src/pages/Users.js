import React, { useEffect, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Users = () => {
  const [users,setUsers] = useState([])

  useEffect(() => {
    const getAllUser = async () => {
      const response = await userRequest.get('/admin/getAllUser')
      if(response.data.data) {
        setUsers(response.data.data)
      } else {
        toast.error("Lỗi xảy ra khi tải xuống thông tin người dùng")
      }
    }
    getAllUser()

  },[])
  return (
<div className='contentcontainer'>
    <table className='tablecontain'>
        <tr>
            <th>Display Name</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Gmail</th>
            <th>Posts</th>
            <th>Actions</th>
        </tr>
        {users?.map(usr => (
          <tr>
            <td>{usr.displayName? usr.displayName:usr.username}</td>
            <td>{usr.password}</td>
            <td>{usr.phone}</td>
            <td>{usr.gmail}</td>
            <td>
              <Link to={`/posts/${usr.username}`}>
                <text>Post list</text>
              </Link>
            </td>
          </tr>
        ))}
    </table>
</div>
  )
}

export default Users