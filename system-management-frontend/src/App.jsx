import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import EmployeeComponent from './components/EmployeeComponent'
import HomeComponent from './components/HomeComponent'
import ListMenuItemComponent from './components/ListMenuItemComponent'
import MenuItemComponent from './components/MenuItemComponent'
import ListSupplierComponent from './components/ListSupplierComponent'
import SupplierComponent from './components/SupplierComponent'
import ListInventoryComponent from './components/ListInventoryComponent'
import InventoryComponent from './components/InventoryComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SaleComponent from './components/SaleComponent'
import ListSaleComponent from './components/ListSaleComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <HeaderComponent />

          <main className="flex-grow py-10">
            <Routes>
              {/* // http://localhost:3000 */}
              <Route path='/' element = { <HomeComponent /> }></Route>

              {/* // http://localhost:3000/employee */}
              <Route path='/employees' element = { <ListEmployeeComponent /> }></Route>
              {/* // http://localhost:3000/add-employee */}
              <Route path='/add-employee' element = { <EmployeeComponent /> }></Route>
              {/* // http://localhost:3000/edit-employee/1 */}
              <Route path='/edit-employee/:id' element = { <EmployeeComponent /> }></Route>

              {/* // http://localhost:3000/menu */}
              <Route path='/menu' element = { <ListMenuItemComponent /> }></Route>
              {/* // http://localhost:3000/add-menu-item */}
              <Route path='/add-menu-item' element = { <MenuItemComponent /> }></Route>
              {/* // http://localhost:3000/edit-employee/1 */}
              <Route path='/edit-menu-item/:id' element = { <MenuItemComponent /> }></Route>

              {/* // http://localhost:3000/suppliers */}
              <Route path='/suppliers' element = { <ListSupplierComponent /> }></Route>
              {/* // http://localhost:3000/add-supplier */}
              <Route path='/add-supplier' element = { <SupplierComponent /> }></Route>
              {/* // http://localhost:3000/edit-supplier/1 */}
              <Route path='/edit-supplier/:id' element = { <SupplierComponent /> }></Route>

              {/* // http://localhost:3000/inventory */}
              <Route path='/inventory' element = { <ListInventoryComponent /> }></Route>
              {/* // http://localhost:3000/add-inventory-item */}
              <Route path='/add-inventory-item' element = { <InventoryComponent /> }></Route>
              {/* // http://localhost:3000/edit-inventory-item/1 */}
              <Route path='/edit-inventory-item/:id' element = { <InventoryComponent /> }></Route>

              {/* // http://localhost:3000/sales */}
              <Route path='/sales' element = { <ListSaleComponent /> }></Route>
               {/* // http://localhost:3000/sales-history */}
              <Route path='/add-sale' element = { <SaleComponent /> }></Route>
            </Routes>
          </main>

          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
