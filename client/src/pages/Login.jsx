import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  MdArrowForward,
  MdLockOutline,
  MdEmail,
  MdSecurity,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md';
import logo from '../assets/logo.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [emailSent, setEmailSent] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [portal, setPortal] = useState('pharmacy');

  const demoAccounts = {
    pharmacy: {
      email: 'pharmacy@yonimedicare.com',
      password: 'pharmacy123',
      label: 'Pharmacy Portal',
      description: 'Manage orders and inventory'
    },
    admin: {
      email: 'admin@yonimedicare.com',
      password: 'admin123',
      label: 'Admin Portal',
      description: 'Full system administration'
    },
  };

  const { login, verify2FA } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected from 2FA required
  useEffect(() => {
    if (location.state?.requires2FA) {
      setShow2FA(true);
      setEmailSent(location.state.email);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result?.requires2FA) {
        setShow2FA(true);
        setEmailSent(formData.email);
        setFormData(prev => ({ ...prev, password: '' })); // Clear password field
      } else {
        const redirectPath = location.state?.from?.pathname || (portal === 'admin' ? '/admin' : '/pharmacy');
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Authentication failed. Please check your credentials and try again.';
      setError(errorMessage);

      // Auto-hide error after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verify2FA(formData.code);
      const redirectPath = location.state?.from?.pathname || (portal === 'admin' ? '/admin' : '/pharmacy');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid verification code. Please try again.';
      setError(errorMessage);
      setFormData(prev => ({ ...prev, code: '' })); // Clear the code field on error

      // Auto-hide error after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in"
      >
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-500 p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="YoniMediCare" className="h-10 w-auto" />
              <span className="text-2xl font-black text-white">YoniMediCare</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white leading-tight">
                {show2FA ? 'Two-Factor Verification' : portal === 'admin' ? 'Admin Portal' : 'Pharmacy Portal'}
              </h1>
              <p className="text-emerald-100 text-lg">
                {show2FA
                  ? 'Enter the 6-digit code sent to your email to continue.'
                  : 'Login to manage inventory, orders, and payments.'}
              </p>
            </div>

            <div className="text-emerald-100 text-sm">
              <span>{new Date().getFullYear()} YoniMediCare</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="md:hidden flex items-center justify-center mb-8">
              <img src={logo} alt="YoniMediCare" className="h-10 w-auto" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPortal('pharmacy')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-colors ${portal === 'pharmacy' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'}`}
              >
                Pharmacy
              </button>
              <button
                type="button"
                onClick={() => setPortal('admin')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-colors ${portal === 'admin' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                Admin
              </button>
            </div>

            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <MdSecurity className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{demoAccounts[portal].label}</p>
                    <p className="text-xs text-gray-600">{demoAccounts[portal].description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const demo = demoAccounts[portal];
                    setFormData((prev) => ({ ...prev, email: demo.email, password: demo.password }));
                    setShowPassword(false);
                  }}
                  className="px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Use demo
                </button>
              </div>
              <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Email:</span>
                    <span className="font-mono text-gray-900">{demoAccounts[portal].email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Password:</span>
                    <span className="font-mono text-gray-900">{demoAccounts[portal].password}</span>
                  </div>
                </div>
              </div>
            </div>

            {show2FA ? (
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 mb-4">
                    <MdSecurity className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your identity</h2>
                  <p className="text-gray-600 text-sm">
                    We sent a code to <span className="font-bold">{emailSent}</span>
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handle2FASubmit} className="space-y-6">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                      Verification code
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="6"
                      autoComplete="one-time-code"
                      required
                      value={formData.code}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="• • • • • •"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setShow2FA(false)}
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    ← Back to login
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                  <p className="text-gray-600 text-sm">Access your {portal === 'admin' ? 'admin' : 'pharmacy'} account</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdEmail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdLockOutline className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <MdVisibilityOff className="h-5 w-5" /> : <MdVisibility className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      'Signing in...'
                    ) : (
                      <>
                        Sign in
                        <MdArrowForward className="ml-2" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">New to YoniMediCare?</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Create your account
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
