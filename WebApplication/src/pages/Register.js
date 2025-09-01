import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { register, loading } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setErr(res.error?.message || 'Registration failed');
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Register</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <form onSubmit={onSubmit} style={{ maxWidth: 320, display: 'grid', gap: 8 }}>
        <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} type="submit">{loading ? '...' : 'Create account'}</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
