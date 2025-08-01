import { useState } from 'react';
import { Input } from '@/components/ui/input';
import type { CreateClient, Client } from '@/api/modules/clients/types';
import { Button } from './ui/button';

interface ClientFormProps {
  initialData?: Partial<Client>;
  onSubmit: (data: CreateClient) => void;
}

export function ClientForm({ initialData, onSubmit }: ClientFormProps) {
  const [formData, setFormData] = useState<CreateClient>({
    name: initialData?.name || '',
    salary: initialData?.salary || 0,
    companyValue: initialData?.companyValue || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Salário deve ser maior que zero';
    }

    if (!formData.companyValue || formData.companyValue <= 0) {
      newErrors.companyValue = 'Valor da empresa deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData: CreateClient = {
        name: formData.name,
        salary: typeof formData.salary === 'string' ? parseFloat(formData.salary) : formData.salary,
        companyValue: typeof formData.companyValue === 'string' ? parseFloat(formData.companyValue) : formData.companyValue,
      };
      
      onSubmit(submitData);
    }
  };

  const handleInputChange = (field: keyof CreateClient, value: string | number) => {
    if (field === 'salary' || field === 'companyValue') {
      const stringValue = typeof value === 'string' ? value : value.toString();
      const numValue = stringValue === '' ? 0 : parseFloat(stringValue);
      const finalValue = isNaN(numValue) ? 0 : numValue;
      
      setFormData(prev => ({
        ...prev,
        [field]: finalValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value as string
      }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Digite o nome: "
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Input
          id="salary"
          type="number"
          value={formData.salary === 0 ? '' : formData.salary}
          onChange={(e) => handleInputChange('salary', e.target.value)}
          placeholder="Digite o salário: "
          min="0"
          step="0.01"
          className={errors.salary ? 'border-destructive' : ''}
        />
        {formData.salary > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            {formatCurrency(formData.salary)}
          </p>
        )}
        {errors.salary && (
          <p className="text-sm text-destructive mt-1">{errors.salary}</p>
        )}
      </div>

      <div>
        <Input
          id="companyValue"
          type="number"
          value={formData.companyValue === 0 ? '' : formData.companyValue}
          onChange={(e) => handleInputChange('companyValue', e.target.value)}
          placeholder="Digite o valor da empresa: "
          min="0"
          step="0.01"
          className={errors.companyValue ? 'border-destructive' : ''}
        />
        {formData.companyValue > 0 && (
          <p className="text-xs text-gray-600 mt-1">
            {formatCurrency(formData.companyValue)}
          </p>
        )}
        {errors.companyValue && (
          <p className="text-sm text-destructive mt-1">{errors.companyValue}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="flex-1 px-4 py-2 bg-primary text-white rounded-md cursor-pointer transition"
        >
          {initialData ? 'Atualizar' : 'Criar'} Cliente
        </Button>
      </div>
    </form>
  );
}
