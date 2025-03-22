import axios from 'axios';
import {AuthData, Profile, UserRegistration} from "../types/fields.ts";



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

export async function logOut() {
    accessToken = null;
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    return await authApiClient.post<string>('auth/logout')
}

export async function signIn(authData: AuthData): Promise<AuthResponse> {
    const response = await authApiClient.post<AuthResponse>('/auth/signin', authData);
    accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
}

export async function signUp(authData: UserRegistration): Promise<Profile> {
    const response = await authApiClient.post<Profile>('/auth/signup', authData);
    return response.data;
}

export async function refreshAccessToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await authApiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', response.data.accessToken);
        accessToken = response.data.accessToken;
        localStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error: any) {
        if (error) {
            await logOut();
        } else {
            throw error;
        }
    }
}

export async function getUserProfile(): Promise<Profile> {
    if (!accessToken) {
        await refreshAccessToken();
    }
    try {
        const response = await authApiClient.get<Profile>('/user/profile');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            const response = await authApiClient.get<Profile>('/user/profile');
            return response.data;
        }
        throw error;
    }
}