
import { ItemType, LibraryItem, User, CalendarEvent } from './types';

export const APP_NAME = "Biblio IUT";

export const MOCK_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: "L'IA pour les Nuls",
    author: 'John Paul Mueller',
    type: ItemType.BOOK,
    coverUrl: 'https://m.media-amazon.com/images/I/71t4tC61cZL._SY466_.jpg',
    isNew: true,
    available: true,
    description: "Tout ce que vous avez toujours voulu savoir sur l'intelligence artificielle sans jamais oser le demander. Un guide complet pour débutants.",
    rating: 4.5,
    location: "Informatique - Rayon A2",
    categories: ["Informatique", "Sciences"],
    reviews: [
      { id: 'r1', user: 'Thomas', rating: 5, comment: "Super clair !", date: '2023-10-10' }
    ]
  },
  {
    id: '2',
    title: 'Inception',
    author: 'Christopher Nolan',
    type: ItemType.DVD,
    coverUrl: 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_SL1500_.jpg',
    available: true,
    description: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction : sa spécialité consiste à s'approprier les secrets les plus précieux d'un individu.",
    rating: 5,
    location: "Médiathèque - Zone DVD",
    categories: ["Science-Fiction", "Thriller"]
  },
  {
    id: '3',
    title: 'Design Patterns',
    author: 'Eric Freeman',
    type: ItemType.BOOK,
    coverUrl: 'https://m.media-amazon.com/images/I/917iQZ8H1VL._SY466_.jpg',
    available: false,
    description: "Les design patterns sont des solutions classiques à des problèmes fréquents de conception logicielle.",
    rating: 4.8,
    location: "Informatique - Rayon B1",
    categories: ["Informatique", "Design"]
  },
  {
    id: '4',
    title: 'Astérix et le Griffon',
    author: 'Jean-Yves Ferri',
    type: ItemType.COMIC,
    coverUrl: 'https://m.media-amazon.com/images/I/81x2-tJ7tUL._SY466_.jpg',
    isNew: true,
    available: true,
    description: "Astérix et Obélix partent à la recherche du Griffon, un animal fantastique.",
    rating: 4.2,
    location: "BD - Bac 4",
    categories: ["BD", "Humour"]
  },
  {
    id: '5',
    title: 'Blade Runner 2049',
    author: 'Denis Villeneuve',
    type: ItemType.DVD,
    coverUrl: 'https://m.media-amazon.com/images/I/81p+B8oGzCL._AC_SL1500_.jpg',
    available: true,
    description: "En 2049, la société est fragilisée par les nombreuses tensions entre les humains et leurs esclaves créés par bioingénierie.",
    rating: 4.7,
    location: "Médiathèque - Zone DVD",
    categories: ["Science-Fiction"]
  },
  {
    id: '6',
    title: 'Casque VR Oculus',
    author: 'Meta',
    type: ItemType.VR,
    coverUrl: 'https://m.media-amazon.com/images/I/61M9a2+2wRL._AC_SL1500_.jpg',
    available: true,
    description: "Casque de réalité virtuelle disponible pour test sur place ou emprunt court.",
    rating: 4.9,
    location: "Zone Multimédia",
    categories: ["Technologie", "VR"]
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: "Atelier CV & LinkedIn",
    date: "15 Oct",
    time: "14:00",
    type: "Atelier",
    description: "Optimisez votre profil pour vos stages."
  },
  {
    id: 'e2',
    title: "Rencontre Auteur",
    date: "22 Oct",
    time: "17:30",
    type: "Rencontre",
    description: "Discussion avec l'auteur de polar local."
  },
  {
    id: 'e3',
    title: "Démo Imprimante 3D",
    date: "05 Nov",
    time: "12:00",
    type: "Atelier",
    description: "Venez imprimer vos premiers objets."
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alexandre Dupont',
  studentId: '22304591',
  loans: [
    {
      id: 'l1',
      item: MOCK_ITEMS[1], // Inception
      dueDate: '2023-11-15', // Past date
      isOverdue: true
    },
    {
      id: 'l2',
      item: MOCK_ITEMS[2], // Design Pattern
      dueDate: '2023-12-20', // Future date
      isOverdue: false
    }
  ],
  favorites: ['1', '4'],
  reservations: [],
  events: []
};

export const HOURLY_TRAFFIC_DATA = [
  { name: '08:00', value: 20 },
  { name: '09:00', value: 45 },
  { name: '10:00', value: 80 },
  { name: '11:00', value: 60 },
  { name: '12:00', value: 120 },
  { name: '12:30', value: 180 }, // Peak
  { name: '13:00', value: 160 },
  { name: '14:00', value: 140 }, // High afternoon
  { name: '15:00', value: 130 },
  { name: '16:00', value: 110 },
  { name: '17:00', value: 90 },
  { name: '18:00', value: 30 },
];

export const MONTHLY_STATS_DATA = [
  { name: 'Sept', value: 450 },
  { name: 'Oct', value: 680 },
  { name: 'Nov', value: 720 },
  { name: 'Déc', value: 550 },
  { name: 'Jan', value: 480 },
  { name: 'Fév', value: 510 },
];

export const SYSTEM_INSTRUCTION = `You are "BiblioBot", an AI assistant for the IUT Dijon Library.
Your goal is to help students with information about the library.

Key Information from the Library Database:
- **Location**: IUT Dijon.
- **Resources**: 580 DVDs, 715 books bought/year, 27 DVDs bought/year, 42 journal subscriptions.
- **Annual Traffic**: 70,830 entries in 2024.
- **Peak Times**: The library is busiest between 12:30 and 13:30.
- **Busy Afternoons**: Attendance is generally high between 14:00 and 17:00.
- **Busy Months**: October, November, December (avg 550 entries/day, peaks > 700).
- **Services**: Loan books, DVDs, CDs, Comics, VR Headsets. Connection via ENT identifiers (Primo catalog).
- **Events**: CV Workshops, Author Meetings, 3D Printing demos.
- **Tone**: Helpful, friendly, student-oriented, encouraging.

Answer questions concisely. If asked about specific book availability, pretend to check the "real-time database" and give a plausible answer based on the type of book (e.g., "Yes, we have 2 copies of that manual.").
If asked about late fees or returns, remind them they can check their "Mon Compte" tab in this app.
`;
