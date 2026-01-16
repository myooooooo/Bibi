
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import Settings from './pages/Settings';
import ChatBot from './components/ChatBot';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          <ChatBot />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
