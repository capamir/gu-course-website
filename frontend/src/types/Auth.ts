export interface FormsType {
  [key: string]: {
    title: string;
    label: string;
    schema: Record<string, any>;
    fields: { key: string; type: string; label: string }[];
  };
}

export interface LoginResponse {
  id?: number;
  email?: string;
  password?: string;
  full_name?: string;
  phone_number?: string;
  access?: string;
  refresh?: string;
}
