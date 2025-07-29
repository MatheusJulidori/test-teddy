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

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    try {
      const client = this.clientRepo.create({
        name: dto.name,
        salary: dto.salary,
        companyValue: dto.companyValue,
      });
      return await this.clientRepo.save(client);
    } catch (error: unknown) {
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
    try {
      const [data, total] = await this.clientRepo.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' },
      });
      return { data, total, page, limit };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.clientRepo.findOneBy({ id });
      if (!client) throw new NotFoundException('Client not found');
      return client;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.clientRepo.preload({ id, ...dto });
      if (!client) throw new NotFoundException('Client not found');
      return await this.clientRepo.save(client);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const client = await this.findOne(id);
      if (!client) throw new NotFoundException('Client not found');
      await this.clientRepo.remove(client);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unknown error');
    }
  }
}
