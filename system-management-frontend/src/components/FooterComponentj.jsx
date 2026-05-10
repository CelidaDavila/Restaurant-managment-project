import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Faro del Mar</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Llevando el sabor del océano directamente a tu mesa. Gestión interna de calidad y frescura.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Módulos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Empleados</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Menú</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Ventas</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Inventario</a></li>
            </ul>
          </div>

          {/* Columna 3: Soporte Técnico (Muy útil para la materia) */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Sistema</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="block">Versión 1.0</span></li>
              <li><span className="block">Base de Datos: PostgreSQL</span></li>
              <li><span className="block">Backend: Spring Boot</span></li>
            </ul>
          </div>

          {/* Columna 4: Contacto simulado */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">Guadalajara, Jalisco.</p>
            <p className="text-sm text-gray-400">info@farodelmar.com</p>
          </div>
        </div>

        {/* Línea final de copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Faro del Mar. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0 italic">"Navegando hacia el mejor sabor"</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;