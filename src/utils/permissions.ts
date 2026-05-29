/**
 * CRUD permissions by role and entity.
 * Must stay in sync with backend route checkRole() and controller scope.
 */

export type Role = 'SUPERADMIN' | 'ADMIN' | 'MANAGER' | 'VETERINARIAN';

export type Entity =
  | 'users'
  | 'farms'
  | 'cattle'
  | 'production'
  | 'productionTotals'
  | 'productionTransactions'
  | 'wasteLogs'
  | 'stock'
  | 'stockTransactions'
  | 'vaccinations'
  | 'inseminations'
  | 'veterinarians'
  | 'activityLogs'
  | 'suppliers'
  | 'items';

const canCreate: Partial<Record<Entity, Role[]>> = {
  users: ['SUPERADMIN', 'ADMIN'],
  farms: ['SUPERADMIN', 'ADMIN'],
  cattle: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  production: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  productionTotals: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  productionTransactions: ['ADMIN', 'MANAGER'],
  wasteLogs: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stock: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stockTransactions: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  vaccinations: ['SUPERADMIN', 'ADMIN', 'MANAGER', 'VETERINARIAN'],
  inseminations: ['SUPERADMIN', 'ADMIN', 'MANAGER', 'VETERINARIAN'],
  veterinarians: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  activityLogs: [], // no create from UI
  suppliers: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  items: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
};

const canUpdate: Partial<Record<Entity, Role[]>> = {
  users: ['SUPERADMIN', 'ADMIN', 'MANAGER'], // MANAGER can update self/team per backend
  farms: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  cattle: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  production: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  productionTotals: ['ADMIN', 'MANAGER'],
  productionTransactions: ['ADMIN', 'MANAGER'],
  wasteLogs: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stock: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stockTransactions: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  vaccinations: ['SUPERADMIN', 'ADMIN', 'MANAGER', 'VETERINARIAN'],
  inseminations: ['SUPERADMIN', 'ADMIN', 'MANAGER', 'VETERINARIAN'],
  veterinarians: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  activityLogs: [],
  suppliers: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  items: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
};

const canDelete: Partial<Record<Entity, Role[]>> = {
  users: ['SUPERADMIN', 'ADMIN'],
  farms: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  cattle: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  production: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  productionTotals: ['ADMIN', 'MANAGER'],
  productionTransactions: ['ADMIN', 'MANAGER'],
  wasteLogs: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stock: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  stockTransactions: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  vaccinations: [], // no delete route
  inseminations: [],
  veterinarians: [],
  activityLogs: [],
  suppliers: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
  items: ['SUPERADMIN', 'ADMIN', 'MANAGER'],
};

export function canCreateEntity(entity: Entity, role: string): boolean {
  const roles = canCreate[entity];
  return Array.isArray(roles) && roles.includes(role as Role);
}

export function canUpdateEntity(entity: Entity, role: string): boolean {
  const roles = canUpdate[entity];
  return Array.isArray(roles) && roles.includes(role as Role);
}

export function canDeleteEntity(entity: Entity, role: string): boolean {
  const roles = canDelete[entity];
  return Array.isArray(roles) && roles.includes(role as Role);
}

export function canViewEntity(entity: Entity, role: string): boolean {
  // If user can create, update, or delete they can view. Plus view-only roles per entity.
  return (
    canCreateEntity(entity, role) ||
    canUpdateEntity(entity, role) ||
    canDeleteEntity(entity, role) ||
    (entity === 'cattle' && role === 'VETERINARIAN') ||
    (entity === 'activityLogs' && role === 'VETERINARIAN') ||
    (entity === 'veterinarians' && role === 'VETERINARIAN')
  );
}
