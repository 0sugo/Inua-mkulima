import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Transactions from './Transactions';
import Reports from './Reports';
import Missing from './Missing';
import Unauthorised from './Unauthorised';
import Summary from './Summary';
import LogoutModal from './Logout';
import { Toaster } from 'sonner';
import Login from './Login';
import Sidebar from '../components/Nav/SideBar';
import Topnav from '../components/Nav/TopBar';
import { useStateContext } from '../components/Context/ContextProvider';
import useToken from '../components/Context/AuthToken';

const Layout = () => {
    const { activeMenu } = useStateContext();
    const { accessToken } = useToken();

    return (
        <main className="min-h-screen flex flex-col">
            {!accessToken && (
                <div className="w-full">
                    <Topnav />
                </div>
            )}

            <div className="flex flex-row">
                {!accessToken && activeMenu && (
                    <div className="w-72">
                        <Sidebar />
                    </div>
                )}

                <div className={`flex-1 ${accessToken && activeMenu ? 'md:ml-4' : 'ml-0'} min-h-screen`}>
                    <Toaster position="top-center" richColors />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/logout" element={<LogoutModal />} />
                        <Route path="/unauthorised" element={<Unauthorised />} />
                        <Route path="/summary" element={<Summary />} />
                        <Route path="*" element={<Missing />} />
                    </Routes>
                </div>
            </div>
        </main>
    );
};

export default Layout;
