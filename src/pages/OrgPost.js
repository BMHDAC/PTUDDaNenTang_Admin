import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'

const OrgPost = () => {
  const {orgID} = useParams()
  const [posts, setPosts] = useState([])
  const deletePost = (id,name) => {
    if(window.confirm(`Bạn có muốn xóa bài đăng của ${name} id: ${id}`)) {
      //APT
      toast.success('Xóa thành công')
      //Reload
     
  } else {
    toast.error("Hủy bỏ")
  }
  }
  useEffect(() => {
    const getHelpRequest = async () => {
    try {
      const response = await userRequest(`admin/getPostInOrganization/${orgID}`)
      if(response.data.data) {
        setPosts(response.data.data) 
      } else {
        toast.error("Lỗi xảy ra khi tải xuống")
      }
    } catch (error) {
      toast.error("Lỗi server")
    }
    }
    getHelpRequest()
  })
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
              className='deleteButton'
              postID = {item.id}
              onClick={() => deletePost(item.id,item.creator)}
              > Delete</button>
            </td>
          </tr>
        ))}
    </table>
    </div>
  )
}

export default OrgPost