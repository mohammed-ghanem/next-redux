import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    loading: boolean;
    error: string | null;
    data: {
        id: number;
        name: string;
        email: string;
    } | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    data: null,
};

// Async thunk
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return rejectWithValue(err.response?.data || 'Axios error');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
