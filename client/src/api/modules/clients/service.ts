import { api } from '@/api/client';
import type { Client, CreateClient, UpdateClient, ClientResponse  } from './types.ts';

export async function getClients(page = 1, limit = 10): Promise<ClientResponse> {
  try{
    const res = await api.get('/clients', { params: { page, limit } });
    return res.data;
  } catch (error: unknown) {
    throw new Error('Failed to fetch clients: ' + (error as Error).message);
  }
}

export async function toggleClientSelection(id: number): Promise<Client> {
  try {
    const res = await api.patch(`/clients/select/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error('Failed to toggle client selection: ' + (error as Error).message);
  }
}

export async function createClient(data: CreateClient): Promise<Client> {
  try {
    const res = await api.post('/clients', data);
    return res.data;
  } catch (error) {
    throw new Error('Failed to create client: ' + (error as Error).message);
  }
}

export async function updateClient(id: number, data: UpdateClient): Promise<Client> {
  try {
    const res = await api.put(`/clients/${id}`, data);
    return res.data;
  } catch (error: unknown) {
    throw new Error('Failed to update client: ' + (error as Error).message);
  }
}

export async function deleteClient(id: number): Promise<void> {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error: unknown) {
    throw new Error('Failed to delete client: ' + (error as Error).message);
  }
}

export async function getClientById(id: number): Promise<Client> {
  try {
    const res = await api.get(`/clients/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error('Failed to fetch client: ' + (error as Error).message);
  }
}



