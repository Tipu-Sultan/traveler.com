import api from "../../api/api";

const search = async ({query,page}, { rejectWithValue },limit = 9) => {
  try {
    const response = await api.get(`/places/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Seraching failed');

  }
};

const fetchSuggestions = async (input, { rejectWithValue }) => {
  try {
    const response = await api.get(`/places/suggestions?query=${input}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Seraching faild failed');

  }
};


const searchServices = { search,fetchSuggestions };
export default searchServices;
