import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({
    element: Component
}) => {
    const authState = useSelector(state => state.auth)


  return authState.user ? <Component /> : <Navigate to="/login"/>
}

ProtectedRoute.propTypes = {
    element: PropTypes.elementType
}

export default ProtectedRoute
