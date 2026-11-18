import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PERMISSION } from './require-permission.decorator';
import { AdminRole, Permission, PermissionsService } from './permissions.service';

interface AuthenticatedAdminRequest {
  user?: { id: string; adminRoles?: AdminRole[] };
  actingRole?: AdminRole;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly permissions: PermissionsService) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Permission>(REQUIRED_PERMISSION, [context.getHandler(), context.getClass()]);
    if (!required) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedAdminRequest>();
    const assignedRoles = request.user?.adminRoles;
    const actingRole = request.actingRole;
    // `user` and `adminRoles` must be populated by the future authentication layer from server-side records.
    // Never infer authority from arbitrary headers or request-body fields.
    if (!request.user?.id || !assignedRoles || !actingRole || !assignedRoles.includes(actingRole)) {
      throw new ForbiddenException('A valid authenticated acting role is required.');
    }
    if (!this.permissions.has(actingRole, required)) {
      throw new ForbiddenException('The acting role does not have the required permission.');
    }
    return true;
  }
}
