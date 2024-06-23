
import { Route, Routes } from "react-router-dom"
import {  Toaster } from "sonner"
import JobHome from "./views/JobHome"
import Login from "./views/Login"

const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen w-screen">
      <Toaster richColors/>
      <Routes>
        <Route path="/" element={<JobHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
