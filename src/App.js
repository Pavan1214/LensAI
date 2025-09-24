import './CssFiles/App.css';
import React, { useState } from 'react';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import { useDebounce } from './hooks/useDebounce';
import Footer from './components/Footer';
import HeadingBanner from './components/HeadingBanner';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  return (
    <div className="App">
      <Navbar 
        searchTerm={searchTerm} 
        onSearchChange={(e) => setSearchTerm(e.target.value)} 
      />
        <HeadingBanner />
      <Cards searchTerm={debouncedSearchTerm} />
      <Footer />
    </div>
  );
}

export default App;