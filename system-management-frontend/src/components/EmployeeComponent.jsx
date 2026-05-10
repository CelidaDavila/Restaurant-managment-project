import React, { useState, useEffect } from 'react'
import { listRoles } from '../services/RoleService'
import { createEmployee, getEmployee, udpateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [roleId, setRoleId] = useState('')
  const [roles, setRoles] = useState([])

  const [errors, setErrors] = useState({
    firstName: '',
    lastName:'',
    roleId: ''
  })

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(() => {

    if(id){
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setRoleId(response.data.roleId);
      }).catch(error => {
        console.error(error);
      })
    }

  }, [id])

  useEffect(() => {
    listRoles().then((response) => {
      setRoles(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, [])


  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if(validateForm()) {
      const employee = {firstName, lastName, roleId: parseInt(roleId)}
      console.log(employee);

      if(id) {
        udpateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    
    if(firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = "El nombre es requerido"
      valid = false;
    }

    if(lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = "El apellido es requerido"
      valid = false;
    }

    if(roleId) {
      errorsCopy.roleId = ''
    } else {
      errorsCopy.roleId = "Debes seleccionar un rol";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if(id) {
      return <h2 className="text-2xl font-bold uppercase tracking-widest">Actualizar empleado</h2>
    } else {
      return <h2 className="text-2xl font-bold uppercase tracking-widest">Registro de Personal</h2>
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-white text-center">
          {
            pageTitle()
          }
        </div>

        <div className="p-8">
          <form className="space-y-6">
            {/* Input Nombre */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nombre:</label>
              <input
                type="text"
                placeholder="Ingresa el nombre"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                  errors.firstName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</p>}
            </div>

            {/* Input Apellido */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Apellido:</label>
              <input
                type="text"
                placeholder="Ingresa el apellido"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                  errors.lastName ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</p>}
            </div>

            {/* Select Rol */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Puesto / Rol:</label>
              <select
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 cursor-pointer ${
                  errors.roleId ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">Selecciona una opción...</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              {errors.roleId && <p className="text-red-500 text-xs mt-1 ml-1">{errors.roleId}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigator('/employees')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all uppercase text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveOrUpdateEmployee}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all active:scale-95 uppercase text-sm"
              >
                Guardar Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent