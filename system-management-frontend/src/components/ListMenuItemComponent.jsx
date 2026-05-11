import React, { useEffect, useState } from 'react'
import { deleteMenuItem, listMenuItems } from '../services/MenuItemService'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'
import platilloImg from '../assets/platillo.jfif'

const ListMenuItemComponent = () => {
  const [menuItems, setMenuItems] = useState([]);
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
    getAllMenuItems();
  }, [location])

  function handleConfirmDelete() {
    deleteMenuItem(idToDelete).then((res) => {
      getAllMenuItems();
      setIsModalOpen(false);
      setToastMessage('Platillo eliminado correctamente');
    }).catch(err => console.error(err))
  }

  function getAllMenuItems() {
    listMenuItems().then((res) => {
      setMenuItems(res.data);
    }).catch((err) => console.log(err))
  }

  function addNewMenuItem() {
    navigator('/add-menu-item');
  }

  function updateMenuItem(id) {
    navigator(`/edit-menu-item/${id}`)
  }

  function removeMenuItem(id) {
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
          Menú
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="mb-10 flex justify-center">
        <button 
          onClick={addNewMenuItem} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <span className="text-lg">＋</span>
          Nuevo Platillo
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col max-w-[280px] mx-auto w-full"
          >
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img
                src={platilloImg}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <div className="mb-4">
                <h3 className="text-md font-bold text-gray-800 leading-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2 italic mb-3">
                  {item.description || "Sin descripción disponible."}
                </p>
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded-md mt-2">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                <button 
                  onClick={() => updateMenuItem(item.id)}
                  className="w-full py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer text-xs uppercase"
                >
                  Editar
                </button>
                <button 
                  onClick={() => removeMenuItem(item.id)}
                  className="w-full py-2 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer text-xs uppercase"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No se han encontrado platillos.</p>
        </div>
      )}

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este platillo? Esta acción no se puede deshacer."
      />
    </div>
  )
}

export default ListMenuItemComponent