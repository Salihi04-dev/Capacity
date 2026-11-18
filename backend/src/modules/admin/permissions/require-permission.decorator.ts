import { SetMetadata } from '@nestjs/common';
import type { Permission } from './permissions.service';

export const REQUIRED_PERMISSION = 'capacity:required-permission';
export const RequirePermission = (permission: Permission) => SetMetadata(REQUIRED_PERMISSION, permission);
