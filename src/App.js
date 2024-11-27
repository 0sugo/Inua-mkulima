import React from 'react';
import Layout from './pages/Layout';
import Login from './pages/Login';
import useToken from './components/Context/AuthToken';
import { Toaster } from 'sonner';

const App = () => {
  const { accessToken, setAccessToken } = useToken();

  if (!accessToken) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Login setAccessToken={setAccessToken} />
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" richColors />
      <Layout />
    </div>
  );
};

export default App;
