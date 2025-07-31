/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

describe('ClientController', () => {
  let controller: ClientController;
  let serviceMock: jest.Mocked<ClientService>;

  const mockClientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    serviceMock = module.get<ClientService>(
      ClientService,
    ) as jest.Mocked<ClientService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      serviceMock.create.mockResolvedValue(mockClient);

      const result = await controller.create(createClientDto);

      expect(serviceMock.create).toHaveBeenCalledWith(createClientDto);
      expect(result).toEqual(mockClient);
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      const error = new InternalServerErrorException('Database error');
      serviceMock.create.mockRejectedValue(error);

      await expect(controller.create(createClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.create).toHaveBeenCalledWith(createClientDto);
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

    const mockResponse = {
      data: mockClients,
      total: 2,
      page: 1,
      limit: 10,
    };

    it('should return paginated clients with default parameters', async () => {
      serviceMock.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockResponse);
    });

    it('should return paginated clients with custom parameters', async () => {
      const customResponse = {
        data: [mockClients[0]],
        total: 2,
        page: 2,
        limit: 1,
      };
      serviceMock.findAll.mockResolvedValue(customResponse);

      const result = await controller.findAll(2, 1);

      expect(serviceMock.findAll).toHaveBeenCalledWith(2, 1);
      expect(result).toEqual(customResponse);
    });

    it('should handle string parameters correctly', async () => {
      serviceMock.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(1, 10);

      expect(serviceMock.findAll).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockResponse);
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      const error = new InternalServerErrorException('Database error');
      serviceMock.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.findAll).toHaveBeenCalledWith(1, 10);
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
      serviceMock.findOne.mockResolvedValue(mockClient);

      const result = await controller.findOne('1');

      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockClient);
    });

    it('should throw NotFoundException when client is not found', async () => {
      const error = new NotFoundException('Client not found');
      serviceMock.findOne.mockRejectedValue(error);

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      const error = new InternalServerErrorException('Database error');
      serviceMock.findOne.mockRejectedValue(error);

      await expect(controller.findOne('1')).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    const updateClientDto: UpdateClientDto = {
      name: 'John Updated',
      salary: 5500,
    };

    const mockUpdatedClient: Client = {
      id: 1,
      name: 'John Updated',
      salary: 5500,
      companyValue: 150000,
      isSelected: false,
    };

    it('should update a client successfully', async () => {
      serviceMock.update.mockResolvedValue(mockUpdatedClient);

      const result = await controller.update('1', updateClientDto);

      expect(serviceMock.update).toHaveBeenCalledWith(1, updateClientDto);
      expect(result).toEqual(mockUpdatedClient);
    });

    it('should throw NotFoundException when client is not found', async () => {
      const error = new NotFoundException('Client not found');
      serviceMock.update.mockRejectedValue(error);

      await expect(controller.update('1', updateClientDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(serviceMock.update).toHaveBeenCalledWith(1, updateClientDto);
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      const error = new InternalServerErrorException('Database error');
      serviceMock.update.mockRejectedValue(error);

      await expect(controller.update('1', updateClientDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.update).toHaveBeenCalledWith(1, updateClientDto);
    });
  });

  describe('remove', () => {
    it('should remove a client successfully', async () => {
      serviceMock.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(serviceMock.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException when client is not found', async () => {
      const error = new NotFoundException('Client not found');
      serviceMock.remove.mockRejectedValue(error);

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
      expect(serviceMock.remove).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      const error = new InternalServerErrorException('Database error');
      serviceMock.remove.mockRejectedValue(error);

      await expect(controller.remove('1')).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.remove).toHaveBeenCalledWith(1);
    });
  });
});
