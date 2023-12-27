import { loginStart,loginSuccess,loginFailure } from "../redux/user"
import { publicRequest } from "../hooks/requestMethod"

export const login = async (dispatch, username, password) => {
    console.log("success")
    const dataSend = {
      username: username,
      password: password,
    }
    dispatch(loginStart())
    try {
      console.log("chạy đến đây")
      const res = await publicRequest.post("auth/signin", dataSend)
      const payload = {
        ...res.data.user,
        token: res.data.token,
      }
      dispatch(loginSuccess(payload))
      return res
    } catch (err) {
      dispatch(loginFailure())
      throw err
    }
  }