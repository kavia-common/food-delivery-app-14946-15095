import React, { createContext, useCallback, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
  total: 0
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(() => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0), [items]);

  const value = useMemo(() => ({ items, addItem, removeItem, clear, total }), [items, addItem, removeItem, clear, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
