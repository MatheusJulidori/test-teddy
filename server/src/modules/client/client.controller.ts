import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente por ID' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cliente por ID' })
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
