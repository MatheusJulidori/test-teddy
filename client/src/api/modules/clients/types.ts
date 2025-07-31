export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValue: number;
  isSelected: boolean;
}

export interface CreateClient {
  name: string;
  salary: number;
  companyValue: number;
}

export interface UpdateClient {
  name?: string;
  salary?: number;
  companyValue?: number;
}

export interface ClientResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}
