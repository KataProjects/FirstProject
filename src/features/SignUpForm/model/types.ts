export type SecurityQuestion = {
  value: string;
  label: string;
};

export type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}
