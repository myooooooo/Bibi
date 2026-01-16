
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
  location?: string; // e.g., "Étage 1, Allée B"
  rating?: number;
  reviews?: Review[];
  categories?: string[];
}

export interface Loan {
  id: string;
  item: LibraryItem;
  dueDate: string; // ISO Date string
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
  favorites: string[]; // List of Item IDs
  reservations: Reservation[];
  events: string[]; // List of Event IDs
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Atelier' | 'Rencontre' | 'Exposition';
  description: string;
}
