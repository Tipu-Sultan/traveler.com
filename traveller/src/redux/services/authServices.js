import api from "../../api/api";

const registerUser = async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Registration failed');
  }
};

const login = async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Login failed');

  }
};

const googleLogin = async ({token}, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/google-login', { token });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Google login failed');
  }
};

const verifyEmail = async (token, { rejectWithValue }) => {
  try {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
}

const sendOtp = async ({ email }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Error sending reset link');
  }
}

const resetPassword = async ({ otp, password }, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/reset-password', {otp, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Error sending reset link');
  }
}

const fetchUserData = async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/auth/fetch/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
}

const updateUser = async ({ userId, updatedData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/auth/users/${userId}`, updatedData);
    return response.data; // Return the updated user data
  } catch (error) {
    // Handle errors gracefully
    return rejectWithValue(error.response?.data?.error || 'An error occurred');
  }
}

const updateProfileImage = async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);  // Append the image file
    const response = await api.put('/auth/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
};



const authService = { registerUser, login, verifyEmail, sendOtp,resetPassword, fetchUserData, updateUser, updateProfileImage,googleLogin };
export default authService;
