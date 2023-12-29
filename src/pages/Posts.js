import React, { useEffect, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'

const Post = () => {
  
  const [posts, setPosts] = useState([])


  const deletePost = (id) => {
  
  }
  useEffect(() => {
    const getHelpRequest = async () => {
      const response = await userRequest(`/admin/getAllHelpRequest`)
      if(response.data.data) {
        setPosts(response.data.data) 
      } else {
        toast.error("Lỗi xảy ra khi tải xuống")
      }
    }
    getHelpRequest()
  },[])
  return (
    <div className='contentcontainer'>
        <text> All Posts</text>
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
            <td><a href={item.images}>{item.images} </a></td>
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

export default Post