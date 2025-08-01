import { useState, useMemo } from 'react';
import { ClientCard } from '@/components/ClientCard';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';
import { ClientForm } from '@/components/ClientForm';
import { useClientList, useClientMutations } from '@/api/modules/clients/hooks';
import type { Client, CreateClient, UpdateClient } from '@/api/modules/clients/types';

export function ClientsPage() {
  const [page, setPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(16);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const { data: clientsResponse, isLoading, error } = useClientList(page, clientsPerPage);
  const { create, update, remove, toggleSelect } = useClientMutations();

  const totalClients = clientsResponse?.total || 0;
  const totalPages = Math.ceil(totalClients / clientsPerPage);
  const clients = clientsResponse?.data || [];

  const paginationRange = useMemo(() => {
    const range: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);

      if (page > 3) range.push('...');

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) range.push(i);

      if (page < totalPages - 2) range.push('...');

      range.push(totalPages);
    }

    return range;
  }, [page, totalPages]);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      remove.mutate(clientToDelete.id);
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleSelect = (client: Client) => {
    toggleSelect.mutate(client.id);
  };

  const handleModalSubmit = (data: CreateClient) => {
  
    if (editingClient) {
      const updateData: UpdateClient = {
        name: data.name,
        salary: data.salary,
        companyValue: data.companyValue,
      };
      
      update.mutate(
        { id: editingClient.id, data: updateData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingClient(null);
          },
          onError: (error) => {
            console.error('Update failed:', error);
            alert('Failed to update client. Please try again.');
          },
        }
      );
    } else {
      create.mutate(data, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error('Create failed:', error);
          alert('Failed to create client. Please try again.');
        },
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading clients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-500">
          Error loading clients: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-lg">
          <strong>{totalClients}</strong> clientes encontrados:
        </h2>

        <div className="flex items-center gap-2 text-sm">
          <label className="font-medium">Clientes por página:</label>
          <select
            value={clientsPerPage}
            onChange={(e) => {
              setClientsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border border-border bg-background text-foreground rounded-md px-2 py-1"
          >
            {[4, 8, 12, 16, 24, 32].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={() => handleEdit(client)}
            onDelete={() => handleDelete(client)}
            onSelect={() => handleSelect(client)}
          />
        ))}
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full text-primary border-1 border-primary cursor-pointer"
          onClick={handleCreate}
        >
          Criar cliente
        </Button>
      </div>

      <div className="flex justify-center flex-wrap gap-2 text-sm">
        {paginationRange.map((item, idx) =>
          typeof item === 'number' ? (
            <button
              key={idx}
              onClick={() => setPage(item)}
              className={`w-8 h-8 rounded-md border text-center cursor-pointer transition ${
                page === item
                  ? 'bg-primary text-white border-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              {item}
            </button>
          ) : (
            <span key={idx} className="w-8 h-8 flex items-center justify-center text-black">
              ...
            </span>
          )
        )}
      </div>

      {isModalOpen && (
        <Modal
          title={editingClient ? 'Editar Cliente' : 'Criar Cliente'}
          buttonLabel={editingClient ? 'Salvar' : 'Criar'}
          onSubmit={() => {}}
          onClose={handleModalClose}
        >
          <ClientForm
            initialData={editingClient || undefined}
            onSubmit={handleModalSubmit}
          />
        </Modal>
      )}

      {isDeleteModalOpen && clientToDelete && (
        <Modal
          title="Excluir Cliente"
          showFooter={true}
          buttonLabel="Excluir cliente"
          onSubmit={handleConfirmDelete}
          onClose={handleCancelDelete}
          isDestructive={true}
        >
          <p>Você está prestes a excluir o cliente: {clientToDelete.name}</p>
        </Modal>
      )}
    </div>
  );
}

export default ClientsPage;