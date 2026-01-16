import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { items } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const newItems = items.filter(i => i.isNew);

  return (
    <div className="p-5 space-y-8 max-w-lg mx-auto">
      {/* Search Bar - Sophisticated minimalist */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Rechercher un ouvrage, un DVD..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-burgundy-500/20 focus:border-burgundy-500 outline-none transition-all"
        />
        <div className="absolute right-3 top-2.5 p-1.5 bg-burgundy-500 text-white rounded-lg shadow-sm">
          <Search size={16} />
        </div>
      </div>

      {/* Fréquentation actuelle - Graphique plus pro */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fréquentation actuelle</h2>
          <span className="text-[10px] font-bold text-burgundy-500 bg-burgundy-50 px-2 py-0.5 rounded-full">EN DIRECT</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl h-36 p-5 flex items-end justify-between gap-1.5 relative overflow-hidden">
          {/* Subtle background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="h-1/4 border-b border-slate-900"></div>
            <div className="h-1/4 border-b border-slate-900"></div>
            <div className="h-1/4 border-b border-slate-900"></div>
          </div>
          
          {[30, 45, 75, 55, 95, 80, 40, 60, 85, 45].map((h, i) => (
            <div key={i} className="group relative flex-1">
              <div 
                style={{ height: `${h}%` }} 
                className={`w-full rounded-t-md transition-all duration-500 ${h > 80 ? 'bg-burgundy-500' : 'bg-slate-300 dark:bg-slate-600'}`}
              ></div>
              {/* Tooltip on hover simulation */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {h}%
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nouveautés - Carousel horizontal épuré */}
      <section className="space-y-5">
        <h2 className="text-center text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Nouveautés <span className="text-burgundy-500">.</span>
        </h2>
        
        <div className="relative flex items-center group">
          <button className="absolute -left-2 z-10 p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-lg text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-5 overflow-x-auto scrollbar-hide px-2 pb-4 snap-x">
            {newItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/book/${item.id}`)}
                className="flex-shrink-0 w-32 snap-center cursor-pointer group/card"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm group-hover/card:shadow-xl group-hover/card:-translate-y-1 transition-all border border-slate-200 dark:border-slate-700 bg-white">
                  <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-3">
                  <h3 className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 uppercase leading-tight">{item.title}</h3>
                  <p className="text-[9px] text-slate-400 font-medium truncate">{item.author}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="absolute -right-2 z-10 p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full shadow-lg text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;