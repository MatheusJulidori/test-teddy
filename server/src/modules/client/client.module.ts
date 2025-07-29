import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService,
    makeCounterProvider({
      name: 'client_create_total',
      help: 'Total de clientes criados',
    }),
  ],
})
export class ClientModule {}
