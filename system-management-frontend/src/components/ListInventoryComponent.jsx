import React, { useEffect, useState } from 'react'
import { listInventory, deleteInventoryItem } from '../services/InventoryService'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'

const ListInventoryComponent = () => {
  const [inventory, setInventory] = useState([]);
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
    getAllInventoryItems();
  }, [location])

  function handleConfirmDelete() {
    deleteInventoryItem(idToDelete).then((res) => {
      getAllInventoryItems();
      setIsModalOpen(false);
      setToastMessage('Insumo eliminado correctamente');
    }).catch(err => console.error(err))
  }

  function getAllInventoryItems() {
    listInventory().then((res) => {
      setInventory(res.data);
    }).catch((err) => console.error(err))
  }

  function addNewInventoryItem() {
    navigator('/add-inventory-item');
  }

  function updateInventoryItem(id) {
    navigator(`/edit-inventory-item/${id}`)
  }

  function removeInventoryItem(id) {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">Control de Inventario</h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="mb-10 flex justify-center">
        <button 
          onClick={() => addNewInventoryItem()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer text-sm"
        >
          ＋ Agregar Insumo
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Producto</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Cantidad</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Proveedor</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-blue-100 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-400">{item.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.quantity} unidades</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.supplierName || `ID: ${item.supplierId}`}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => updateInventoryItem(item.id)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 text-[10px] uppercase cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removeInventoryItem(item.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 text-[10px] uppercase cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inventory.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm italic">No hay inventario aún.</p>
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este insumo? Esta acción no se puede deshacer."
      />
    </div>
  )
}

export default ListInventoryComponent