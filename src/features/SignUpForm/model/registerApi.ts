import { baseAPI } from '@shared/api/baseAPI';
import { type RegisterRequest, type RegisterResponse} from './types'


export const registerApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: 'accounts',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
