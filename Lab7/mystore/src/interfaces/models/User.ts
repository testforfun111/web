export interface User {
  avatar?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  login: string;
  password: string;
  role: string;
  id: number;
}
export interface SignInDto {
    login: string;
    password: string;
}

export interface RawUserDto {
    avatar?: string;
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    login: string;
    password: string;
    role: string;
}

export interface TokenUserDto {
    token: string;
    user: User;
}
