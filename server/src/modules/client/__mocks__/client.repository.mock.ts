import { Client } from '../entities/client.entity';

export const mockClientRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOneBy: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  insert: jest.fn(),
  count: jest.fn(),
};

export const createMockClient = (overrides?: Partial<Client>): Client => ({
  id: 1,
  name: 'Test Client',
  salary: 5000,
  companyValue: 150000,
  ...overrides,
});

export const createMockClients = (count: number): Client[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockClient({
      id: index + 1,
      name: `Client ${index + 1}`,
      salary: 5000 + index * 1000,
      companyValue: 150000 + index * 50000,
    }),
  );
};
