import Login from './pages/Login'
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Users from './pages/Users'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
