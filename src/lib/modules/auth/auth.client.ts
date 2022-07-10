const baseUrl = '/api';
const unknownErrorMsg = 'Unexpected error';

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  name: string;
} & LoginRequest;

export const login = async (req: LoginRequest) => {
  try {
    const resp = await fetch(`${baseUrl}/auth/login`, {
      method: 'post',
      body: JSON.stringify(req),
    });
    const data = await resp.json();
    return resp.ok ? { data } : { error: data?.message || unknownErrorMsg };
  } catch (error) {
    return {
      error: unknownErrorMsg,
    };
  }
};

export const register = async (req: RegisterRequest) => {
  try {
    const resp = await fetch(`${baseUrl}/auth/register`, {
      method: 'post',
      body: JSON.stringify(req),
    });
    const data = await resp.json();
    return resp.ok ? { data } : { error: data?.message || unknownErrorMsg };
  } catch (error) {
    return {
      error: unknownErrorMsg,
    };
  }
};
