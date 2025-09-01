import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/hotels/${id}`);
        setHotel(res.data || null);
        const m = await api.get(`/hotels/${id}/menu`);
        setMenu(m.data || []);
      } catch (e) {
        setHotel(null);
        setMenu([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div style={{ padding: 16 }}>
      {loading && <p>Loading...</p>}
      {hotel && <h2>{hotel.name}</h2>}
      <div style={{ display: 'grid', gap: 12 }}>
        {menu.map((item) => (
          <div key={item.id} style={{ border: '1px solid #e9ecef', padding: 12, borderRadius: 8 }}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>Price: ${item.price?.toFixed ? item.price.toFixed(2) : item.price}</p>
            <button onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
