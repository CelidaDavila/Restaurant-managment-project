import React, { useState, useEffect } from 'react'
import { listRoles } from '../services/RoleService'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
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
      getEmployee(id).then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setRoleId(res.data.roleId);
      }).catch(err => console.error(err))
    }
  }, [id])

  useEffect(() => {
    listRoles().then((res) => {
      setRoles(res.data);
    }).catch(err => console.error(err))
  }, [])

  const saveOrUpdate = (e) => {
    e.preventDefault();

    if(validateForm()) {
      const employee = {firstName, lastName, roleId: parseInt(roleId)}

      if(id) {
        updateEmployee(id, employee).then((res) => {
          navigator('/employees', { state: { message: 'Empleado actualizado con éxito' }});
        }).catch(err => console.error(err))
      } else {
        createEmployee(employee).then((res) => {
          navigator('/employees', { state: { message: 'Empleado contratado con éxito' } });
        }).catch(err => console.error(err))
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

  return (
    <div className="container mx-auto mt-10 px-4 max-w-xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
          {id ? 'Actualizar Empleado' : 'Registro de Personal'}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-transparent">
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre:</label>
            <input
              type="text"
              placeholder="Ingresa el nombre"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.firstName ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Apellido:</label>
            <input
              type="text"
              placeholder="Ingresa el apellido"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.lastName ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Puesto / Rol:</label>
            <select
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 cursor-pointer ${
                errors.roleId ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
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

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigator('/employees')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={saveOrUpdate}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase text-xs tracking-widest cursor-pointer"
            >
              {id ? 'Guardar Cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeComponent