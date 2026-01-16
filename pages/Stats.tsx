import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { HOURLY_TRAFFIC_DATA, MONTHLY_STATS_DATA } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Users, BookOpen, Clock } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Données & Statistiques</h2>
        <p className="text-slate-500">Visualisez l'activité de la bibliothèque en temps réel et sur l'année.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Fréquentation Annuelle</p>
            <p className="text-2xl font-bold text-slate-800">70 830</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Nouveaux Ouvrages/an</p>
            <p className="text-2xl font-bold text-slate-800">715</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Heure de pointe</p>
            <p className="text-2xl font-bold text-slate-800">12h30</p>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Traffic */}
        <Card className="h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Affluence Journalière (Moyenne)</CardTitle>
            <p className="text-sm text-slate-500">Pic notable entre 12h30 et 13h30</p>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={HOURLY_TRAFFIC_DATA}>
                 <defs>
                   <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                 />
                 <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
               </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Stats */}
        <Card className="h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Fréquentation par Mois</CardTitle>
            <p className="text-sm text-slate-500">Période intense : Octobre - Décembre</p>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MONTHLY_STATS_DATA}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                 <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {MONTHLY_STATS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 600 ? '#f59e0b' : '#3b82f6'} />
                    ))}
                 </Bar>
               </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
