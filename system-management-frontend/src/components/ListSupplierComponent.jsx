import React, { useEffect, useState } from 'react'
import { deleteSupplier, listSuppliers } from '../services/SupplierService'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'

const ListSupplierComponent = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [toastMessage, setToastMessage] = useState('')
  const navigator = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message)
      window.history.replaceState({}, document.title)
    }
    getAllSuppliers();
  }, [location])

  function handleConfirmDelete() {
    deleteSupplier(idToDelete).then((res) => {
      getAllSuppliers();
      setIsModalOpen(false);
      setToastMessage('Proveedor eliminado correctamente');
    }).catch(err => console.error(err))
  }

  function getAllSuppliers() {
    listSuppliers().then((res) => {
      setSuppliers(res.data);
    }).catch((err) => console.error(err))
  }

  function addNewSupplier() {
    navigator('/add-supplier');
  }

  function updateSupplier(id) {
    navigator(`/edit-supplier/${id}`)
  }

  function removeSupplier(id) {
    setIdToDelete(id);
    setIsModalOpen(true);
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')} 
       />
      )}

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
          Gestión de Proveedores
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="mb-10 flex justify-center">
        <button 
          onClick={addNewSupplier} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <span className="text-lg">＋</span>
          Nuevo proveedor
        </button>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Nombre</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Teléfono</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Dirección</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {suppliers.map(supplier => (
              <tr key={supplier.id} className="hover:bg-blue-50/100 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-400">{supplier.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">{supplier.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{supplier.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{supplier.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{supplier.address}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-all text-[10px] uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSupplier(supplier.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-all text-[10px] uppercase tracking-wider cursor-pointer"
                      onClick={() => removeSupplier(supplier.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {suppliers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm italic">No hay proveedores registrados aún.</p>
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer."
      />
    </div>
  )
}

export default ListSupplierComponent