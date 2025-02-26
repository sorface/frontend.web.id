import { Account, AccountRole } from '../types/account';

export const checkAdmin = (account: Account | null) => {
    console.log('Роли: ', account?.roles, ' is admin ', !!account?.roles.find(role => Object.values(AccountRole).includes(role)))

    return !!account && !!account.roles.find(role => Object.values(AccountRole).includes(role));
}
