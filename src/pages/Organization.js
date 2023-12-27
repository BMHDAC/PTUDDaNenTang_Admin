import React, { useEffect, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Organization = () => {
  
  const [org, setOrg] = useState([])
  const deleteOrg = (id) => {

  }

  useEffect(()=> {
    const getAllOrg = async () => {
      const response = await userRequest.get('/admin/getAllOrganization')
      if(response.data.data) {
        setOrg(response.data.data)
      } else {
        toast.error("Co loi xay ra khi tai ve")
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
            <th>Posts list</th>
            <th>Actions</th>
        </tr>
        {org?.map(item => (
          <tr>
            <td>{item.name}</td>
            <td>{item.creator}</td>
            <td>{item.description}</td>
            <td>{item.urlAvatar}</td>
            <td>
              <Link to={`/posts/org/${item.id}`}>
                <text>Post list</text>
              </Link>
            </td>
            <td>
              <button
              postID = {item.id}
              onClick={() => deleteOrg(item.id)}
              > Delete</button>
            </td>
          </tr>
        ))}
    </table>
    </div>
  )
}

export default Organization