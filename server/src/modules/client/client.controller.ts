import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
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
  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({ status: 201, description: 'Client created successfully.' })
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all clients with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientService.findAll(+page, +limit);
  }

  @Get('selected')
  @ApiOperation({ summary: 'List selected clients with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findSelected(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.clientService.findSelected(+page, +limit);
  }

  @Patch('select/:id')
  @ApiOperation({ summary: 'Toggle client selection' })
  toggleSelection(@Param('id') id: string) {
    return this.clientService.toggleSelection(+id);
  }

  @Patch('toggle-all')
  @ApiOperation({ summary: 'Toggle selection for multiple clients' })
  toggleAllSelection(@Body() body: { ids: number[] }) {
    return this.clientService.toggleAllSelection(body.ids);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update client by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove client by ID' })
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
