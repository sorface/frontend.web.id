export enum AccountRole {
  ROLE_ADMIN= "Администратор",
  ROLE_USER= "Пользователь"
}

export interface Account {
  id: string;
  nickname: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  roles: AccountRole[];
}
