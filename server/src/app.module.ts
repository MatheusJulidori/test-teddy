import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [DatabaseModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
