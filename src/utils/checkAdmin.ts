import { Account, AccountRole } from '../types/account';

export const getAccountRoleName = Object.keys(AccountRole)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
        return {
            id: AccountRole[name as keyof typeof AccountRole],
            name,
        };
    });

export const checkAdmin = (account: Account | null) =>
  !!account && account.roles.includes(AccountRole.ROLE_ADMIN);
