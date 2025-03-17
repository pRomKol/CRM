import axios from 'axios';
import {LoginField} from "../types/fields.ts";


let accessToken: string | null = localStorage.getItem('accessToken');

const authApiClient = axios.create({
    baseURL: 'https://easydev.club/api/v1',
});

authApiClient.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

function redirectToLogin() {
    accessToken = null;
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}

export async function signIn(authData: LoginField): Promise<AuthResponse> {
    const response = await authApiClient.post<AuthResponse>('/auth/signin', authData);
    accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
}

export async function signUp(authData: any): Promise<AuthResponse> {
    const response = await authApiClient.post<AuthResponse>('/auth/signup', authData);
    accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
}

export async function refreshAccessToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await authApiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
        accessToken = response.data.accessToken;
        localStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error: any) {
        if (error && error.response.status === 401) {
            redirectToLogin();
        } else {
            throw error;
        }
    }
}

export async function getUserProfile(): Promise<any> {
    if (!accessToken) {
       await refreshAccessToken()
        return;
    }
    try {
        const response = await authApiClient.get('/user/profile');
        return response.data;
    } catch (error: any) {
        if (error && error.response.status === 401) {
            await refreshAccessToken();
            const response = await authApiClient.get('/user/profile');
            return response.data;
        }
        throw error;
    }
}