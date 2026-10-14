

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
import Menu from './components/Menu'
import About from './pages/About'
import Orders from './pages/Orders'
import AdminOrders from './pages/AdminOrders'
import OrderDetails from './pages/OrderDetails'
import AdminLayout from './components/AdminLayout'
//import axios from 'axios'
import AdminDashboard from './pages/AdminDashboard'
import { ADMIN_CREATE_DISH_ROUTE, ADMIN_DASHBOARD_ROUTE, ADMIN_DISHES_ROUTE, ADMIN_EDIT_DISH_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_ORDER_DETAILS_ROUTE } from "./routes/routes"
import CreateDishes from './pages/CreateDishes'
import AdminDishes from './pages/AdminDishes'
import EditDish from './pages/EditDish'
import AdminCategories from "./pages/AdminCategories"
import { ADMIN_CATEGORIES_ROUTE, } from "./routes/routes"
import {ADMIN_CREATE_CATEGORY_ROUTE} from "./routes/routes"
import EditCategory from "./pages/EditCategory"
import CreateCategory from "./pages/CreateCategory"
import {ADMIN_EDIT_CATEGORY_ROUTE} from "./routes/routes"
function App() {
  
  return (
    <>

      <Routes>
        <Route path='/' element={<Home/>} />
        
        <Route path='/menu' element={<Menu/>}/>
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
            
            <Route element={<PermissionRoute permission="orders.view"/>}>
              <Route path='/dashboard/orders' element={<Orders/>}/>
            </Route>

            <Route element={<PermissionRoute permission="orders.view" />}>
              <Route path="/dashboard/orders/:id" element={<OrderDetails />} />
            </Route>

            <Route element={<AdminLayout/>}>
              <Route path={ADMIN_DASHBOARD_ROUTE}
                element={<AdminDashboard/>}
              />
              <Route element={<PermissionRoute permission="orders.view"/> }>
                <Route path={ADMIN_ORDERS_ROUTE} element={<AdminOrders/>}/>
              </Route>
              <Route element={<PermissionRoute permission="orders.show"/>}>
                <Route path={ADMIN_ORDER_DETAILS_ROUTE} element={<OrderDetails />}/>
              </Route>
              <Route element={<PermissionRoute permission="dishes.create" />}>
                <Route
                  path={ADMIN_CREATE_DISH_ROUTE}
                  element={<CreateDishes />}
                />
              </Route>
              <Route element={<PermissionRoute permission="dishes.view"/>}>
                <Route path={ADMIN_DISHES_ROUTE} element={<AdminDishes/>}/>
              </Route>
              <Route element={<PermissionRoute permission="dishes.update" />}>
                <Route
                    path={ADMIN_EDIT_DISH_ROUTE}
                    element={<EditDish />}
                />
              </Route>

              <Route element={<PermissionRoute permission="categories.view" />}>
                <Route
                  path={ADMIN_CATEGORIES_ROUTE}
                  element={<AdminCategories />}
                />
              </Route>
              <Route element={<PermissionRoute permission="categories.create" />}>
                <Route
                  path={ADMIN_CREATE_CATEGORY_ROUTE}
                  element={<CreateCategory />}
                />
              </Route>
              <Route element={<PermissionRoute permission="categories.update" />}>
                <Route
                  path={ADMIN_EDIT_CATEGORY_ROUTE}
                  element={<EditCategory />}
                />
              </Route>

            </Route>
            
          </Route>
        </Route>

        <Route path='/about' element={<About/>}/>
        <Route element={<GuestRoute/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          
        </Route>

        
      </Routes>

      
    </>
  )
}

export default App
