import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../Context/ContextProvider';
import { MdLogout } from "react-icons/md";
import swal from 'sweetalert';

const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const signOut = () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      buttons: ["Cancel", "Yes, Log out"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        window.localStorage.removeItem('token');
        window.location.reload();
      }
    });
  };

  return (
    <main className='topnav'>
      <div className='flex justify-between items-center p-4 shadow-md text-white'>
        <div className='text-xl p-2 hover:cursor-pointer flex items-center space-x-4'>
          <button className='text-white' onClick={handleActiveMenu}><AiOutlineMenu /></button>
          <h3><b>Inua Mkulima Subsidy Program</b></h3>
        </div>
        <div className='flex items-center space-x-5'>
          <h5><b>Logged In As: KIMATHI</b></h5>
          <button onClick={signOut} className='border border-white rounded-md px-4 py-1 flex items-center gap-1'>
            <span><MdLogout /></span>Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
