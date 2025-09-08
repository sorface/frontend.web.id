import { gql } from '@apollo/client';

// Account Queries
export const GET_AUTHORIZED_ACCOUNT = gql`
  query GetAuthorizedAccount {
    accountGetAuthorized {
      id
      username
      email
      roles {
        code
      }
      avatar
      birthday
      firstName
      lastName
      middleName
      providerType
      externalId
    }
  }
`;

export const GET_ACCOUNT_BY_ID = gql`
  query GetAccountById($id: UUID!) {
    accountGetById(id: $id) {
      id
      username
      email
      roles {
        code
      }
      avatar
      birthday
      firstName
      lastName
      middleName
      providerType
      externalId
    }
  }
`;

export const GET_ACCOUNT_BY_USERNAME = gql`
  query GetAccountByUsername($username: String!) {
    accountGetByUsername(username: $username) {
      id
      username
      email
      roles {
        code
      }
      avatar
      birthday
      firstName
      lastName
      middleName
      providerType
      externalId
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    accountIsAuthenticated {
      access
    }
  }
`;

export const CHECK_USERNAME_EXISTS = gql`
  query CheckUsernameExists($username: String!) {
    accountExistsByUsername(username: $username) {
      exists
    }
  }
`;

// Application Queries
export const GET_ALL_APPLICATIONS = gql`
  query GetAllApplications {
    applicationGetAll {
      clientId
      clientName
      redirectUris {
        url
      }
      methods {
        method
      }
      grantTypes {
        grantType
      }
      scopes {
        scope
      }
      clientSetting {
        requireConcept
        requireProofKey
      }
      tokenSetting {
        accessTokenFormat
        idTokenSignatureAlgorithm
        accessTokenTimeToLive
        refreshTokenTimeToLive
        reuseRefreshTokens
      }
      clientIdIssueAt
      clientSecretExpiresAt
    }
  }
`;

export const GET_USER_APPLICATIONS = gql`
  query GetUserApplications {
    applicationGetByUser {
      clientId
      clientName
      redirectUris {
        url
      }
      methods {
        method
      }
      grantTypes {
        grantType
      }
      scopes {
        scope
      }
      clientSetting {
        requireConcept
        requireProofKey
      }
      tokenSetting {
        accessTokenFormat
        idTokenSignatureAlgorithm
        accessTokenTimeToLive
        refreshTokenTimeToLive
        reuseRefreshTokens
      }
      clientIdIssueAt
      clientSecretExpiresAt
    }
  }
`;

// Session Queries
export const GET_USER_SESSIONS = gql`
  query GetUserSessions {
    sessionGetAllByUser {
      id
      device
      deviceBrand
      deviceType
      browser
      createdAt
      lastAccessTime
      active
    }
  }
`;

export const GET_SESSIONS_BY_USERNAME = gql`
  query GetSessionsByUsername($username: String) {
    sessionGetAllByUsername(username: $username) {
      id
      device
      deviceBrand
      deviceType
      browser
      createdAt
      lastAccessTime
      active
    }
  }
`;

// Role Queries
export const GET_ALL_ROLES = gql`
  query GetAllRoles {
    roleGetAll {
      id
      code
      name
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($id: UUID!) {
    roleGetById(id: $id) {
      id
      code
      name
    }
  }
`;

export const GET_ROLE_BY_CODE = gql`
  query GetRoleByCode($code: String!) {
    roleGetByCode(code: $code) {
      id
      code
      name
    }
  }
`;
