import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])

  function getAllEmployees() {
    listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.error(error);
    })
  }

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id) {
    deleteEmployee(id).then((response) => {
      getAllEmployees();
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase tracking-wider">
        Gestión de Empleados
      </h2>
      
      <div className="mb-6 flex justify-start">
        <button 
          onClick={addNewEmployee} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:transform active:scale-95 cursor-pointer"
        >
          <span className="text-xl">+</span>
          Agregar Nuevo Empleado
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-xl rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 font-bold">ID</th>
              <th className="px-6 py-4 font-bold">Nombre</th>
              <th className="px-6 py-4 font-bold">Apellido</th>
              <th className="px-6 py-4 font-bold">Rol</th>
              <th className="px-6 py-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {employee.id}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {employee.firstName}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {employee.lastName}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    {employee.roleName}
                  </span>
                </td>
                {/* Estilización de los botones de acción */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => updateEmployee(employee.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md font-medium transition-all duration-200 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => removeEmployee(employee.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-md font-medium transition-all duration-200 cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListEmployeeComponent