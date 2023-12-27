import axios from "axios"
import storage from 'redux-persist/lib/storage'

const BASE_URL ="http://localhost:8080/api/"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})
const userRequest = axios.create({
  baseURL: BASE_URL,
})

userRequest.interceptors.request.use(
  async function (request) {
    const data = await storage.getItem("persist:root") // Thay 'khóa_lưu_trữ' bằng khóa bạn đã sử dụng khi lưu trữ dữ liệu.
    if (data !== null) {
      request.headers.Authorization =
        "Bearer " + JSON.parse(JSON.parse(data).currentUser).token
    } else {
      // Không tìm thấy dữ liệu trong Storage
      console.log("Không có dữ liệu trong Storage")
    }
    return request
  },

  function (error) {
    return Promise.reject(error)
  },
)
export { userRequest }