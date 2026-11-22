import { Module } from '@nestjs/common';
import { SettingsModule } from './settings/settings.module';
import { AuditModule } from './audit/audit.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [SettingsModule, AuditModule, PermissionsModule],
  exports: [SettingsModule, AuditModule, PermissionsModule],
})
export class AdminModule {}
