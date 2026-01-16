
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  NavLink, 
  useLocation, 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Search, 
  Settings as SettingsIcon, 
  Bell, 
  User as UserIcon, 
  Menu, 
  Package, 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Heart,
  BookMarked,
  Calendar,
  Trash2,
  Share2,
  Eye,
  Sun,
  Moon,
  Type as TypeIcon,
  Megaphone,
  Users,
  BookOpen
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---

export enum ItemType {
  BOOK = 'Livre',
  DVD = 'DVD',
  CD = 'CD',
  COMIC = 'BD',
  JOURNAL = 'Revue',
  VR = 'Réalité Virtuelle'
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  type: ItemType;
  coverUrl: string;
  isNew?: boolean;
  available: boolean;
  description?: string;
  location?: string;
  rating?: number;
  reviews?: Review[];
  categories?: string[];
}

export interface Loan {
  id: string;
  item: LibraryItem;
  dueDate: string;
  isOverdue: boolean;
}

export interface Reservation {
  id: string;
  item: LibraryItem;
  date: string;
  status: 'Pending' | 'Available';
}

export interface User {
  id: string;
  name: string;
  studentId: string;
  loans: Loan[];
  favorites: string[];
  reservations: Reservation[];
  events: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Atelier' | 'Rencontre' | 'Exposition';
  description: string;
}

// --- CONSTANTS & MOCK DATA ---

const SYSTEM_INSTRUCTION = `You are "BiblioBot", an AI assistant for the IUT Dijon Library.
Your goal is to help students with information about the library.
Key Information: Location IUT Dijon. Resources: 580 DVDs, 715 books/year. 70,830 entries in 2024.
Peak times: 12:30-13:30. Services: Loans, VR, 3D printing.
Tone: Helpful, friendly, student-oriented.`;

const MOCK_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: "L'IA pour les Nuls",
    author: 'John Paul Mueller',
    type: ItemType.BOOK,
    coverUrl: 'https://m.media-amazon.com/images/I/71t4tC61cZL._SY466_.jpg',
    isNew: true,
    available: true,
    description: "Tout ce que vous avez toujours voulu savoir sur l'intelligence artificielle.",
    location: "Informatique - Rayon A2",
    categories: ["Informatique"]
  },
  {
    id: '2',
    title: 'Inception',
    author: 'Christopher Nolan',
    type: ItemType.DVD,
    coverUrl: 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_SL1500_.jpg',
    available: true,
    description: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction.",
    location: "Médiathèque - Zone DVD"
  },
  {
    id: '3',
    title: 'Design Patterns',
    author: 'Eric Freeman',
    type: ItemType.BOOK,
    coverUrl: 'https://m.media-amazon.com/images/I/917iQZ8H1VL._SY466_.jpg',
    available: false,
    location: "Informatique - Rayon B1"
  },
  {
    id: '4',
    title: 'Astérix et le Griffon',
    author: 'Jean-Yves Ferri',
    type: ItemType.COMIC,
    coverUrl: 'https://m.media-amazon.com/images/I/81x2-tJ7tUL._SY466_.jpg',
    isNew: true,
    available: true,
    location: "BD - Bac 4"
  }
];

const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: "Atelier CV & LinkedIn", date: "15 Oct", time: "14:00", type: "Atelier", description: "Optimisez votre profil." },
  { id: 'e2', title: "Rencontre Auteur", date: "22 Oct", time: "17:30", type: "Rencontre", description: "Discussion polar." }
];

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alexandre Dupont',
  studentId: '22304591',
  loans: [
    { id: 'l1', item: MOCK_ITEMS[1], dueDate: '2023-11-15', isOverdue: true },
    { id: 'l2', item: MOCK_ITEMS[2], dueDate: '2025-12-20', isOverdue: false }
  ],
  favorites: ['1', '4'],
  reservations: [],
  events: []
};

const HOURLY_TRAFFIC_DATA = [
  { name: '08:00', value: 20 }, { name: '10:00', value: 80 }, { name: '12:00', value: 120 },
  { name: '12:30', value: 180 }, { name: '14:00', value: 140 }, { name: '16:00', value: 110 },
  { name: '18:00', value: 30 }
];

const MONTHLY_STATS_DATA = [
  { name: 'Sept', value: 450 }, { name: 'Oct', value: 680 }, { name: 'Nov', value: 720 },
  { name: 'Déc', value: 550 }, { name: 'Jan', value: 480 }, { name: 'Fév', value: 510 }
];

// --- AI SERVICE ---

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error(error);
    return "Erreur de connexion à l'IA.";
  }
};

// --- CONTEXTS ---

const ThemeContext = createContext<any>(undefined);
const DataContext = createContext<any>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [colorFilter, setColorFilter] = useState('none');

  useEffect(() => {
    const html = document.documentElement;
    isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
    const sizeMap: any = { 'normal': '100%', 'large': '115%', 'xl': '130%' };
    html.style.fontSize = sizeMap[textSize];
    document.body.className = document.body.className.replace(/filter-\w+/g, '').trim();
    if (colorFilter !== 'none') document.body.classList.add(`filter-${colorFilter}`);
  }, [isDarkMode, textSize, colorFilter]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode), textSize, setTextSize, colorFilter, setColorFilter }}>
      {children}
    </ThemeContext.Provider>
  );
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<LibraryItem[]>(MOCK_ITEMS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [events] = useState<CalendarEvent[]>(MOCK_EVENTS);

  const toggleFavorite = (id: string) => {
    setUser(u => ({
      ...u,
      favorites: u.favorites.includes(id) ? u.favorites.filter(fid => fid !== id) : [...u.favorites, id]
    }));
  };

  const cancelReservation = (id: string) => {
    setUser(u => ({ ...u, reservations: u.reservations.filter(r => r.id !== id) }));
  };

  return (
    <DataContext.Provider value={{ items, user, events, toggleFavorite, cancelReservation }}>
      {children}
    </DataContext.Provider>
  );
};

// --- COMPONENTS ---

const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: any) => {
  const variants: any = {
    primary: "bg-burgundy-500 text-white hover:bg-burgundy-600",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
  };
  const sizes: any = { sm: "h-9 px-4 text-xs", md: "h-11 px-6 text-sm", lg: "h-14 px-8 text-base" };
  return (
    <button className={`inline-flex items-center justify-center font-bold rounded-xl transition-all active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }: any) => (
  <div onClick={onClick} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: '1', text: "Bonjour ! Je suis BiblioBot. Comment puis-je vous aider ?", sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const reply = await sendMessageToGemini(input);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: 'bot' }]);
    setLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-20 right-4 bg-burgundy-500 text-white p-4 rounded-full shadow-lg z-50">
          <MessageCircle />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[90vw] md:w-80 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-burgundy-500 p-4 flex justify-between text-white font-bold">
            <span>BiblioBot</span>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-xs ${m.sender === 'user' ? 'bg-burgundy-500 text-white' : 'bg-white dark:bg-slate-800 border dark:border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <Loader2 className="animate-spin text-burgundy-500" size={16} />}
            <div ref={endRef} />
          </div>
          <div className="p-2 border-t flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Message..." className="flex-1 text-xs p-2 rounded-lg border focus:outline-none dark:bg-slate-700 dark:border-slate-600" />
            <button onClick={handleSend} className="bg-burgundy-500 text-white p-2 rounded-lg"><Send size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 pb-16">
    <header className="h-14 border-b dark:border-slate-800 flex items-center justify-between px-5 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40">
      <Menu size={20} className="text-slate-500" />
      <div className="flex flex-col items-center">
        <span className="text-[8px] font-black text-burgundy-500 uppercase tracking-widest">Université</span>
        <span className="text-[10px] font-black text-burgundy-500 uppercase">Bourgogne</span>
      </div>
      <Bell size={20} className="text-slate-500" />
    </header>
    <main className="max-w-md mx-auto">{children}</main>
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t dark:border-slate-700 h-16 flex justify-around items-center">
      <NavItem to="/" icon={<HomeIcon size={20} />} label="Accueil" />
      <NavItem to="/catalog" icon={<Search size={20} />} label="Catalogue" />
      <NavItem to="/profile" icon={<Package size={20} />} label="Emprunts" />
      <NavItem to="/settings" icon={<SettingsIcon size={20} />} label="Réglages" />
    </nav>
  </div>
);

const NavItem = ({ to, icon, label }: any) => (
  <NavLink to={to} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-burgundy-500' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[8px] font-bold uppercase">{label}</span>
  </NavLink>
);

// --- PAGES ---

const Home = () => {
  const { items } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className="p-5 space-y-6">
      <div className="relative">
        <input placeholder="Rechercher..." className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl py-3 px-4 border text-sm" />
      </div>
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Affluence</h2>
          <span className="text-[8px] font-bold text-burgundy-500 bg-burgundy-50 px-2 rounded-full">LIVE</span>
        </div>
        <div className="h-32 flex items-end justify-between gap-1 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
          {[40, 60, 80, 50, 90, 70, 30, 45].map((v, i) => (
            <div key={i} style={{ height: `${v}%` }} className={`flex-1 rounded-t-sm ${v > 80 ? 'bg-burgundy-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-center font-bold mb-4">Nouveautés</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {items.filter((i: any) => i.isNew).map((item: any) => (
            <div key={item.id} onClick={() => navigate(`/book/${item.id}`)} className="flex-shrink-0 w-28">
              <img src={item.coverUrl} className="w-full aspect-[3/4] rounded-lg shadow-sm" alt={item.title} />
              <p className="text-[8px] font-bold uppercase mt-2 truncate">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Catalog = () => {
  const { items } = useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div className="p-5 space-y-5">
      <h2 className="font-bold text-lg">Le Catalogue</h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => navigate(`/book/${item.id}`)} className="space-y-1">
            <img src={item.coverUrl} className="w-full aspect-[3/4] rounded-lg object-cover border" alt={item.title} />
            <p className="text-[8px] font-bold uppercase truncate">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetail = () => {
  const { id } = useParams();
  const { items } = useContext(DataContext);
  const item = items.find((i: any) => i.id === id);
  if (!item) return <div className="p-10 text-center">Introuvable</div>;
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center">
        <div className="w-40 aspect-[3/4] border-4 border-burgundy-500 p-1 shadow-2xl">
          <img src={item.coverUrl} className="w-full h-full object-cover" alt={item.title} />
        </div>
      </div>
      <h1 className="text-xl font-black text-center uppercase">{item.title}</h1>
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 italic">
        <p>{item.description || "Pas de description disponible."}</p>
        <div className="not-italic bg-slate-50 dark:bg-slate-800 p-4 rounded-xl space-y-1 border">
          <p><strong>Auteur:</strong> {item.author}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Status:</strong> {item.available ? 'Disponible' : 'Emprunté'}</p>
        </div>
        <Button className="w-full">Réserver cet ouvrage</Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user } = useContext(DataContext);
  return (
    <div className="p-5 space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 bg-burgundy-100 text-burgundy-600 rounded-full flex items-center justify-center font-bold text-xl">{user.name.charAt(0)}</div>
        <div>
          <h2 className="font-bold">{user.name}</h2>
          <p className="text-xs text-slate-500">N° {user.studentId}</p>
        </div>
      </header>
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase text-slate-400">Emprunts en cours</h3>
        {user.loans.map((l: any) => (
          <div key={l.id} className="flex gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border">
            <img src={l.item.coverUrl} className="w-10 h-14 rounded object-cover" alt={l.item.title} />
            <div>
              <p className="text-xs font-bold uppercase">{l.item.title}</p>
              <p className={`text-[10px] font-bold ${l.isOverdue ? 'text-red-500' : 'text-emerald-500'}`}>
                {l.isOverdue ? 'RETARD' : 'À RENDRE LE ' + l.dueDate}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Settings = () => {
  const { isDarkMode, toggleDarkMode, textSize, setTextSize, colorFilter, setColorFilter } = useContext(ThemeContext);
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-black uppercase">Réglages</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
          <span className="text-sm font-bold">Mode Sombre</span>
          <button onClick={toggleDarkMode} className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-burgundy-500' : 'bg-slate-300'}`} />
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-3">
          <span className="text-sm font-bold">Taille du texte</span>
          <div className="flex gap-2">
            {['normal', 'large', 'xl'].map(s => (
              <button key={s} onClick={() => setTextSize(s)} className={`flex-1 p-2 rounded-lg text-xs font-bold border ${textSize === s ? 'bg-burgundy-500 text-white border-burgundy-500' : 'bg-white dark:bg-slate-700'}`}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App = () => (
  <ThemeProvider>
    <DataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <ChatBot />
      </Router>
    </DataProvider>
  </ThemeProvider>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
