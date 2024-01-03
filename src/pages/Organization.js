import React, { useEffect, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Organization = () => {
  
  const [org, setOrg] = useState([])
  const deleteOrg = (id,name) => {
    if(window.confirm(`Xóa tổ chức ${name} id: ${id}`)) {
      //API xóa
      toast.success("Xóa thành công")
    } else {
      toast.error("Hủy bỏ")
    }
  }

  useEffect(()=> {
    const getAllOrg = async () => {
      try {
        const response = await userRequest.get('/admin/getAllOrganization')
        if(response.data.data) {
        setOrg(response.data.data)
      } else {
        toast.error("Co loi xay ra khi tai ve")
      }
      } catch(error) {
        console.log(error)
        toast.error("Lỗi server")
      }
    }
    getAllOrg()
  },[])

  return (
    <div className='contentcontainer'>
        <text> Org list</text>
        <table className='tablecontain'>
        <tr>
            <th>Name</th>
            <th>Created by</th>
            <th>Description</th>
            <th>Avatar URL</th>
            <th>ID</th>
            <th>Posts list</th>
            <th>Actions</th>
        </tr>
        {org?.map(item => (
          <tr>
            <td>{item.name}</td>
            <td>{item.creator}</td>
            <td>{item.description}</td>
            <td><a href={item.urlAvatar}>{item.urlAvatar}</a></td>
            <td>{item.id}</td>
            <td>
              <Link to={`/posts/${item.id}`}>
                <text>Post list</text>
              </Link>
            </td>
            <td>
              <button
              className='deleteButton'
              postID = {item.id}
              onClick={() => deleteOrg(item.id,item.name)}
              > Delete</button>
            </td>
          </tr>
        ))}
    </table>
    </div>
  )
}

export default Organization