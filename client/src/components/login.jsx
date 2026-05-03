import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const res = await axios.post(`${API_BASE}${endpoint}`, form);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      setSuccess(res.data.message || `${isSignup ? 'Signup' : 'Login'} successful`);
      
      // Delay navigation to show success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Auth error:', err.response?.data || err.message);
      const data = err.response?.data;
      const message = typeof data === 'string' ? data : (data?.message || data?.error || err.message);
      const detail = data?.error && typeof data.error === 'object' ? JSON.stringify(data.error) : (data?.error || '');
      
      setError(detail ? `${message}: ${detail}` : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-morphism animate-fade-in">
        <div className="login-header">
          <div className="login-logo">V</div>
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignup ? 'Join the community and cast your vote' : 'Login to your account to continue'}</p>
        </div>

        {error && <div className="error-message animate-shake">{error}</div>}
        {success && <div className="success-message animate-fade-in">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isSignup && (
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 234 567 890"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary login-submit" disabled={loading}>
            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
              {isSignup ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
