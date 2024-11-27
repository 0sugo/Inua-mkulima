import { useState, useEffect } from 'react';
import axios from '../../api/api';
import swal from 'sweetalert';

export default function AuthToken() {
  function getToken() {
    const tokenString = window.localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    if (userToken && userToken.expiresAt > new Date().getTime()) {
      axios.defaults.headers.common.Authorization = `Bearer ${userToken.data.authorisation.token}`;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      return userToken?.data.authorisation.token;
    } else {
      window.localStorage.removeItem('token');
      return null;
    }
  }

  const [accessToken, setAccessToken] = useState(getToken());

  const saveToken = (userToken, expirationHours = 3) => {
    const expiresAt = new Date().getTime() + expirationHours * 60 * 60 * 1000;
    const tokenData = { data: userToken.data, expiresAt };

    window.localStorage.setItem('token', JSON.stringify(tokenData));
    setAccessToken(userToken);
  };

  useEffect(() => {
    getToken();

    const checkTokenInterval = setInterval(() => {
      const token = getToken();
      if (!token) {
        clearInterval(checkTokenInterval);
        const handleSessionExpired = async () => {
          await swal('Session has expired!', 'Please log in again.', 'info');
          window.location.href = '/';
          window.location.reload();
        };
        handleSessionExpired();
      }
    }, 1 * 60 * 60 * 1000);

    return () => clearInterval(checkTokenInterval);
  }, []);

  return {
    setAccessToken: saveToken,
    accessToken
  };
}
