export interface SignupDTOInput {
  apelido: unknown;
  email: unknown;
  password: unknown;
}
export interface SignUpDTOOutput {
  token: string;
}

export interface LogInDTO {
  email: unknown;
  password: unknown;
}

export interface LogOutDTO {
  token: string;
}

export interface LoginOutputDTO {
  token: string;
}
