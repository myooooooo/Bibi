import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Settings, Bell, User, Menu, Package } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 flex flex-col pb-16">
      {/* Header institutionnel */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 h-14 flex items-center justify-between px-5 sticky top-0 z-40">
        <button className="p-1 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md transition-colors">
          <Menu size={22} className="text-slate-700 dark:text-slate-300" />
        </button>
        
        <div className="flex flex-col items-center select-none">
          <span className="text-[9px] font-extrabold text-burgundy-500 uppercase tracking-widest leading-none">Université</span>
          <span className="text-[11px] font-black text-burgundy-500 uppercase tracking-tighter leading-none">Bourgogne</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-1 text-slate-700 dark:text-slate-300">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-burgundy-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
          <button className="p-1 text-slate-700 dark:text-slate-300">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-700 h-16 flex items-center justify-around px-4 z-50">
        <MobileNavItem to="/" icon={<Home size={24} />} label="Accueil" />
        <MobileNavItem to="/catalog" icon={<Search size={24} />} label="Catalogue" />
        <MobileNavItem to="/profile" icon={<Package size={24} />} label="Emprunts" />
        <MobileNavItem to="/settings" icon={<Settings size={24} />} label="Paramètres" />
      </nav>
    </div>
  );
};

const MobileNavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex flex-col items-center gap-1 transition-all
        ${isActive ? 'text-burgundy-500 scale-110' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}
      `}
    >
      {icon}
      <span className="text-[8px] font-bold uppercase tracking-wide">{label}</span>
    </NavLink>
  );
};

export default Layout;