import React, { useEffect, useRef, useState } from 'react'
import { userRequest } from '../hooks/requestMethod'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FcSearch, FcDeleteDatabase } from 'react-icons/fc'

const HelpRequest = () => {
  const searchRef = useRef()
  const navigate = useNavigate()
  const [option, setOption] = useState('')
  const [helpRequest, setHelpRequest] = useState([])
  const goToOption = () => {
    navigate(`${option}`)
  }



  const deleteHelpRequest = async (postID) => {
    if (window.confirm(`Do you want to post ${postID}`)) {
      //API xoa bai viet
      toast.success("Xóa bài viêt thành công")
    } else {
      toast.error("Hủy bỏ")
    }


  }
  useEffect(() => {
    const getHelpRequest = async () => {
      try {
        const response = await userRequest(`/admin/getAllHelpRequest`)
        if (response.data.data) {
          setHelpRequest(response.data.data)
        } else {
          toast.error("Lỗi xảy ra khi tải xuống")
        }

      } catch (error) {
        console.log(error)
        toast.error("Lỗi server")
      }
    }
    getHelpRequest()
  }, [])
  return (
    <div className='contentcontainer'>
      <form onSubmit={goToOption}>
        <label htmlFor="searchOption">Tìm bài viết theo username:   </label>
        <input
          type="text"
          id="searchOption"
          ref={searchRef}
          autoComplete="off"
          onChange={(e) => setOption(e.target.value)}
          value={option}
          required
        />
        <button className='searchButton'><FcSearch /></button>
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
        {helpRequest?.map(item => (
          <tr>
            <td>{item.createdBy}</td>
            <td>{item.createAt}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td><a href={item.images}>{item.images} </a></td>
            <td>
              <button
                className='deleteButton'
                RequestID={item.id}
                onClick={() => deleteHelpRequest(item.id)}
              > <FcDeleteDatabase /></button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default HelpRequest
