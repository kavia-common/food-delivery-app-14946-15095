import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get('/hotels');
        setHotels(res.data || []);
      } catch (e) {
        setHotels([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Nearby Hotels</h2>
      {loading && <p>Loading...</p>}
      <div style={{ display: 'grid', gap: 12 }}>
        {hotels.map((h) => (
          <div key={h.id} style={{ border: '1px solid #e9ecef', padding: 12, borderRadius: 8 }}>
            <h3>{h.name}</h3>
            <p>{h.description}</p>
            <p>Rating: {h.rating || 'N/A'}</p>
            <Link to={`/hotels/${h.id}`}>View Menu</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
