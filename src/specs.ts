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
  username: string;
  credit: string;
  balance: string;
  role: number;
  status: number;
  registered_at: string;
  updated_at: string;
}

export interface IInvitation {
  id: string;
  code: string;
  user_id: string;
  remaining_usage: number;
  status: number;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

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
