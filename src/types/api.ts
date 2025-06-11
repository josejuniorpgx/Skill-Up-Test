//Types and interfaces for API responses and service methods

/**
 * Represents a standard API response structure.
 *
 * @template T - The type of the data returned in the response.
 * @property {T} data - The actual data returned from the API.
 * @property {number} [status] - The status code of the API response, if provided.
 * @property {string} [message] - A message from the API, typically used for errors or status descriptions.
 */
export interface ApiResponse<T> {
    data: T;
    status?: number;
    message?: string;
}

/**
 * Represents a service for making API requests.
 */
export interface AxiosApiService {
    get: <T>(endpoint: string) => Promise<ApiResponse<T>>;
    getById: <T>(endpoint: string) => Promise<ApiResponse<T>>;
    getAll: <T>(endpoint: string) => Promise<ApiResponse<T>>;
    create: <T, D>(endpoint: string, data: D) => Promise<ApiResponse<T>>;
    patch: <T, D>(endpoint: string, data: D) => Promise<ApiResponse<T>>;
    update: <T, D>(endpoint: string, data: D) => Promise<ApiResponse<T>>;
    remove: <T>(endpoint: string) => Promise<ApiResponse<T>>;
    search: <T>(endpoint: string, params: Record<string, any>) => Promise<ApiResponse<T>>;
}
