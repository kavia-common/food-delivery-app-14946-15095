import { useEffect, useRef, useState } from 'react';

/**
 * useWebSocket - connect to WebSocket endpoint and receive messages
 * URL is read from REACT_APP_WS_URL; token is appended as query param if present.
 */
export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const base = process.env.REACT_APP_WS_URL || '';
    const token = localStorage.getItem('auth_token');
    const url = token ? `${base}?token=${encodeURIComponent(token)}` : base;

    if (!base) {
      // eslint-disable-next-line no-console
      console.warn('WebSocket URL not configured (REACT_APP_WS_URL). Skipping WS connection.');
      return undefined;
    }

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        setMessages((prev) => [data, ...prev].slice(0, 100));
      } catch (e) {
        setMessages((prev) => [evt.data, ...prev].slice(0, 100));
      }
    };
    ws.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('WebSocket error');
    };
    ws.onclose = () => setConnected(false);

    return () => {
      ws.close();
    };
  }, []);

  return { messages, connected, send: (payload) => wsRef.current?.send(JSON.stringify(payload)) };
}
