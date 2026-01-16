
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ChevronRight, Heart, Share2, Bell } from 'lucide-react';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items } = useData();
  const [activeTab, setActiveTab] = useState<'resume' | 'details'>('resume');
  
  const item = items.find(i => i.id === id);

  if (!item) return null;

  return (
    <div className="flex flex-col min-h-full">
      {/* Header Fiche Produit (Mobile) */}
      <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center text-slate-500">
        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
          FICHE PRODUIT
        </div>
        <div className="flex gap-3">
          <Heart size={18} />
          <Share2 size={18} />
          <Bell size={18} />
        </div>
      </div>

      {/* Fil d'ariane conforme au Wireframe */}
      <div className="px-4 py-2 flex items-center gap-1 text-[10px] text-slate-400 font-medium uppercase">
        <span>Accueil</span>
        <ChevronRight size={10} />
        <span>Catalogue</span>
        <ChevronRight size={10} />
        <span className="text-slate-600">{item.title}</span>
      </div>

      <div className="px-8 py-4 space-y-6">
        {/* Grande image centrale avec bordure */}
        <div className="flex justify-center">
          <div className="w-48 aspect-[3/4] border-2 border-slate-800 dark:border-slate-400 p-1 relative shadow-lg">
            <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-center font-bold text-slate-800 dark:text-white uppercase tracking-wider">
          {item.title}
        </h1>

        {/* Section Onglets / Résumé comme sur le wireframe */}
        <div className="border-t-2 border-slate-800 dark:border-slate-400 pt-2">
          <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 mb-4">
            <button 
              onClick={() => setActiveTab('resume')}
              className={`pb-1 text-xs font-bold uppercase ${activeTab === 'resume' ? 'border-b-2 border-slate-800 dark:border-slate-400' : 'text-slate-400'}`}
            >
              Résumé
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-1 text-xs font-bold uppercase ${activeTab === 'details' ? 'border-b-2 border-slate-800 dark:border-slate-400' : 'text-slate-400'}`}
            >
              Détails
            </button>
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
            {activeTab === 'resume' ? (
              item.description || "Aucun résumé disponible pour cet ouvrage."
            ) : (
              <ul className="space-y-2 not-italic">
                <li><span className="font-bold">Auteur:</span> {item.author}</li>
                <li><span className="font-bold">Type:</span> {item.type}</li>
                <li><span className="font-bold">Emplacement:</span> {item.location}</li>
                <li><span className="font-bold">Status:</span> {item.available ? 'Disponible' : 'Emprunté'}</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
