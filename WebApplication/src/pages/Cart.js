import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, total } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty.</p>}
      {items.map((it) => (
        <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0' }}>
          <div>{it.name} x {it.qty}</div>
          <div>${(it.price * it.qty).toFixed(2)}</div>
          <button onClick={() => removeItem(it.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button disabled={items.length === 0} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      <div style={{ marginTop: 12 }}>
        <Link to="/">Continue Browsing</Link>
      </div>
    </div>
  );
}
