import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

export type SettingStatus = 'provisional' | 'approved' | 'disabled';
export interface SettingSnapshot<T = unknown> { key: string; value: T | null; status: SettingStatus; version: number; effectiveAt: Date | null; source: string; }

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}
  /** Returns the latest effective approved version only; unset/provisional values are never promoted implicitly. */
  async getApproved<T = unknown>(key: string): Promise<SettingSnapshot<T> | null> {
    const row = await this.prisma.settingVersion.findFirst({ where: { key, effectiveAt: { lte: new Date() } }, orderBy: { version: 'desc' } });
    if (!row || row.status !== 'approved') return null;
    return { key: row.key, value: row.value as T, status: row.status as SettingStatus, version: row.version, effectiveAt: row.effectiveAt, source: row.source };
  }
}
