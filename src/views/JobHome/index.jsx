import { useDispatch, useSelector } from "react-redux"
import stuverseLogo from "../../assets/stuverse.png"
import { logout } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

const JobHome = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col ">
      <div className="flex shadow-md w-full  justify-end items-center p-3 relative">
        <img
          src={stuverseLogo}
          alt=""
          className="w-12 absolute left-0 right-0 mx-auto"
        />
        <img src={authState.user.image} alt="" className="w-10 h-10 rounded-full"  onClick={() => {
          navigate("/login")
          dispatch(logout())
          }}/>

      </div>
    </div>
  )
}

export default JobHome
