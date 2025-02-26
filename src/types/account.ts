import {Captions} from "../constants";

export enum AccountRole {
  ROLE_ADMIN,
  ROLE_USER
}

export interface Account {
  id: string;
  nickname: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  roles: string[];
}

const roleDictionary = {
  0: Captions.RoleAdmin,
  1: Captions.RoleUser
}

export const roleConverter = (role: AccountRole): string => {
  return roleDictionary[role]
}