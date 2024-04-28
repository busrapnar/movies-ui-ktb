import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "@/store";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface AuthState {
    sessionId: string | null;
    isLoading: boolean;
    isRedirecting: boolean;
    error: string | undefined | null;
}

const initialState: AuthState = {
    sessionId: localStorage.getItem('sessionId') || null,
    isRedirecting: false,
    isLoading: false,
    error: null,
};

export const createToken = createAsyncThunk("auth/createToken", async () => {
    try {
        const currentURL = window.location.href;
        const requestTokenResponse = await axios.get(`${API_URL}/authentication/token/new`, {
            params: {
                api_key: API_KEY,
            },
        });
        const requestToken = requestTokenResponse.data.request_token;
        const authenticationURL = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${currentURL}`;
        localStorage.setItem("token", requestToken)
        window.location.href = authenticationURL;
    } catch (error) {
        console.error('Token oluşturma işlemi başarısız oldu:', error);
        throw new Error('Token alma işlemi başarısız oldu.');
    }
});

export const login = createAsyncThunk(
    "auth/login",
    async () => {
        try {
            const token: string = localStorage.getItem("token") || "";
            const sessionResponse = await axios.post(
                `${API_URL}/authentication/session/new?api_key=${API_KEY}`,
                { request_token: token }
            );
            const sessionId = sessionResponse.data.session_id;
            localStorage.setItem('sessionId', sessionId);
            return sessionId;
        } catch (error) {
            console.error('Giriş işlemi başarısız oldu:', error);
            throw new Error('Oturum açma işlemi başarısız oldu.');
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const sessionId = localStorage.getItem('sessionId');
            if (!sessionId) {
                throw new Error('Oturum bilgisi bulunamadı.');
            }

            await axios.delete(`${API_URL}/authentication/session?api_key=${API_KEY}`, {
                data: {
                    session_id: sessionId,
                },
            });

            localStorage.removeItem('sessionId');
            localStorage.removeItem('token');
        } catch (error) {
            throw new Error('Oturum kapatma işlemi başarısız oldu.');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createToken.fulfilled, (state) => {
                state.isLoading = false;
                state.isRedirecting = true;
            })
            .addCase(createToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isRedirecting = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sessionId = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.sessionId = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const authDataStore = (state: RootState) => state.auth;
export default authSlice.reducer;