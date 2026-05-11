import React, { useEffect, useState } from 'react'
import { listSales, deleteSale, getSale } from '../services/SaleService'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'

const ListSaleComponent = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigator = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
    getAllSales();
  }, [location])

  function handleConfirmDelete() {
    deleteSale(idToDelete).then((res) => {
      getAllSales();
      setIsModalOpen(false);
      setToastMessage('Registro de venta eliminado correctamente');
    }).catch(err => console.error(err))
  }

  const getAllSales = () => {
    listSales().then((res) => {
      setSales(res.data);
    }).catch(err => console.error(err));
  }

  function addNewSale() {
    navigator('/add-sale');
  }

  function removeSale(id) {
    setIdToDelete(id);
    setIsModalOpen(true);
  }

  function viewDetails(id) {
    getSale(id).then((response) => {
      setSelectedSale(response.data);
      setShowModal(true);
    }).catch(error => console.error(error));
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
          Historial de Ventas
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="mb-10 flex justify-center">
        <button 
          onClick={addNewSale} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <span className="text-lg">＋</span>
          Nueva Venta
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mb-10">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Folio</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha y Hora</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Atendió</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Monto Total</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Acciones</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-50">
            {sales.map(sale => (
              <tr key={sale.id} className="hover:bg-blue-50/100 transition-colors">
                {/* Folio en gris, igual que el ID de empleados */}
                <td className="px-6 py-4 text-sm font-medium text-gray-400">{sale.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {new Date(sale.saleDate).toLocaleString('es-MX', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {sale.employeeName}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">
                  ${sale.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-all text-xs uppercase tracking-wider cursor-pointer"
                      onClick={() => viewDetails(sale.id)}
                    >
                      Detalles
                    </button>
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-all text-xs uppercase tracking-wider cursor-pointer"
                      onClick={() => removeSale(sale.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sales.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm italic">No se han registrado ventas todavía.</p>
          </div>
        )}
      </div>

      {/* MODAL DE DETALLES */}
      {showModal && selectedSale && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Venta #{selectedSale.id}</h3>
                <div className="flex gap-4 mt-1">
                  <p className="text-xs text-gray-400 uppercase tracking-widest border-r pr-4 border-gray-200">
                    {new Date(selectedSale.saleDate).toLocaleString('es-MX')}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Detalle de productos</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="pb-4">Platillo</th>
                    <th className="pb-4 text-center">Cant.</th>
                    <th className="pb-4 text-right">Precio</th>
                    <th className="pb-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {selectedSale.saleDetails.map((detail, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-bold text-gray-700">
                        {detail.menuItemName}
                      </td>
                      <td className="py-4 text-sm text-center text-gray-500">{detail.quantity}</td>
                      <td className="py-4 text-sm text-right text-gray-500">${detail.price.toFixed(2)}</td>
                      <td className="py-4 text-sm text-right font-bold text-gray-800">
                        ${(detail.quantity * detail.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500 italic">
                Atendido por: <span className="font-bold text-blue-600">{selectedSale.employeeName}</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pagado</p>
                <p className="text-2xl font-bold text-blue-600">${selectedSale.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta venta? Esta acción no se puede deshacer."
      />
    </div>
  )
}

export default ListSaleComponent