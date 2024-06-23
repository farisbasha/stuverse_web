import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom"


const UnProtectedRoute = ({
    element: Component
}) => {
    const authState = useSelector(state => state.auth)


  return !authState.user ? <Component /> : <Navigate to="/"/>
}

UnProtectedRoute.propTypes = {
    element: PropTypes.elementType
}

export default UnProtectedRoute
