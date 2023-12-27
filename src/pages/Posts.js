import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const {userID} = useParams()
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  console.log(userID)
  const deletePost = (id) => {
    navigate(`/posts/${id}`)
  }
  useEffect(() => {
    const getHelpRequest = async () => {
      const response = await userRequest(`/admin/getHelpRequestByUser/${userID}`)
      if(response.data.data) {
        setPosts(response.data.data) 
      } else {
        toast.error("Lỗi xảy ra khi tải xuống")
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
        {posts?.map(item => (
          <tr>
            <td>{item.createAt}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.images}</td>
            <td>
              <button
              postID = {item.id}
              onClick={() => deletePost(item.id)}
              > Delete</button>
            </td>
          </tr>
        ))}
    </table>
    </div>
  )
}

export default Posts