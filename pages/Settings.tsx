import React from 'react';
import { Eye, Sun, Moon, Type, Megaphone, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode, textSize, setTextSize, colorFilter, setColorFilter } = useTheme();

  const handleToggleColorFilter = () => {
    setColorFilter(colorFilter === 'none' ? 'grayscale' : 'none');
  };

  return (
    <div className="p-6 space-y-8 max-w-lg mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          Paramètres <span className="text-burgundy-500">.</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessibilité & Interface</p>
      </header>

      <div className="space-y-6">
        {/* Toggle Sections - Professional List Style */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 space-y-6">
          
          {/* Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-slate-700 dark:text-slate-300">
                <Eye size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Mode Contraste</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Grayscale pour lecture</p>
              </div>
            </div>
            <button 
              onClick={handleToggleColorFilter}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 p-1 ${colorFilter !== 'none' ? 'bg-burgundy-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${colorFilter !== 'none' ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="h-px bg-slate-200/50 dark:bg-slate-700/50"></div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-slate-700 dark:text-slate-300">
                {isDarkMode ? <Moon size={22} className="text-blue-400" /> : <Sun size={22} className="text-orange-400" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Apparence</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{isDarkMode ? 'Mode Sombre' : 'Mode Lumineux'}</p>
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 p-1 ${isDarkMode ? 'bg-burgundy-500' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="h-px bg-slate-200/50 dark:bg-slate-700/50"></div>

          {/* Text Size Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-slate-700 dark:text-slate-300">
                  <Type size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Taille du texte</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Confort de lecture</p>
                </div>
              </div>
              <span className="text-xs font-bold text-burgundy-500 bg-burgundy-50 px-2 py-1 rounded-lg uppercase">{textSize}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="1"
              value={textSize === 'normal' ? 0 : textSize === 'large' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setTextSize(val === 0 ? 'normal' : val === 1 ? 'large' : 'xl');
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-burgundy-500"
            />
          </div>

          <div className="h-px bg-slate-200/50 dark:bg-slate-700/50"></div>

          {/* Voice Synthesis */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-slate-700 dark:text-slate-300">
                <Megaphone size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Synthèse vocale</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Lecteur d'écran intelligent</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
        </div>
      </div>

      <footer className="text-center pt-4">
        <p className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">Application Biblio IUT Dijon v1.0</p>
      </footer>
    </div>
  );
};

export default Settings;