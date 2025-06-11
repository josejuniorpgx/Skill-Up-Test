import {ApiResponse, AxiosApiService} from "@/types/api";
import myApiClient from "./myApiClient";
import {AxiosResponse} from "axios";

//todo: Fix Types.
export const myApiService: AxiosApiService = {
    get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
        return await myApiClient.get<T>(`/${endpoint}`);
    },

    getAll: async <T>(endpoint: string): Promise<AxiosResponse<T>> => {
        return await myApiClient.get<T>(`/${endpoint}`);
    },

    getById: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
        return await myApiClient.get<T>(`/${endpoint}`);
    },

    create: async <T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> => {
        return await myApiClient.post<T>(`/${endpoint}`, data);
    },

    patch: async <T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> => {
        return await myApiClient.patch<T>(`/${endpoint}`, data);
    },

    update: async <T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> => {
        return await myApiClient.put<T>(`/${endpoint}`, data);
    },

    remove: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
        return await myApiClient.delete<T>(`/${endpoint}`);
    },

    search: async <T>(endpoint: string, params: Record<string, any>): Promise<ApiResponse<T>> => {
        return await myApiClient.get<T>(`/${endpoint}`, {params});
    },
};
