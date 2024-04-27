import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {RootState} from "@/store";

interface AuthState {
    sessionId: string | null;
    isLoading: boolean;
    error: string | undefined | null;
}

const initialState: AuthState = {
    sessionId: localStorage.getItem('sessionId') || null,
    isLoading: false,
    error: null,
};

export const createToken = createAsyncThunk("auth/createToken", async () => {
    try {
        const currentURL = window.location.href;
        //Request Token Oluşturma
        const requestTokenResponse = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
            params: {
                api_key: "65fab0811fedb36f607d9dc186472015",
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
            //Session Oluşturma
            const sessionResponse = await axios.post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=65fab0811fedb36f607d9dc186472015`,
                {request_token: token}
            );
            console.log("sessionResponse", sessionResponse);
            const sessionId = sessionResponse.data.session_id;
            localStorage.setItem('sessionId', sessionId);

            console.log("Giriş başarılı!");
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

            // Oturumu sonlandırma
            await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=65fab0811fedb36f607d9dc186472015`, {
                data: {
                    session_id: sessionId,
                },
            });

            // Session Token'ı temizleme
            localStorage.removeItem('sessionId');
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
            .addCase(createToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createToken.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createToken.rejected, (state, action) => {
                state.isLoading = false;
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