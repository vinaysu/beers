import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers');
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search beers..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="beer-container">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <div className="beer-info">
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
