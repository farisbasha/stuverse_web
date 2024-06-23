
import { Route, Routes } from "react-router-dom"
import {  Toaster } from "sonner"
import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./redux/slices/authSlice"
import ProtectedRoute from "./components/ProtectedRoute"
import UnprotectedRoute from "./components/UnprotectedRoute"
import { protectedRoutes, unprotectedRoutes } from "./routes/routes"

const App = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  if(authState.status === "idle"){
    return <div>Loading...</div>
  }

  return (
    <div className="bg-slate-950 min-h-screen w-screen">
      <Toaster richColors/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {protectedRoutes.map(({ path, element }) => (
            <Route path={path} element={<ProtectedRoute element={element} />} key={path} />
          ))}
          {unprotectedRoutes.map(({ path, element }) => (
            <Route path={path} element={<UnprotectedRoute element={element}/>} key={path} />
          ))}
          <Route path="*" element={<div>Where are you going bro?</div>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
