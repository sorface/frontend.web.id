import { gql } from '@apollo/client';

// Account Mutations
export const UPDATE_ACCOUNT_DETAILS = gql`
  mutation UpdateAccountDetails($account: PatchUpdateAccount!) {
    accountUpdateDetails(account: $account) {
      id
      username
      email
      firstName
      lastName
      middleName
      avatar
      birthday
      roles {
        code
        name
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation UpdateUsername($accountUsernameUpdate: AccountUsernameUpdate!) {
    accountUpdateUsernameById(accountUsernameUpdate: $accountUsernameUpdate) {
      username
    }
  }
`;

export const REGISTER_ACCOUNT = gql`
  mutation RegisterAccount($request: AccountRegistry!) {
    accountRegistry(request: $request) {
      id
      username
      email
      firstName
      lastName
      roles {
        code
        name
      }
    }
  }
`;

// Role Mutations
export const CREATE_ROLE = gql`
  mutation CreateRole($input: RoleCreateInput!) {
    roleCreate(input: $input) {
      id
      code
      name
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($input: RoleUpdateInput!) {
    roleUpdate(input: $input) {
      id
      code
      name
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: UUID!) {
    roleDelete(id: $id) {
      success
      message
    }
  }
`;
