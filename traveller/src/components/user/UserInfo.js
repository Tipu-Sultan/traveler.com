import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaGenderless, FaCheckCircle, FaUser, FaCamera, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { updateProfileImage } from '../../redux/slices/authSlices';
import useAuthData from '../../hooks/useAuthData';

const UserInfo = ({ userData, openEditModal }) => {
    const { message,loading } = useAuthData()
    const [imagePreview, setImagePreview] = useState(userData.profileImage || '/path/to/default-profile.png');
    const [isImageChanged, setIsImageChanged] = useState(false);
    const dispatch = useDispatch();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setIsImageChanged(true);
            };
            reader.readAsDataURL(file);

            // Dispatch the action to update the profile image on the server
            dispatch(updateProfileImage(file));
        }
    };

    // const handleCancelImageChange = () => {
    //     setImagePreview(userData.profileImage || '/path/to/default-profile.png');
    //     setIsImageChanged(false);
    // };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    {/* Profile Image Section */}
                    <div className="relative group">
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border border-gray-300"
                        />
                        {/* Overlay for camera icon */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <FaCamera className="text-white text-xl" />
                        </div>
                        {/* Hidden file input */}
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    {/* User Name */}
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                        <FaUser className="text-blue-500" />
                        <span>{userData.name}</span>
                    </h2>

                </div>
                <button
                    onClick={openEditModal}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-sky-500 text-white rounded hover:bg-gradient-to-l transition duration-300"
                >
                    Edit Profile
                </button>
            </div>

            <p className='text-green-500'>{loading==='editImage'?'Please wait...':message && message}</p>

            {/* User Information */}
            <p className="flex items-center text-gray-600 mb-4">
                <FaEnvelope className="mr-2 text-blue-500" />
                {userData.email}
            </p>
            <p className="flex items-center text-gray-600 mb-4">
                <FaPhone className="mr-2 text-blue-500" />
                {userData.contact || 'Not provided'}
            </p>
            <p className="flex items-center text-gray-600 mb-4">
                <FaGenderless className="mr-2 text-blue-500" />
                {userData.gender || 'Not specified'}
            </p>
            <p className="flex items-center text-gray-600 mb-4">
                <FaCheckCircle className={`mr-2 ${userData.isVerified ? 'text-green-500' : 'text-gray-500'}`} />
                {userData.isVerified ? 'Verified Account' : 'Unverified Account'}
            </p>
        </>
    );
};

export default UserInfo;
