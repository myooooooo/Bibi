import React, { useState } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const Catalog: React.FC = () => {
  const { items } = useData();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('TOUT');

  const filters = ['TOUT', 'LIVRES', 'DVD', 'VR', 'BD'];

  return (
    <div className="p-5 space-y-6">
      {/* Search Header */}
      <div className="relative">
        <input
          type="text"
          placeholder="Titre, auteur, mot-clé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border-b-2 border-slate-100 dark:border-slate-700 py-3 pl-2 pr-10 text-sm focus:border-burgundy-500 outline-none transition-all font-medium"
        />
        <Search className="absolute right-2 top-3 text-slate-400" size={18} />
      </div>

      {/* Filters pill style - More professional */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
        <Filter size={14} className="text-slate-400 flex-shrink-0" />
        <div className="flex gap-2">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all whitespace-nowrap border
                ${activeFilter === f 
                  ? 'bg-burgundy-500 border-burgundy-500 text-white shadow-md' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-burgundy-200'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Grid */}
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <div 
            key={item.id} 
            onClick={() => navigate(`/book/${item.id}`)}
            className="group cursor-pointer space-y-2"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-[1.03] bg-slate-50">
              <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
              
              {/* Dispo indicator */}
              {item.available && (
                <div className="absolute top-1.5 right-1.5 p-0.5 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-sm">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
              )}
            </div>
            <div className="px-0.5">
              <p className="text-[9px] font-bold text-slate-800 dark:text-slate-200 leading-tight line-clamp-1 uppercase tracking-tighter">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;