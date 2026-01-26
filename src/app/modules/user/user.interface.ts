export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface User {
  id: number;
  name?: string | null;
  email: string;
  password?: string | null;
  role: Role;
  phone: string;
  picture?: string | null;
  status: UserStatus;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
