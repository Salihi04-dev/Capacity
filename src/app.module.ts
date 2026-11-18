import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { envSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ListingsModule } from './modules/listings/listings.module';
import { LogisticsModule } from './modules/logistics/logistics.module';
import { StorageModule } from './modules/storage/storage.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LedgerPayoutsModule } from './modules/ledger-payouts/ledger-payouts.module';
import { DisputesModule } from './modules/disputes/disputes.module';
import { ReviewsReportsModule } from './modules/reviews-reports/reviews-reports.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envSchema, validationOptions: { abortEarly: false, allowUnknown: true } }),
    LoggerModule.forRoot({ pinoHttp: { level: process.env.LOG_LEVEL ?? 'info', transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty', options: { singleLine: true } } : undefined, redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token', '*.secret'] } }),
    DatabaseModule, HealthModule, AuthModule, BusinessesModule, VerificationModule, ListingsModule, LogisticsModule, StorageModule, DiscoveryModule, BookingsModule, PaymentsModule, LedgerPayoutsModule, DisputesModule, ReviewsReportsModule, NotificationsModule, AdminModule,
  ],
})
export class AppModule {}
