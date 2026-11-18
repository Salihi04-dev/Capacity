import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

export interface AuditEventInput { actorId: string; actingRole: string; action: string; targetType: string; targetId: string; reason?: string; before?: unknown; after?: unknown; ipAddress?: string; }
@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}
  async record(event: AuditEventInput): Promise<void> {
    await this.prisma.auditLog.create({ data: {
      actorId: event.actorId, actingRole: event.actingRole, action: event.action,
      targetType: event.targetType, targetId: event.targetId, reason: event.reason, ipAddress: event.ipAddress,
      before: event.before == null ? undefined : event.before as Prisma.InputJsonValue,
      after: event.after == null ? undefined : event.after as Prisma.InputJsonValue,
    } });
  }
}
