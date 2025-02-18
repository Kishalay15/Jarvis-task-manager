import Login from './pages/Login'
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Users from './pages/Users'
import Trash from './pages/Trash'
import TaskContent from './pages/TaskContent'
import { Toaster } from 'sonner'
import { useState } from 'react'

function Layout() {
  const user = ""

  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/task/:id' element={<TaskContent />} />
          <Route path='/trashed' element={<Trash />} />

          <Route path='/team' element={<Users />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
