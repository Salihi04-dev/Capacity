import { PermissionsService } from '../src/modules/admin/permissions/permissions.service';

describe('provisional admin permission catalogue', () => {
  const permissions = new PermissionsService();

  it('is explicitly marked provisional', () => {
    expect(permissions.status).toBe('provisional');
  });

  it('does not grant Finance execution to Support', () => {
    expect(permissions.has('SUPPORT', 'finance.execute')).toBe(false);
  });

  it('grants Finance execution only to Finance in the current draft', () => {
    expect(permissions.has('FINANCE', 'finance.execute')).toBe(true);
    expect(permissions.has('SUPER_ADMIN', 'finance.execute')).toBe(false);
  });
});
