export interface FormsType {
  [key: string]: {
    title: string;
    label: string;
    schema: Record<string, any>;
    fields: { key: string; type: string; label: string }[];
  };
}

export interface LoginResponse {
  refresh?: string;
  access?: string;
  id?: number;
  phone_number: string;
  email?: string;
  name?: string;
  password?: string;
  is_active?: true;
  isAdmin?: true;
}

export interface RefreshTokenData {
  access: string;
  refresh: string;
}

export interface VerifyDataType {
  phone?: string;
  code: string;
}
