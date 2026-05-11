import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Faro del Mar</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Llevando el sabor del océano directamente a tu mesa. Gestión interna de calidad y frescura.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Módulos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/employees" className="hover:text-blue-400 transition-colors">Empleados</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-blue-400 transition-colors">Menú</Link>
              </li>
              <li>
                <Link to="/inventory" className="hover:text-blue-400 transition-colors">Inventario</Link>
              </li>
              <li>
                <Link to="/sales" className="hover:text-blue-400 transition-colors">Ventas</Link>
              </li>
              <li>
                <Link to="/suppliers" className="hover:text-blue-400 transition-colors">Proveedores</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Sistema</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="block">Versión 1.0</span></li>
              <li><span className="block">Base de Datos: PostgreSQL</span></li>
              <li><span className="block">Backend: Spring Boot</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">Guadalajara, Jalisco.</p>
            <p className="text-sm text-gray-400">info@farodelmar.com</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Faro del Mar. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0 italic">"Navegando hacia el mejor sabor"</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;