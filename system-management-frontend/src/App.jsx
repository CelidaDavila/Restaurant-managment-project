import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponentj'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <HeaderComponent />

          <main className="flex-grow py-10">
            <Routes>
              {/* // http://localhost:3000 */}
              <Route path='/' element = { <ListEmployeeComponent /> }></Route>
              {/* // http://localhost:3000/employee */}
              <Route path='/employees' element = { <ListEmployeeComponent /> }></Route>
              {/* // http://localhost:3000/add-employee */}
              <Route path='/add-employee' element = { <EmployeeComponent /> }></Route>
              {/* // http://localhost:3000/edit-employee/1 */}
              <Route path='/edit-employee/:id' element = { <EmployeeComponent /> }></Route>
            </Routes>
          </main>

          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
