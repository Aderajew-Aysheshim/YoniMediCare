import React, { useState } from 'react';
import api from '../utils/api';

const TwoFactorAuth = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/2fa/verify', { code });
      if (response.data.success) {
        onSuccess();
      } else {
        setError('Invalid authentication code');
      }
    } catch (err) {
      setError('Verification failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Two-Factor Authentication</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter authentication code"
        className="w-full p-2 border rounded mb-4"
        required
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  );
};

export default TwoFactorAuth;
