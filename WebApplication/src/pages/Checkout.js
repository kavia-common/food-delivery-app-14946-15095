import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { items, total, clear } = useContext(CartContext);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function placeOrder() {
    setPlacing(true);
    setError('');
    try {
      const payload = {
        items: items.map((it) => ({ id: it.id, qty: it.qty })),
        total
      };
      const res = await api.post('/orders', payload);
      clear();
      navigate(`/orders/${res.data?.id || 'recent'}`);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Checkout</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Items: {items.length}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button disabled={placing || items.length === 0} onClick={placeOrder}>
        {placing ? 'Placing...' : 'Place Order'}
      </button>
    </div>
  );
}
