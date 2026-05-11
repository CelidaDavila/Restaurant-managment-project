import React, { useState, useEffect } from 'react'
import { createSupplier, getSupplier, updateSupplier } from '../services/SupplierService';
import { useNavigate, useParams } from 'react-router-dom'

const SupplierComponent = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', description: '', email: '', address: '' })

  const {id} = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if(id) {
      getSupplier(id).then((res) => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setAddress(res.data.address);
      }).catch((err) => console.error(err))
    }
  }, [id])

  const saveOrUpdateSupplier = (e) => {
    e.preventDefault();

    if(validateForm()) {
      const supplier = { name, phone, email, address }

      if(id) {
        updateSupplier(id, supplier).then((res) => {
          navigator('/suppliers', { state: { message: 'Proveedor actualizado con éxito' }});
        }).catch((err) => console.error(err))
      } else {
        createSupplier(supplier).then((res) => {
          navigator('/suppliers', { state: { message: 'Proveedor agregado con éxito' }});
        }).catch((err) => console.error(err))
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if(name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = "Nombre requerido";
      valid = false;
    }

    if(phone.trim()) {
      errorsCopy.phone = '';
    } else {
      errorsCopy.phone = "Teléfono requerido";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim() && emailPattern.test(email)) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = "Ingresa un correo electrónico válido";
      valid = false;
    }

    if(address.trim()) {
      errorsCopy.address = '';
    } else {
      errorsCopy.address = "Dirección requerida";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
          {id ? 'Actualizar Proveedor' : 'Registro de Proveedor'}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-transparent">
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre / Empresa:</label>
            <input
              type="text"
              placeholder="Nombre del proveedor"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teléfono:</label>
              <input
                type="text"
                placeholder="33XXXXXXXX"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                  errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico:</label>
              <input
                type="email"
                placeholder="proveedor@ejemplo.com"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                  errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Dirección:</label>
            <textarea
              placeholder="Dirección física del proveedor..."
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.address ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => navigator('/suppliers')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={saveOrUpdateSupplier}
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

export default SupplierComponent