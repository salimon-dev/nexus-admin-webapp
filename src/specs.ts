export interface IProfile {
  id: string;
  username: string;
  credit: string;
  balance: string;
  role: number;
  status: number;
  registered_at: string;
  updated_at: string;
}

export interface IUser {
  id: string;
  invitation_id: string;
  username: string;
  credit: number;
  balance: number;
  role: number;
  status: number;
  registered_at: string;
  updated_at: string;
}

export const userRole: { [key: number]: string } = {
  1: "keymaker",
  2: "admin",
  3: "developer",
  4: "member",
};

export const userStatus: { [key: number]: string } = {
  1: "active",
  2: "inactive",
};

export interface IInvitation {
  id: string;
  code: string;
  created_by: string;
  usage_remaining: number;
  status: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export const invitationStatus: { [key: number]: string } = {
  1: "active",
  2: "inactive",
};

export interface IEntity {
  id: string;
  name: string;
  description: string;
  base_url: string;
  status: number;
  permission: number;
  credit: number;
  created_at: string;
  updated_at: string;
}

export const entityStatus: { [key: number]: string } = {
  1: "active",
  2: "inactive",
};

export const entityPermission: { [key: number]: string } = {
  1: "public",
  2: "internal",
  3: "private",
  4: "development",
};
