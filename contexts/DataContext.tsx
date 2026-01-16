
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ITEMS, MOCK_USER, MOCK_EVENTS } from '../constants';
import { LibraryItem, User, CalendarEvent, Reservation } from '../types';

interface DataContextType {
  items: LibraryItem[];
  user: User;
  events: CalendarEvent[];
  toggleFavorite: (itemId: string) => void;
  reserveItem: (itemId: string) => void;
  registerEvent: (eventId: string) => void;
  cancelReservation: (reservationId: string) => void;
  addReview: (itemId: string, comment: string, rating: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<LibraryItem[]>(MOCK_ITEMS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);

  // Toggle Favorite
  const toggleFavorite = (itemId: string) => {
    setUser(prev => {
      const isFav = prev.favorites.includes(itemId);
      return {
        ...prev,
        favorites: isFav 
          ? prev.favorites.filter(id => id !== itemId)
          : [...prev.favorites, itemId]
      };
    });
  };

  // Reserve Item
  const reserveItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Check if already reserved
    const existing = user.reservations.find(r => r.item.id === itemId);
    if (existing) {
        alert("Vous avez déjà réservé cet ouvrage.");
        return;
    }

    const newReservation: Reservation = {
      id: Date.now().toString(),
      item: item,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    setUser(prev => ({
      ...prev,
      reservations: [...prev.reservations, newReservation]
    }));
    
    alert(`Réservation confirmée pour "${item.title}".`);
  };

  // Cancel Reservation
  const cancelReservation = (reservationId: string) => {
    setUser(prev => ({
      ...prev,
      reservations: prev.reservations.filter(r => r.id !== reservationId)
    }));
  };

  // Register for Event
  const registerEvent = (eventId: string) => {
    if (user.events.includes(eventId)) {
        alert("Vous êtes déjà inscrit à cet événement.");
        return;
    }
    setUser(prev => ({
      ...prev,
      events: [...prev.events, eventId]
    }));
    alert("Inscription confirmée !");
  };

  // Add Review
  const addReview = (itemId: string, comment: string, rating: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newReview = {
          id: Date.now().toString(),
          user: user.name,
          comment,
          rating,
          date: new Date().toISOString().split('T')[0]
        };
        return {
          ...item,
          reviews: [newReview, ...(item.reviews || [])]
        };
      }
      return item;
    }));
  };

  return (
    <DataContext.Provider value={{ 
      items, 
      user, 
      events, 
      toggleFavorite, 
      reserveItem, 
      registerEvent,
      cancelReservation,
      addReview
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
