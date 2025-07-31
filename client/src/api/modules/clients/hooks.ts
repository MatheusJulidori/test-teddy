import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  toggleClientSelection,
} from '@/api/modules/clients/service';
import type { CreateClient, UpdateClient } from '@/api/modules/clients/types';

export const useClientList = (page = 1, limit = 10) =>
  useQuery({
    queryKey: ['clients', { page, limit }],
    queryFn: () => getClients(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const useClientById = (id: number | undefined) =>
  useQuery({
    queryKey: ['clients', id],
    queryFn: () => getClientById(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const useClientMutations = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data: CreateClient) => createClient(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateClient }) =>
      updateClient(id, data),
    onSuccess: (_, { id }) => {
      void qc.invalidateQueries({ queryKey: ['clients'] });
      void qc.invalidateQueries({ queryKey: ['clients', id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const toggleSelect = useMutation({
    mutationFn: (id: number) => toggleClientSelection(id),
    onSuccess: (_, id) => {
      void qc.invalidateQueries({ queryKey: ['clients'] });
      void qc.invalidateQueries({ queryKey: ['clients', id] });
    },
  });

  return { create, update, remove, toggleSelect };
};
