import React, { useEffect, useRef, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Post = () => {
  const searchRef = useRef()
  const navigate = useNavigate()
  const [option, setOption] = useState('')
  const goToOption =() => {
    if(!option){
      toast.error("Nhập tên người dùng")
    } else {
      navigate(`/posts/user/${option}`)
    }
  }
  const [posts, setPosts] = useState([])


  const deletePost = async (postID) => {
    if(window.confirm(`Do you want to post ${postID}`)) {
      //API xoa bai viet
      toast.success("Xóa bài viêt thành công")
    } else {
      toast.error("Hủy bỏ")
    }

    
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
        <form  onSubmit={goToOption}>
                <label htmlFor="searchOption">Tìm bài viết theo username:   </label>
                <input
                    type="text"
                    id="searchOption"
                    ref={searchRef}
                    autoComplete="off"
                    onChange={(e)=> setOption(e.target.value)}
                    value={option}
                    required
                />
                <button>Tìm kiếm</button>
          </form>

        <table className='tablecontain'>
        <tr>
            <th>Create by</th>
            <th>Created At</th>
            <th>Title</th>
            <th>Description</th>
            <th>Images</th>
            <th>Actions</th>
        </tr>
        {posts?.map(item => (
          <tr>
            <td>{item.createdBy}</td>
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