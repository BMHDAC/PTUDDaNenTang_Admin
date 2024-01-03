import React, {useRef, useState } from 'react'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Post = () => {
  const searchRef = useRef()
  const navigate = useNavigate()
  const [option, setOption] = useState('')
  const goToOption =() => {
    if(!option){
      toast.error("Nhập tên tổ chức")
    } else {
      navigate(`/posts/${option}`)
    }
  }


    return (
    <div className='contentcontainer'>
        <text> All Posts</text>
        <form  onSubmit={goToOption}>
                <label htmlFor="searchOption">Tìm bài viết theo tên tổ chức:   </label>
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
    </div>
    )
}

export default Post