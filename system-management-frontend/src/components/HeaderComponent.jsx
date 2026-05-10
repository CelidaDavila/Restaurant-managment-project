import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo y Nombre */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="font-bold text-xl tracking-tight text-blue-600">
                Faro del mar
              </span>
            </div>
            
            {/* Links Escritorio */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link to="/employees" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Empleados
              </Link>
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Menú
              </Link>
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Inventario
              </Link>
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Ventas
              </Link>
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Proovedores
              </Link>
            </div>
          </div>

          {/* Perfil / Acciones derecha */}
          <div className="hidden md:flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-shadow shadow-md">
              Nueva Venta
            </button>
            <div className="ml-4 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300">
                A
              </div>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/employees" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Empleados</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Menú</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Inventario</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Ventas</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50">Proveedores</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderComponent;