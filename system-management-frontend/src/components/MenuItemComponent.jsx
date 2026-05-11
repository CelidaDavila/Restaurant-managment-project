import React, { useState, useEffect } from 'react'
import { createMenuItem, getMenuItem, updateMenuItem } from '../services/MenuItemService'
import { useNavigate, useParams } from 'react-router-dom'

const MenuItemComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', price: '', description: '' })

  const {id} = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if(id) {
      getMenuItem(id).then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
      }).catch((err) => console.error(err))
    }
  }, [id])

  const saveOrUpdateMenuItem = (e) => {
    e.preventDefault();

    if(validateForm()) {
      const menuItem = { name, price: parseFloat(price), description }

      if(id) {
        updateMenuItem(id, menuItem).then((res) => {
          navigator('/menu', { state: { message: 'Platillo actualizado con éxito' }});
        }).catch((err) => console.error(err))
      } else {
        createMenuItem(menuItem).then((res) => {
          navigator('/menu', { state: { message: 'Platillo agregado con éxito' }});
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

    if(price > 0) {
      errorsCopy.price = '';
    } else {
      errorsCopy.price = "El precio debe ser mayor de 0";
      valid = false;
    }

    if(description.trim()) {
      errorsCopy.description = '';
    } else {
      errorsCopy.description = "Debes poner una descripción";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-xl">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
          {id ? 'Actualizar Platillo' : 'Nuevo Platillo'}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-transparent">
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre del Platillo:</label>
            <input
              type="text"
              placeholder="Nombre del platillo"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Precio ($):</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.price ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1 ml-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Descripción:
            </label>
            <textarea
              placeholder="Describe los ingredientes o el sabor..."
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-gray-50 ${
                errors.description ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
              }`}
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.description}</p>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigator('/menu')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase text-xs tracking-widest cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={saveOrUpdateMenuItem}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 uppercase text-xs tracking-widest cursor-pointer"
            >
              {id ? 'Guardar Cambios' : 'Agregar al Menú'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuItemComponent