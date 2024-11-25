import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/authSlices';

const UserEditModal = ({ show, onClose, user, loading }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(user.name);
    const [contact, setContact] = useState(user.contact || '');
    const [gender, setGender] = useState(user.gender || 'Male');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setContact(user.contact || '');
            setGender(user.gender || 'Male');
        }
    }, [user]);

    const handleUpdate = () => {
        const updatedUserData = {
            name,
            contact,
            gender,
        };
        dispatch(updateUser({ userId: user._id, updatedData: updatedUserData }));
        onClose()
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h2 className="text-xl font-semibold">Edit Profile</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>
                        <div>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 mr-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-md focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-sky-500 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300"
                            >
                                {loading === 'editUser' ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                        <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserEditModal;
