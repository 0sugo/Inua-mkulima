

import React, { useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import greenLeaves from '../components/images/green-leaves-white-background@2x.png';
import bg from '../components/images/bg.png';
import { Eye, EyeOff } from 'lucide-react';
import { FaAngleRight } from "react-icons/fa6";
import logo from '../components/images/logo.svg';

const Login = ({ setAccessToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ username: '', password: '' });

    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required.' }));
      setLoading(false);
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required.' }));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/auth/login', { username, password }, { headers: { 'Content-Type': 'application/json' } });
      setAccessToken(response.data.token);
      toast.success('Login Successful.');
      navigate('/');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection.');
        console.log('Network error! Check your connection.');
      } else if (error.response.status === 400) {
        console.log('Server returned a 400:', error.response.data);
        toast.error(error.response.data);
        console.log('An error occurred:', error);
        toast.error('An error occurred while logging in');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prevState) => !prevState);

  const handleContinue = () => {
    if (username.trim() !== '') {
      setShowPasswordField(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:w-full  bg-white overflow-hidden poppins">
      <div className="w-full md:w-1/2 h-[300px] md:h-screen relative ">
        <div className="w-full md:max-h-full md:h-auto relative">
          <img 
            src={bg} 
            alt="bg" 
            className="w-full h-full object-cover md:object-contain" 
          />
          <img 
            src={logo} 
            alt="logo" 
            className="absolute w-16 md:w-24 h-16 md:h-24 left-4 md:left-14 top-4 md:top-12" 
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8 md:py-0">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md relative">
          <img 
            src={greenLeaves} 
            alt="green leaves" 
            className=" hidden md:block w-40 md:w-44 absolute top-0 right-0" 
          />

          <h2 className="text-xl md:text-2xl font-bold my-4 text-[#009438] font-poppins">
            <span className="text-[#707070] uppercase block text-sm md:text-base">Welcome to</span>
            <p className="font-bold text-2xl md:text-4xl">
              <span className="block">Inua Mkulima -</span>
              Subsidy Program
            </p>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 my-8">
            {!showPasswordField && (
              <div>
                <h6 className="text-[#707070] font-medium text-sm md:text-base">Enter your username to continue</h6>
                <div className="my-4">
                  <label htmlFor="username" className="block mb-2 font-poppins text-[#707070] text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full px-4 py-2 border-b border-b-black font-poppins text-sm md:text-base"
                  />
                  {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>
              </div>
            )}

            {showPasswordField && (
              <div>
                <h6 className="text-[#707070] font-medium text-sm md:text-base">Enter your password</h6>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block mb-2 font-poppins text-[#707070] text-sm">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border-b border-b-black font-poppins text-sm md:text-base"
                  />
                  <button
                    type="button"
                    className="absolute top-12 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>
              </div>
            )}

            {!showPasswordField ? (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#E8B40A] flex items-center justify-center hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-poppins text-sm md:text-base"
              >
                Continue <span className="ml-4 md:ml-10"><FaAngleRight /></span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#E8B40A] flex items-center justify-center hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-poppins text-sm md:text-base"
                disabled={loading}
              >
                {loading ? 'Please wait' : 'Login'} <span className="ml-4 md:ml-10"><FaAngleRight /></span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;