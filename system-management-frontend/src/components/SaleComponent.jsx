import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listEmployees } from '../services/EmployeeService'
import { listMenuItems } from '../services/MenuItemService'
import { createSale } from '../services/SaleService'

const SaleComponent = () => {
  const [employees, setEmployees] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [employeeId, setEmployeeId] = useState('')
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const [itemQuantities, setItemQuantities] = useState({})

  const [errors, setErrors] = useState({ employeeId: '', cart: '' })
  const navigator = useNavigate()

  useEffect(() => {
    listEmployees().then(res => setEmployees(res.data)).catch(err => console.error(err))
    listMenuItems().then(res => {
      setMenuItems(res.data)
      const initialQtys = {}
      res.data.forEach(item => initialQtys[item.id] = 1)
      setItemQuantities(initialQtys)
    }).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    setTotalAmount(total)
  }, [cart])

  const handleQtyChange = (itemId, val) => {
    const qty = parseInt(val)
    if (qty >= 1) {
      setItemQuantities({ ...itemQuantities, [itemId]: qty })
    }
  }

  const addToCart = (menuItem) => {
    const quantityToAdd = itemQuantities[menuItem.id] || 1
    const existingItem = cart.find(item => item.menuItemId === menuItem.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item && item.menuItemId === menuItem.id 
          ? { ...item, quantity: item.quantity + quantityToAdd } 
          : item
      ).filter(Boolean))
    } else {
      const newItem = {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: quantityToAdd
      }
      setCart([...cart, newItem])
    }
    setErrors({ ...errors, cart: '' })
  }

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(item => item && item.menuItemId !== menuItemId))
  }

  const handleSaveSale = (e) => {
    e.preventDefault();

    if (validateSale()) {
      const sale = {
        employeeId: parseInt(employeeId),
        totalAmount: totalAmount,
        saleDetails: cart.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price
        }))
      };

      createSale(sale).then((response) => {
        console.log("Venta guardada:", response.data);
        setCart([]);
        setEmployeeId('');
        setErrors({});
        navigator('/sales', { state: { message: '¡Venta finalizada y guardada con éxito!' } });
      }).catch(error => console.error(error));
    }
  }

  function validateSale() {
    let valid = true
    const errorsCopy = { employeeId: '', cart: '' }
    if (!employeeId) { errorsCopy.employeeId = "Selecciona un empleado"; valid = false }
    if (cart.length === 0) { errorsCopy.cart = "Carrito vacío"; valid = false }
    setErrors(errorsCopy)
    return valid
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-widest">Punto de Venta</h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Menú</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map(item => (
                <div key={item.id} className="p-4 border border-gray-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-700">{item.name}</h4>
                      <span className="text-blue-600 font-bold">${item.price}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="1" 
                      className="w-16 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                      value={itemQuantities[item.id] || 1}
                      onChange={(e) => handleQtyChange(item.id, e.target.value)}
                    />
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-blue-700 uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Resumen</h3>
          
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Atiende:</label>
            <select 
              className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm outline-none ${
                errors.employeeId ? 'border-red-500' : 'border-gray-100 focus:ring-2 focus:ring-blue-500'
              }`}
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>)}
            </select>
            {errors.employeeId && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.employeeId}</p>}
          </div>

          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              item && (
                <div key={index} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                  <div>
                    <p className="font-bold text-gray-700">{item.name}</p>
                    <p className="text-[10px] text-gray-400">{item.quantity} x ${item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.menuItemId)} className="text-red-400 text-xs cursor-pointer">✕</button>
                </div>
              )
            ))}
            {cart.length === 0 && (
              <div className="py-4 text-center">
                  <p className="text-gray-400 text-xs italic">No hay platillos seleccionados</p>
                  {errors.cart && <p className="text-red-500 text-[10px] mt-2 not-italic font-bold">{errors.cart}</p>}
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase">Total:</span>
              <span className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
            </div>
            <button onClick={handleSaveSale} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 uppercase text-xs tracking-widest transition-all cursor-pointer">
              Finalizar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleComponent