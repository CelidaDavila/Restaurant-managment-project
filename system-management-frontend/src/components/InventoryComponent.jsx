import React, { useEffect, useState } from 'react'
import { createInventoryItem, getInventoryItem, updateInventoryItem } from '../services/InventoryService'
import { listSuppliers } from '../services/SupplierService'
import { useNavigate, useParams } from 'react-router-dom'

const InventoryComponent = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({ name: '', quantity: '', supplierId: '' });

  const {id} = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    listSuppliers().then((res) => {
      setSuppliers(res.data)
    }).catch((err) => console.error(err))

    if(id) {
      getInventoryItem(id).then((res) => {
        setName(res.data.name);
        setQuantity(res.data.quantity);
        setSupplierId(res.data.supplierId);
      }).catch((err) => console.error(err))
    }
  }, [id])

  const saveOrUpdate = (e) => {
    e.preventDefault();

    if(validateForm()) {
      const item = { name, quantity: parseInt(quantity), supplierId: parseInt(supplierId) }

      if(id) {
        updateInventoryItem(id, item).then((res) => {
          navigator('/inventory', { state: { message: 'Insumo actualizado con éxito' }});
        }).catch((err) => console.error(err))
      } else {
        createInventoryItem(item).then((res) => {
          navigator('/inventory', { state: { message: 'Insumo agregado con éxito' }});
        }).catch((err) => console.error(err))
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    
    if(name.trim()) {
      errorsCopy.name = ''
    } else {
      errorsCopy.name = "El nombre es requerido";
      valid = false;
    }

    if(quantity !== '' && parseInt(quantity) >= 0) {
      errorsCopy.quantity = '';
    } else {
      errorsCopy.quantity = "La cantidad debe ser mayor o igual a 0";
      valid = false;
    }

    if(supplierId) {
      errorsCopy.supplierId = '';
    } else {
      errorsCopy.supplierId = "Selecciona un proveedor";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
          {id ? 'Editar Insumo' : 'Nuevo Insumo'}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-transparent">
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre del Producto:</label>
            <input
              type="text"
              placeholder="Ej. Harina, Aceite..."
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cantidad Inicial:</label>
            <input
              type="number"
              placeholder="0"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.quantity ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p className="text-red-500 text-xs mt-1 ml-1">{errors.quantity}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Proveedor:</label>
            <select 
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 cursor-pointer appearance-none ${
                errors.supplierId ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
            >
              <option value="">Selecciona un proveedor</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            {errors.supplierId && <p className="text-red-500 text-xs mt-1 ml-1">{errors.supplierId}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigator('/inventory')}
              className="flex-1 py-3 border border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={saveOrUpdate}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase text-xs tracking-widest cursor-pointer"
            >
              {id ? 'Guardar Cambios' : 'Agregar Insumo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InventoryComponent