import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listEmployees } from '../services/EmployeeService';
import { listMenuItems } from '../services/MenuItemService';
import { listInventory } from '../services/InventoryService';
import { listSales } from '../services/SaleService';

const HomeComponent = () => {
  const navigator = useNavigate();

  const [employeeCount, setEmployeeCount] = useState(0);
  const [menuItemCount, setMenuItemCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [dailySalesTotal, setDailySalesTotal] = useState(0);

  useEffect(() => {
    listEmployees().then((res) => {
      setEmployeeCount(res.data.length);
    }).catch((err) => console.error(err))

    listMenuItems().then((res) => {
      setMenuItemCount(res.data.length);
    }).catch((err) => console.error(err))

    listInventory().then((res) => {
      setInventoryCount(res.data.length);
    }).catch((err) => console.error(err))

    listSales().then((res) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;

      const total = res.data
        .filter(sale => sale.saleDate && sale.saleDate.startsWith(today))
        .reduce((acc, sale) => acc + sale.totalAmount, 0);
        
      setDailySalesTotal(total);
    }).catch((err) => console.error(err))
  }, [])

  // Estos datos se obtendrán de la API en el futuro
  const stats = [
    { id: 1, name: 'Empleados Activos', value: employeeCount, icon: '👤', color: employeeCount == 0 ? 'border-red-500' : 'border-blue-500', link: '/employees' },
    { id: 2, name: 'Platillos en Menú', value: menuItemCount, icon: '🍴', color: menuItemCount == 0 ? 'border-red-500' : 'border-emerald-500', link: '/menu' },
    { id: 3, name: 'Ventas del Día', value: `$${dailySalesTotal.toFixed(2)}`, icon: '💰', color: 'border-orange-500', link: '/sales' },
    { id: 4, name: 'Articulos en Inventario', value: inventoryCount, icon: '📦', color: inventoryCount == 0 ? 'border-red-500' : 'border-purple-500', link: '/inventory' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Panel de Control <span className="text-blue-600">Faro del Mar</span>
        </h1>
        <p className="text-gray-500 mt-2">Bienvenido al sistema de gestión. Aquí tienes un resumen de la operación actual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            onClick={() => navigator(stat.link)}
            className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color} hover:shadow-md transition-all cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-3xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => navigator('/add-employee')}
            className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-600 font-semibold transition-all shadow-sm"
          >
            ＋ Contratar Empleado
          </button>
          <button
            onClick={() => navigator('/add-sale')}
            className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-600 font-semibold transition-all shadow-sm"
          >
            ＋ Nueva Venta
          </button>
          <button
            onClick={() => navigator('/add-menu-item')}
            className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:text-blue-600 font-semibold transition-all shadow-sm"
          >
            ＋ Agregar al Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;