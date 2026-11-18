import { Injectable } from '@nestjs/common';

export type AdminRole = 'SUPER_ADMIN' | 'SUPPORT' | 'MODERATOR' | 'FINANCE';
export type Permission = 'audit.read' | 'settings.write' | 'verification.review' | 'listing.moderate' | 'reports.review' | 'support.manage' | 'disputes.decide' | 'finance.execute' | 'finance.approve' | 'cases.assign' | 'admin.roles.manage';

// C-13: v0.3 privilege matrix is a working draft. This catalogue is explicitly provisional.
const PROVISIONAL_ROLE_PERMISSIONS: Record<AdminRole, readonly Permission[]> = {
  SUPER_ADMIN: ['audit.read', 'settings.write', 'cases.assign', 'admin.roles.manage', 'finance.approve'],
  SUPPORT: ['support.manage', 'disputes.decide'],
  MODERATOR: ['verification.review', 'listing.moderate', 'reports.review'],
  FINANCE: ['finance.execute'],
};
@Injectable()
export class PermissionsService {
  readonly status = 'provisional' as const;
  has(role: AdminRole, permission: Permission): boolean { return PROVISIONAL_ROLE_PERMISSIONS[role]?.includes(permission) ?? false; }
  permissionsFor(role: AdminRole): readonly Permission[] { return PROVISIONAL_ROLE_PERMISSIONS[role] ?? []; }
}
