import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const OrgPost = () => {
  const {orgID} = useParams()
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const deletePost = (id) => {
    navigate(`/posts/${id}`)
  }
  useEffect(() => {
    const getHelpRequest = async () => {
      const response = await userRequest(`admin/getPostInOrganization/${orgID}`)
      if(response.data.data) {
        setPosts(response.data.data) 
      } else {
        toast.error("Lỗi xảy ra khi tải xuống")
      }
    }
    getHelpRequest()
  },[orgID])
  return (
    <div className='contentcontainer'>
        <text> Post uploaded by ORG {orgID}</text>
        <table className='tablecontain'>
        <tr>
            <th>Uploader</th>
            <th>date</th>
            <th>Description</th>
            <th>Images URL</th>
            <th>ORG ID</th>
            <th>Actions</th>
        </tr>
        {posts?.map(item => (
          <tr>
            <td>{item.creator}</td>
            <td>{item.createdAt}</td>
            <td>{item.description}</td>
            <td>{item.images}</td>
            <td>{item.organizationId}</td>
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

export default OrgPost