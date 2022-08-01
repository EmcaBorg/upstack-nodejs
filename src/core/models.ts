export interface EmployeePayload {
  name: string;
  username: string;
  email: string;
  roleId: string;
}

export interface RolePayload {
  roleCode: string;
  roleName: string;
}