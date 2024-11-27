import React, { useState } from 'react';

const LogoutModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        console.log('Logging out...');
        setShowModal(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Log Out?</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                                onClick={handleLogout}
                            >
                                Yes, log out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutModal;