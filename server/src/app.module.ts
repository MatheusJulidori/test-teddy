import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './modules/client/client.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { MetricsModule } from './metrics/metrics.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) => req.headers['x-request-id'] || randomUUID(),
        customProps: (req) => ({
          requestId: req.id,
        }),
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
      },
    }),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
    DatabaseModule,
    ClientModule,
    HealthModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
