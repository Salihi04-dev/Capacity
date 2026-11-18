import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from '../admin/settings/settings.service';

@ApiTags('storage')
@Controller({ path: 'storage', version: '1' })
export class StorageController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  async disabled(): Promise<never> {
    // D39: Storage is disabled for the whole pilot. An approved switch alone does not
    // activate workflows; that also requires an approved scope change and implementation.
    const setting = await this.settings.getApproved<boolean>('storage.enabled');
    if (!setting || setting.value !== true) {
      throw new HttpException({ code: 'STORAGE_DISABLED', message: 'Storage workflows are disabled for the pilot.' }, HttpStatus.NOT_FOUND);
    }
    throw new HttpException({ code: 'STORAGE_NOT_IMPLEMENTED', message: 'Storage activation requires an approved scope change and completed workflows.' }, HttpStatus.NOT_IMPLEMENTED);
  }
}
