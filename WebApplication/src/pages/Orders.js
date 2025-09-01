import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { useWebSocket } from '../services/websocket';

export default function Orders() {
  const { orderId } = useParams();
  const [orders, setOrders] = useState([]);
  const { messages, connected } = useWebSocket();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/orders');
        setOrders(res.data || []);
      } catch (e) {
        setOrders([]);
      }
    }
    load();
  }, [orderId]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Your Orders</h2>
      <p>Realtime: {connected ? 'Connected' : 'Disconnected'}</p>
      {messages.slice(0, 5).map((m, idx) => (
        <pre key={idx} style={{ background: '#f5f5f5', padding: 8, borderRadius: 6, overflowX: 'auto' }}>
{typeof m === 'string' ? m : JSON.stringify(m, null, 2)}
        </pre>
      ))}

      <div style={{ display: 'grid', gap: 12 }}>
        {orders.map((o) => (
          <div key={o.id} style={{ border: '1px solid #e9ecef', padding: 12, borderRadius: 8 }}>
            <div><strong>Order #{o.id}</strong></div>
            <div>Status: {o.status}</div>
            <div>Total: ${o.total?.toFixed ? o.total.toFixed(2) : o.total}</div>
            <Link to={`/orders/${o.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
