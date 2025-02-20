import Login from './pages/Login'
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Users from './pages/Users'
import Trashed from './pages/Trash'
import TaskContent from './pages/TaskContent'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function Layout() {
  const { user } = useSelector(state => state.auth); // Ensure correct structure
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='hidden md:block'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-y-auto p-4 2xl:px-10'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function ProtectedRoute({ element }) {
  const { user } = useSelector(state => state.auth);
  return user ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />

        {/* safe */}
        <Route element={<ProtectedRoute element={<Layout />} />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/task/:id' element={<TaskContent />} />
          <Route path='/trashed' element={<Trashed />} />
          <Route path='/team' element={<Users />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
