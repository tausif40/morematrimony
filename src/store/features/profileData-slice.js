import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';

export const uploadFileData = createAsyncThunk('data/uploadFileData', async (formdata, { rejectWithValue }) => {
  const loadingToast = toast.loading('Updating.....');
  try {
    console.log(formdata);
    const response = await apiClient.patch('/user/myProfile', formdata);
    toast.success('Update successful!', { id: loadingToast });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message || 'Upload failed', { id: loadingToast });
    return rejectWithValue(error?.response?.data?.message || 'Failed to upload formData');
  }
});

export const fetchCountries = createAsyncThunk('data/fetchCountries', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/country`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch countries');
  }
});

export const fetchCountriesWithDoesNotMatter = createAsyncThunk('data/countriesWithDoesNotMatter', async (doesNotMatter, { rejectWithValue }) => {
  try {
    // console.log(`/country?doesNotMatter=${doesNotMatter}`);
    const response = await apiClient.get(`/country?doesNotMatter=${doesNotMatter}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch countries');
  }
});

// export const fetchStates = createAsyncThunk('data/fetchStates', async (countryId, { rejectWithValue }) => {
//   try {
//     const response = await apiClient.get(`/state?countryId=${countryId}`);
//     // console.log(response);
//     return response.data;
//   } catch (error) {
//     // console.log(error);
//     return rejectWithValue(error.response?.data || 'Failed to fetch states');
//   }
// });

// export const fetchCities = createAsyncThunk('data/fetchCities', async (stateId, { rejectWithValue }) => {
//   try {
//     const response = await apiClient.get(`/city?stateId=${stateId}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to fetch cities');
//   }
// });

export const fetchOccupations = createAsyncThunk('data/fetchOccupations', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/occupation');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch occupations');
  }
});

export const fetchLanguages = createAsyncThunk('data/fetchLanguages', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/language');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch languages');
  }
});
export const fetchHobbies = createAsyncThunk('data/fetchHobbies', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/hobby');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch hobby');
  }
});
export const fetchEducation = createAsyncThunk('data/fetchEducation', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/education');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch education');
  }
});
export const fetchReligions = createAsyncThunk('data/fetchReligions', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/religion');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch religion');
  }
});

// export const fetchCaste = createAsyncThunk('data/fetchCaste', async (religionId, { rejectWithValue }) => {
//   try {
//     const response = await apiClient.get(`/caste?religionId=${religionId}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to fetch religion');
//   }
// });

export const fetchDivision = createAsyncThunk('data/fetchDivision', async ({ rejectWithValue }) => {
  try {
    const response = await apiClient.get('/division');
    console.log('division slice - ', response.data);
    return response.data;
  } catch (error) {
    // console.log('division - ', error);
    return rejectWithValue(error.response?.data || 'Failed to fetch division');
  }
});
export const fetchStars = createAsyncThunk('data/fetchStars', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/star`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch star');
  }
});

// export const fetchRashiSigns = createAsyncThunk('data/fetchRashiSigns', async (starId, { rejectWithValue }) => {
//   try {
//     const response = await apiClient.get(`/rashiSign?starId=${starId}`);
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'Failed to fetch rashiSign');
//   }
// });

export const fetchZodiac = createAsyncThunk('data/fetchZodiac', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`zodiac`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch zodiac');
  }
});


const profileData = createSlice({
  name: 'data',
  initialState: {
    formData: { data: null, loading: false, error: null },
    countries: { data: [], loading: false, error: null },
    countriesWithDoesNotMatter: { data: [], loading: false, error: null },
    // states: { data: [], loading: false, error: null },
    // cities: { data: [], loading: false, error: null },
    occupations: { data: [], loading: false, error: null },
    languages: { data: [], loading: false, error: null },
    hobbies: { data: [], loading: false, error: null },
    education: { data: [], loading: false, error: null },
    religions: { data: [], loading: false, error: null },
    // caste: { data: [], loading: false, error: null },
    divisions: { data: [], loading: false, error: null },
    stars: { data: [], loading: false, error: null },
    // rashiSigns: { data: [], loading: false, error: null },
    zodiac: { data: [], loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload Profile
      .addCase(uploadFileData.pending, (state) => {
        state.formData.loading = true
        state.formData.error = true
      })
      .addCase(uploadFileData.fulfilled, (state, action) => {
        state.formData.data = action.payload;
        state.formData.loading = false;
      })
      .addCase(uploadFileData.rejected, (state, action) => {
        state.formData.loading = false;
        state.formData.error = action.payload || action.error.message;
      })

      // .addCase(uploadFileData.pending, (state) => {
      //   state.formData = { loading: true, error: null };
      // })
      // .addCase(uploadFileData.fulfilled, (state, action) => {
      //   state.formData = { data: action.payload, loading: false, error: null };
      //   console.log(action.payload);
      // })
      // .addCase(uploadFileData.rejected, (state, action) => {
      //   state.formData = { loading: false, error: action.payload || action.error.message };
      //   console.log(action.payload);
      // })

      // Fetch Countries
      .addCase(fetchCountries.pending, (state) => {
        state.countries.loading = true;
        state.countries.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries.data = action.payload;
        state.countries.loading = false;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries.loading = false;
        state.countries.error = action.payload || action.error.message;
      })
      // Fetch fetchCountriesWithDoesNotMatter
      .addCase(fetchCountriesWithDoesNotMatter.pending, (state) => {
        state.countriesWithDoesNotMatter.loading = true;
        state.countriesWithDoesNotMatter.error = null;
      })
      .addCase(fetchCountriesWithDoesNotMatter.fulfilled, (state, action) => {
        state.countriesWithDoesNotMatter.data = action.payload;
        state.countriesWithDoesNotMatter.loading = false;
      })
      .addCase(fetchCountriesWithDoesNotMatter.rejected, (state, action) => {
        state.countriesWithDoesNotMatter.loading = false;
        state.countriesWithDoesNotMatter.error = action.payload || action.error.message;
      })

      // Fetch States
      // .addCase(fetchStates.pending, (state, action) => {
      //   state.states.data = action.payload;
      //   state.states.loading = true;
      //   state.states.error = null;
      // })
      // .addCase(fetchStates.fulfilled, (state, action) => {
      //   state.states.data = action.payload;
      //   state.states.loading = false;
      // })
      // .addCase(fetchStates.rejected, (state, action) => {
      //   state.states.loading = false;
      //   state.states.error = action.payload || action.error.message;
      // })

      // Fetch Cities
      // .addCase(fetchCities.pending, (state, action) => {
      //   state.cities.data = action.payload;
      //   state.cities.loading = true;
      //   state.cities.error = null;
      // })
      // .addCase(fetchCities.fulfilled, (state, action) => {
      //   state.cities.data = action.payload;
      //   state.cities.loading = false;
      // })
      // .addCase(fetchCities.rejected, (state, action) => {
      //   state.cities.loading = false;
      //   state.cities.error = action.payload || action.error.message;
      // })

      // Fetch Occupations
      .addCase(fetchOccupations.pending, (state) => {
        state.occupations.loading = true;
        state.occupations.error = null;
      })
      .addCase(fetchOccupations.fulfilled, (state, action) => {
        state.occupations.data = action.payload;
        state.occupations.loading = false;
      })
      .addCase(fetchOccupations.rejected, (state, action) => {
        state.occupations.loading = false;
        state.occupations.error = action.payload || action.error.message;
      })

      // Fetch Languages
      .addCase(fetchLanguages.pending, (state) => {
        state.languages.loading = true;
        state.languages.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languages.data = action.payload;
        state.languages.loading = false;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.languages.loading = false;
        state.languages.error = action.payload || action.error.message;
      })

      // Fetch hobbies
      .addCase(fetchHobbies.pending, (state) => {
        state.hobbies.loading = true;
        state.hobbies.error = null;
      })
      .addCase(fetchHobbies.fulfilled, (state, action) => {
        state.hobbies.data = action.payload;
        state.hobbies.loading = false;
      })
      .addCase(fetchHobbies.rejected, (state, action) => {
        state.hobbies.loading = false;
        state.hobbies.error = action.payload || action.error.message;
      })

      // Fetch Education
      .addCase(fetchEducation.pending, (state) => {
        state.education.loading = true;
        state.education.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.education.data = action.payload;
        state.education.loading = false;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.education.loading = false;
        state.education.error = action.payload || action.error.message;
      })

      // Fetch Religions
      .addCase(fetchReligions.pending, (state) => {
        state.religions.loading = true;
        state.religions.error = null;
      })
      .addCase(fetchReligions.fulfilled, (state, action) => {
        state.religions.data = action.payload;
        state.religions.loading = false;
      })
      .addCase(fetchReligions.rejected, (state, action) => {
        state.religions.loading = false;
        state.religions.error = action.payload || action.error.message;
      })

      // Fetch Caste
      // .addCase(fetchCaste.pending, (state, action) => {
      //   state.caste.data = action.payload;
      //   state.caste.loading = true;
      //   state.caste.error = null;
      // })
      // .addCase(fetchCaste.fulfilled, (state, action) => {
      //   state.caste.data = action.payload;
      //   state.caste.loading = false;
      // })
      // .addCase(fetchCaste.rejected, (state, action) => {
      //   state.caste.loading = false;
      //   state.caste.error = action.payload || action.error.message;
      // })

      // Fetch division
      .addCase(fetchDivision.pending, (state, action) => {
        state.divisions.data = action.payload;
        state.divisions.loading = true;
        state.divisions.error = null;
      })
      .addCase(fetchDivision.fulfilled, (state, action) => {
        state.divisions.data = action.payload;
        state.divisions.loading = false;
      })
      .addCase(fetchDivision.rejected, (state, action) => {
        state.divisions.loading = false;
        state.divisions.error = action.payload || action.error.message;
      })

      // Fetch Stars
      .addCase(fetchStars.pending, (state) => {
        state.stars.loading = true;
        state.stars.error = null;
      })
      .addCase(fetchStars.fulfilled, (state, action) => {
        state.stars.data = action.payload;
        state.stars.loading = false;
      })
      .addCase(fetchStars.rejected, (state, action) => {
        state.stars.loading = false;
        state.stars.error = action.payload || action.error.message;
      })

      // Fetch Rashi Signs
      // .addCase(fetchRashiSigns.pending, (state, action) => {
      //   state.rashiSigns.data = action.payload;
      //   state.rashiSigns.loading = true;
      //   state.rashiSigns.error = null;
      // })
      // .addCase(fetchRashiSigns.fulfilled, (state, action) => {
      //   state.rashiSigns.data = action.payload;
      //   state.rashiSigns.loading = false;
      // })
      // .addCase(fetchRashiSigns.rejected, (state, action) => {
      //   state.rashiSigns.loading = false;
      //   state.rashiSigns.error = action.payload || action.error.message;
      // })

      // Fetch Stars
      .addCase(fetchZodiac.pending, (state) => {
        state.zodiac.loading = true;
        state.zodiac.error = null;
      })
      .addCase(fetchZodiac.fulfilled, (state, action) => {
        state.zodiac.data = action.payload;
        state.zodiac.loading = false;
      })
      .addCase(fetchZodiac.rejected, (state, action) => {
        state.zodiac.loading = false;
        state.zodiac.error = action.payload || action.error.message;
      });
  },
});



export default profileData.reducer;
