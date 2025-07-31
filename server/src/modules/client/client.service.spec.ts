import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { mockClientRepository } from './__mocks__/client.repository.mock';

describe('ClientService', () => {
  let service: ClientService;
  let repositoryMock: typeof mockClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repositoryMock = module.get(getRepositoryToken(Client));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createClientDto: CreateClientDto = {
      name: 'John Doe',
      salary: 5000,
      companyValue: 150000,
    };

    const mockClient: Client = {
      id: 1,
      name: 'John Doe',
      salary: 5000,
      companyValue: 150000,
      isSelected: false,
    };

    it('should create a client successfully', async () => {
      repositoryMock.create.mockReturnValue(mockClient);
      repositoryMock.save.mockResolvedValue(mockClient);

      const result = await service.create(createClientDto);

      expect(repositoryMock.create).toHaveBeenCalledWith({
        name: createClientDto.name,
        salary: createClientDto.salary,
        companyValue: createClientDto.companyValue,
      });
      expect(repositoryMock.save).toHaveBeenCalledWith(mockClient);
      expect(result).toEqual(mockClient);
    });

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const error = new Error('Database error');
      repositoryMock.create.mockReturnValue(mockClient);
      repositoryMock.save.mockRejectedValue(error);

      await expect(service.create(createClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw InternalServerErrorException for unknown errors', async () => {
      repositoryMock.create.mockReturnValue(mockClient);
      repositoryMock.save.mockRejectedValue('Unknown error');

      await expect(service.create(createClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    const mockClients: Client[] = [
      {
        id: 1,
        name: 'John Doe',
        salary: 5000,
        companyValue: 150000,
        isSelected: false,
      },
      {
        id: 2,
        name: 'Jane Smith',
        salary: 6000,
        companyValue: 200000,
        isSelected: false,
      },
    ];

    it('should return paginated clients successfully', async () => {
      repositoryMock.findAndCount.mockResolvedValue([mockClients, 2]);

      const result = await service.findAll(1, 10);

      expect(repositoryMock.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: { id: 'ASC' },
      });
      expect(result).toEqual({
        data: mockClients,
        total: 2,
        page: 1,
        limit: 10,
      });
    });

    it('should handle pagination correctly', async () => {
      repositoryMock.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.findAll(2, 5);

      expect(repositoryMock.findAndCount).toHaveBeenCalledWith({
        skip: 5,
        take: 5,
        order: { id: 'ASC' },
      });
      expect(result).toEqual({
        data: [],
        total: 0,
        page: 2,
        limit: 5,
      });
    });

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const error = new Error('Database error');
      repositoryMock.findAndCount.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    const mockClient: Client = {
      id: 1,
      name: 'John Doe',
      salary: 5000,
      companyValue: 150000,
      isSelected: false,
    };

    it('should return a client when found', async () => {
      repositoryMock.findOneBy.mockResolvedValue(mockClient);

      const result = await service.findOne(1);

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockClient);
    });

    it('should throw NotFoundException when client is not found', async () => {
      repositoryMock.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const error = new Error('Database error');
      repositoryMock.findOneBy.mockRejectedValue(error);

      await expect(service.findOne(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    const updateClientDto: UpdateClientDto = {
      name: 'John Updated',
      salary: 5500,
    };

    const mockClient: Client = {
      id: 1,
      name: 'John Updated',
      salary: 5500,
      companyValue: 150000,
      isSelected: false,
    };

    it('should update a client successfully', async () => {
      repositoryMock.preload.mockResolvedValue(mockClient);
      repositoryMock.save.mockResolvedValue(mockClient);

      const result = await service.update(1, updateClientDto);

      expect(repositoryMock.preload).toHaveBeenCalledWith({
        id: 1,
        ...updateClientDto,
      });
      expect(repositoryMock.save).toHaveBeenCalledWith(mockClient);
      expect(result).toEqual(mockClient);
    });

    it('should throw NotFoundException when client is not found', async () => {
      repositoryMock.preload.mockResolvedValue(null);

      await expect(service.update(1, updateClientDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(repositoryMock.preload).toHaveBeenCalledWith({
        id: 1,
        ...updateClientDto,
      });
    });

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const error = new Error('Database error');
      repositoryMock.preload.mockRejectedValue(error);

      await expect(service.update(1, updateClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('remove', () => {
    const mockClient: Client = {
      id: 1,
      name: 'John Doe',
      salary: 5000,
      companyValue: 150000,
      isSelected: false,
    };

    it('should remove a client successfully', async () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockClient);
      repositoryMock.remove.mockResolvedValue(mockClient);

      await service.remove(1);

      expect(findOneSpy).toHaveBeenCalledWith(1);
      expect(repositoryMock.remove).toHaveBeenCalledWith(mockClient);
    });

    it('should throw NotFoundException when client is not found', async () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('Client not found'));

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(findOneSpy).toHaveBeenCalledWith(1);
      expect(repositoryMock.remove).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when repository throws an error', async () => {
      const error = new Error('Database error');
      jest.spyOn(service, 'findOne').mockResolvedValue(mockClient);
      repositoryMock.remove.mockRejectedValue(error);

      await expect(service.remove(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
