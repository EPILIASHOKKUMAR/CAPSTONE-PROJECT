import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const token = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        navigate('/login-user?error=' + error);
        return;
      }

      if (token && refreshToken) {
        try {
          // Set tokens in cookies
          const cookieOptions = {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
          };

          Cookies.set('accessToken', token, cookieOptions);
          Cookies.set('refreshToken', refreshToken, cookieOptions);

          // Set token in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Fetch user profile
          const response = await api.get('/auth/profile');
          const user = response.data.data.user;

          // Save user to cookies
          Cookies.set('user', JSON.stringify(user), cookieOptions);

          // Redirect to dashboard
          navigate('/dashboard');
        } catch (error) {
          console.error('Google auth error:', error);
          navigate('/login-user?error=auth_failed');
        }
      } else {
        navigate('/login-user');
      }
    };

    handleGoogleAuth();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing Google Sign-In...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
