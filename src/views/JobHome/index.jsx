import { useSelector } from "react-redux"


const JobHome = () => {
  const authState = useSelector(state => state.auth)
  return (
    <div>
      <h1>{authState.user.email}</h1>
    </div>
  )
}

export default JobHome
