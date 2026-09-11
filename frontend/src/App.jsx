

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './pages/Products'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Users from './pages/Users'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import AdminRoute from './routes/AdminRoute'
import GuestRoute from './routes/GuestRoute'
import PermissionRoute from './routes/PermissionRoute'
import Roles from './pages/Roles'
import CreateRole from './pages/CreateRole'
import EditRole from './pages/EditRole'
import Permission from './pages/Permissions'
import CreatePermission from './pages/CreatePermission'
import EditPermission from './pages/EditPermission'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import Layout from './components/Layout'
//import axios from 'axios'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />

        <Route element={<ProtectedRoute/>}>
        
          <Route element={<Layout/>}>

            <Route path="/dashboard" element={<Dashboard/>} />

            <Route element={<PermissionRoute permission="products.view" />}>
              <Route path="/products" element={<Product />} />
            </Route>

            <Route element={<PermissionRoute permission="products.create"/>}>
              <Route path="/products/create" element={<CreateProduct />} />
            </Route>

            <Route element={<PermissionRoute permission="products.update"/>}>
              <Route path="/products/:id/edit" element={<EditProduct />} />
            </Route>

            <Route element={<PermissionRoute permission="users.view"/>}>
              <Route path='/users' element={<Users/>}/>
            </Route>

            <Route element={<PermissionRoute permission="users.create"/>}>
              <Route path='/users/create' element={<CreateUser/>}/>
            </Route>

            <Route element={<PermissionRoute permission="users.update"/>}>
              <Route path='/users/:id/edit' element={<EditUser/>}/>
            </Route>


            <Route  element={<PermissionRoute permission="roles.view"/>}>
              <Route path='/roles' element={<Roles/>}/>
            </Route>


            <Route  element={<PermissionRoute permission="roles.create"/>}>
              <Route path='/roles/create' element={<CreateRole />}/>
            </Route>

            <Route element={<PermissionRoute permission="roles.update"/>}>
              <Route path="/roles/:id/edit" element={<EditRole/>}/>
            </Route>

            <Route element={<PermissionRoute permission="permissions.view" />}>
              <Route path="/permissions" element={<Permission />} />
            </Route>

            <Route element={<PermissionRoute permission="permissions.create" />}>
              <Route path="/permissions/create" element={<CreatePermission />} />
            </Route>

            <Route element={<PermissionRoute permission="permissions.update" />}>
              <Route path="/permissions/:id/edit" element={<EditPermission />} />
            </Route>

          </Route>
        </Route>
        
        <Route element={<GuestRoute/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>

        
      </Routes>

      
    </>
  )
}

export default App
