import { Controller, Get, Module } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';

@ApiTags('health')
@Controller({ path: 'health', version: '1' })
class HealthController {
  constructor(private readonly prisma: PrismaService) {}
  @Get('live') @ApiOperation({ summary: 'Process liveness; does not require database availability' })
  live() { return { status: 'ok', service: 'capacity-api' }; }
  @Get('ready') @ApiOperation({ summary: 'Readiness including PostgreSQL connectivity' })
  async ready() { await this.prisma.$queryRaw`SELECT 1`; return { status: 'ready', database: 'connected' }; }
}
@Module({ controllers: [HealthController] })
export class HealthModule {}
