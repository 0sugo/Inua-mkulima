import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../Context/ContextProvider';
import 'tw-elements';

const SideBar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();


  // // user details
  // const name = localStorage.getItem('token');
  // const parsedItem = JSON.parse(name);

  return (
    <main className='bg-white text-black h-screen md:overflow-hidden relative overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          <nav>
            <div className='overflow-y-auto'>
              <div id='sidenavSecExample'>
                <ul className='relative px-1'>
                  <li className='relative'>
                    <Link to='/' className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap focus:border-l-4 focus:border-l-[#E8B40A] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>
                      <span>DashBoard</span>
                    </Link>
                  </li>
                  <li className='relative'>
                    <Link to='/transactions' className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap focus:border-l-4 focus:border-l-[#E8B40A] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>
                      <span>Transactions</span>
                    </Link>
                  </li>
                  <li className='relative'>
                    <Link to='/reports' className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap focus:border-l-4 focus:border-l-[#E8B40A] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>
                      <span>Reports</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </main>
  );
};

export default SideBar;
