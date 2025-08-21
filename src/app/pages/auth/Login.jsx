'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, Shield, AlertCircle } from 'lucide-react';
import Alert from '../../utils/Alert';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();

  // Check for existing lockout on component mount
  useEffect(() => {
    const storedLockout = localStorage.getItem('loginLockout');
    const storedAttempts = localStorage.getItem('failedAttempts');
    
    if (storedLockout) {
      const lockoutEnd = parseInt(storedLockout);
      if (lockoutEnd > Date.now()) {
        setLockoutTime(lockoutEnd);
        setRemainingTime(Math.ceil((lockoutEnd - Date.now()) / 1000));
      } else {
        localStorage.removeItem('loginLockout');
      }
    }
    
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts));
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    let timer;
    if (lockoutTime && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setLockoutTime(null);
            localStorage.removeItem('loginLockout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime, remainingTime]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if account is locked out
    if (lockoutTime && lockoutTime > Date.now()) {
      setAlert({
        type: 'error',
        message: `Account temporarily locked. Please try again in ${remainingTime} seconds.`
      });
      return;
    }
    
    setIsLoading(true);
    setAlert(null);

    try {
      // Add client-side delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      
      const response = await fetch('https://metronique.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // For HTTP-only cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Reset failed attempts on successful login
        setFailedAttempts(0);
        localStorage.removeItem('failedAttempts');
        localStorage.removeItem('loginLockout');
        
        setAlert({
          type: 'success',
          message: 'Login successful! Redirecting...'
        });
        
        // Store token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
          // Also store token expiration if provided
          if (data.expiresIn) {
            const expiresAt = Date.now() + data.expiresIn * 1000;
            localStorage.setItem('tokenExpiry', expiresAt.toString());
          }
        }
        
        setTimeout(() => {
          router.push('/app');
        }, 2000);
      } else {
        // Handle failed login attempts
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        localStorage.setItem('failedAttempts', newAttempts.toString());
        
        // Implement lockout after 5 failed attempts
        if (newAttempts >= 5) {
          const lockoutDuration = 5 * 60 * 1000; // 5 minutes lockout
          const lockoutEnd = Date.now() + lockoutDuration;
          setLockoutTime(lockoutEnd);
          setRemainingTime(Math.ceil(lockoutDuration / 1000));
          localStorage.setItem('loginLockout', lockoutEnd.toString());
          
          setAlert({
            type: 'error',
            message: `Too many failed attempts. Account locked for 5 minutes.`
          });
        } else {
          setAlert({
            type: 'error',
            message: data.message || `Login failed. ${5 - newAttempts} attempts remaining.`
          });
        }
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-sky-900 mb-2"
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert 
              type={alert.type} 
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}

        {lockoutTime && lockoutTime > Date.now() && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="text-red-500 mr-3 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Account Temporarily Locked</p>
              <p className="text-red-600 text-sm">Please try again in {formatTime(remainingTime)}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={lockoutTime && lockoutTime > Date.now()}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={lockoutTime && lockoutTime > Date.now()}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={lockoutTime && lockoutTime > Date.now()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={!(lockoutTime && lockoutTime > Date.now()) ? { scale: 1.02 } : {}}
            whileTap={!(lockoutTime && lockoutTime > Date.now()) ? { scale: 0.98 } : {}}
            type="submit"
            disabled={isLoading || (lockoutTime && lockoutTime > Date.now())}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <Shield className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 font-medium">Security Notice</p>
              <p className="text-blue-600 text-sm">
                {failedAttempts > 0 
                  ? `You have ${5 - failedAttempts} login attempts remaining.`
                  : 'Your account will be temporarily locked after 5 failed attempts.'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              Create Account
            </button>
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-sky-600 hover:text-sky-700 text-sm mt-2"
          >
            Forgot your password?
          </button>
        </div>
      </motion.div>
    </div>
  );
}