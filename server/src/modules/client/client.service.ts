import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PinoLogger } from 'nestjs-pino';
import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
    private readonly logger: PinoLogger,
    @InjectMetric('client_create_total')
    private readonly clientCreateCounter: Counter<string>,
  ) {
    this.logger.setContext(ClientService.name);
  }

  async create(dto: CreateClientDto): Promise<Client> {
    this.logger.info({ dto }, 'Creating new client');
    try {
      const client = this.clientRepo.create({
        name: dto.name,
        salary: dto.salary,
        companyValue: dto.companyValue,
      });
      const saved = await this.clientRepo.save(client);
      this.logger.info({ id: saved.id }, 'Client created successfully');
      this.clientCreateCounter.inc();
      return saved;
    } catch (error: unknown) {
      this.logger.error({ err: error }, 'Error creating client');
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Client[]; total: number; page: number; limit: number }> {
    this.logger.info({ page, limit }, 'Fetching clients with pagination');
    try {
      const [data, total] = await this.clientRepo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' },
      });
      this.logger.info({ count: data.length, total }, 'Clients fetched');
      return { data, total, page, limit };
    } catch (error: unknown) {
      this.logger.error({ err: error }, 'Error fetching clients');
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async findOne(id: number): Promise<Client> {
    this.logger.info({ id }, 'Fetching client by ID');
    try {
      const client = await this.clientRepo.findOneBy({ id });
      if (!client) {
        this.logger.warn({ id }, 'Client not found');
        throw new NotFoundException('Client not found');
      }
      this.logger.info({ id }, 'Client found');
      return client;
    } catch (error: unknown) {
      this.logger.error({ err: error, id }, 'Error fetching client');
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    this.logger.info({ id, dto }, 'Updating client');
    try {
      const client = await this.clientRepo.preload({ id, ...dto });
      if (!client) {
        this.logger.warn({ id }, 'Client not found for update');
        throw new NotFoundException('Client not found');
      }
      const updated = await this.clientRepo.save(client);
      this.logger.info({ id }, 'Client updated successfully');
      return updated;
    } catch (error: unknown) {
      this.logger.error({ err: error, id }, 'Error updating client');
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.info({ id }, 'Removing client');
    try {
      const client = await this.findOne(id);
      if (!client) {
        this.logger.warn({ id }, 'Client not found for removal');
        throw new NotFoundException('Client not found');
      }
      await this.clientRepo.remove(client);
      this.logger.info({ id }, 'Client removed successfully');
    } catch (error: unknown) {
      this.logger.error({ err: error, id }, 'Error removing client');
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }
}
