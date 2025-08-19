import { baseAPI } from './baseAPI';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'accounts/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
