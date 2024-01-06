import React, { useEffect, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { FcDeleteDatabase } from 'react-icons/fc'
const Users = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    const getAllUser = async () => {
      const response = await userRequest.get('/admin/getAllUser')
      if (response.data.data) {
        setUsers(response.data.data)
      } else {
        toast.error("Lỗi xảy ra khi tải xuống thông tin người dùng")
      }
    }
    getAllUser()

  }, [])

  const deleteUser = async (username) => {
    if (window.confirm(`Do you want to delete user ${username}`)) {
      const response = await userRequest.delete(`admin/deleteUser/${username}`)
      if (response.status === 200) {
        toast.success('Xóa người dùng thành công')
        window.location.reload()
      }
      else {
        toast.error('Có lỗi xảy ra')
      }
    } else {
      toast.error("Hủy bỏ")
    }


  }
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
        {users.length ?
          (users.map(usr => (
            <tr>
              <td>{usr.displayName ? usr.displayName : usr.username}</td>
              <td>{usr.password}</td>
              <td>{usr.phone}</td>
              <td>{usr.gmail}</td>
              <td>
                <Link to={`/hr/${usr.username}`}>
                  <text>Post list</text>
                </Link>
              </td>
              <td>
                <button
                  usernameID={usr.username}
                  className='deleteButton'
                  onClick={() => deleteUser(usr.username)}
                >
                  <FcDeleteDatabase />
                </button>
              </td>
            </tr>))) :
          (
            <tr>
              <td>
                There are no user
              </td>
            </tr>
          )
        }
      </table>


    </div>
  )
}

export default Users
