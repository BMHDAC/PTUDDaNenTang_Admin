import {Outlet, Navigate, } from 'react-router-dom'
import { useSelector} from 'react-redux'
import user from '../redux/user'

const RequireAdmin = () => {
    const user = useSelector((state) => state.user?.currentUser)
    const check = (user?.role ==="admin")

    return (
        check? (<Outlet/>) : (<Navigate to="/login"/>)
    )
}

export default RequireAdmin