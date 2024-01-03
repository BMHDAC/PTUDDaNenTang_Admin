import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const UserHelpRequest = () => {
  const {userID} = useParams()
  const [helpRequest, setHelpRequest] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!userID) {
      navigate('/user')
    }
  },[navigate,userID])

  const deleteHelpRequest = (id) => {
    if(window.confirm(`Do you want to delete post by user ${userID}`)) {
        //Xóa bài viết
        toast.success('Xóa người dùng thành công')
       
    } else {
      toast.error("Hủy bỏ")
    }
  }
  useEffect(() => {
    const getHelpRequest = async () => {
      try{
         const response = await userRequest(`/admin/getHelpRequestByUser/${userID}`)
      if(response.data.data) {
        setHelpRequest(response.data.data) 
      } else {
        toast.error("Lỗi xảy ra khi tải xuống")
      }
    } catch (error) {
      toast.error("Lỗi server")
    }
     
    }
    getHelpRequest()
  },[userID])
  return (
    <div className='contentcontainer'>
        <text> Post uploaded by user {userID}</text>
        <table className='tablecontain'>
        <tr>
            <th>Created At</th>
            <th>Title</th>
            <th>Description</th>
            <th>Images</th>
            <th>Actions</th>
        </tr>
        {helpRequest?.map(item => (
          <tr>
            <td>{item.createAt}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.images}</td>
            <td>
              <button
              postID = {item.id}
              onClick={() => deleteHelpRequest(item.id)}
              > Delete</button>
            </td>
          </tr>
        ))}
    </table>
    </div>
  )
}

export default UserHelpRequest