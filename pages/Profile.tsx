
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { useData } from '../contexts/DataContext';
import { AlertCircle, CheckCircle, Clock, Heart, BookMarked, Calendar, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, items, events, cancelReservation, toggleFavorite } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'loans' | 'reservations' | 'favorites' | 'events'>('loans');

  const overdueLoans = user.loans.filter(l => l.isOverdue);
  
  // Resolve favorite items
  const favoriteItems = items.filter(i => user.favorites.includes(i.id));
  
  // Resolve event items
  const userEvents = events.filter(e => user.events.includes(e.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">Étudiant • N° {user.studentId}</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {overdueLoans.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-4 animate-pulse">
           <div className="text-red-600 dark:text-red-400 mt-1">
             <AlertCircle size={24} />
           </div>
           <div className="flex-1">
             <h3 className="text-red-900 dark:text-red-200 font-bold">Action Requise : Retard détecté</h3>
             <p className="text-red-700 dark:text-red-300 text-sm mt-1">
               Vous avez {overdueLoans.length} ouvrage(s) en retard. Merci de les rapporter au plus vite pour éviter des pénalités.
             </p>
           </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <TabButton active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} icon={<BookMarked size={18} />} label="Emprunts" />
        <TabButton active={activeTab === 'reservations'} onClick={() => setActiveTab('reservations')} icon={<Clock size={18} />} label="Réservations" count={user.reservations.length} />
        <TabButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} icon={<Heart size={18} />} label="Favoris" count={user.favorites.length} />
        <TabButton active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={<Calendar size={18} />} label="Événements" count={user.events.length} />
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in duration-300">
        
        {/* LOANS TAB */}
        {activeTab === 'loans' && (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Mes Emprunts en cours</CardTitle>
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-bold">
                {user.loans.length} actifs
              </span>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 dark:divide-slate-700">
              {user.loans.map(loan => (
                <div key={loan.id} className="py-4 flex flex-col sm:flex-row gap-4 sm:items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-colors" onClick={() => navigate(`/book/${loan.item.id}`)}>
                    <div className="w-16 h-24 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0">
                      <img src={loan.item.coverUrl} alt={loan.item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{loan.item.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{loan.item.author}</p>
                          </div>
                          
                          {loan.isOverdue ? (
                            <div className="flex flex-col items-end">
                              <span className="flex items-center text-red-600 dark:text-red-400 text-sm font-bold bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg">
                                <AlertCircle size={14} className="mr-1" /> En retard
                              </span>
                              <span className="text-xs text-red-500 mt-1">Dû le {new Date(loan.dueDate).toLocaleDateString('fr-FR')}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
                                <Clock size={14} className="mr-1" /> En cours
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">À rendre le {new Date(loan.dueDate).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                      </div>
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* RESERVATIONS TAB */}
        {activeTab === 'reservations' && (
           <Card>
             <CardHeader>
               <CardTitle>Mes Réservations</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {user.reservations.length === 0 ? (
                 <div className="text-center py-8 text-slate-500 dark:text-slate-400 italic">Aucune réservation en cours.</div>
               ) : (
                 user.reservations.map(res => (
                    <div key={res.id} className="flex gap-4 items-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-xl">
                       <img src={res.item.coverUrl} className="w-12 h-16 object-cover rounded bg-slate-200" alt={res.item.title} />
                       <div className="flex-1">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200">{res.item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Demandé le {new Date(res.date).toLocaleDateString()}</p>
                          <span className="inline-block mt-1 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-0.5 rounded-full">En attente</span>
                       </div>
                       <button onClick={() => cancelReservation(res.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors" title="Annuler">
                          <Trash2 size={18} />
                       </button>
                    </div>
                 ))
               )}
             </CardContent>
           </Card>
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteItems.length === 0 ? (
               <div className="col-span-2 text-center py-12 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
                 Vous n'avez pas encore de favoris. Explorez le catalogue !
               </div>
            ) : (
               favoriteItems.map(item => (
                 <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4 relative group">
                    <img src={item.coverUrl} className="w-20 h-28 object-cover rounded-lg shadow-sm cursor-pointer" onClick={() => navigate(`/book/${item.id}`)} alt={item.title} />
                    <div className="flex-1">
                       <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2 cursor-pointer hover:text-blue-600" onClick={() => navigate(`/book/${item.id}`)}>{item.title}</h4>
                       <p className="text-sm text-slate-500 dark:text-slate-400">{item.author}</p>
                       <p className="text-xs text-blue-500 mt-2">{item.type}</p>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-slate-700/80 rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
               ))
            )}
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
           <div className="space-y-4">
             {userEvents.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800 rounded-xl">
                  Vous n'êtes inscrit à aucun événement.
                </div>
             ) : (
                userEvents.map(event => (
                  <div key={event.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg w-12 h-12">
                          <span className="text-[10px] font-bold uppercase">{event.date.split(' ')[1]}</span>
                          <span className="text-lg font-bold">{event.date.split(' ')[0]}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800 dark:text-slate-200">{event.title}</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">{event.time} • {event.type}</p>
                        </div>
                     </div>
                     <span className="text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full">
                       Inscrit
                     </span>
                  </div>
                ))
             )}
           </div>
        )}

      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count?: number }> = ({ active, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors
      ${active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
      }`}
  >
    {icon}
    {label}
    {count !== undefined && count > 0 && (
      <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'}`}>
        {count}
      </span>
    )}
  </button>
);

export default Profile;
