import type { Client } from '@/api/modules/clients/types';
import { MdOutlineEdit, MdOutlineDelete, MdAdd, MdHorizontalRule } from "react-icons/md";

interface ClientCardProps {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export function ClientCard({ client, onEdit, onDelete, onSelect }: ClientCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="rounded-lg border border-[--color-border] bg-[--color-card] p-4 shadow-sm flex flex-col justify-between">
      <div className="text-center mb-4">
        <h2 className="font-semibold text-lg">{client.name}</h2>
        <p className="text-sm text-[--color-muted]">Salary: {formatCurrency(client.salary)}</p>
        <p className="text-sm text-[--color-muted]">Company: {formatCurrency(client.companyValue)}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onSelect}
          className="text-xl font-bold hover:scale-110 transition cursor-pointer"
          title="Select"
        >
          {client.isSelected ? <MdHorizontalRule /> : <MdAdd />}
        </button>
        <button
          onClick={onEdit}
          className="hover:scale-110 transition cursor-pointer"
          title="Edit"
        >
          <MdOutlineEdit />
        </button>
        <button
          onClick={onDelete}
          className="hover:scale-110 text-destructive transition cursor-pointer"
          title="Delete"
        >
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
}