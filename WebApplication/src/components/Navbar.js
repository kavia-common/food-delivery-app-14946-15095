import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #e9ecef' }}>
      <Link to="/">Home</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/cart">Cart</Link>
      {user ? (
        <>
          <span>Hi, {user.name || user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
