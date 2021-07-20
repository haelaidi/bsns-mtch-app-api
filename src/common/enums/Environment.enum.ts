export enum EnvironmentEnum {
  devoloppement = 'devoloppement',
  production = 'production'
}

export enum ApiEnvironmentEnum {
  node_env='node_env',
  host='host',
  port='port',
  production='production',
  username_basicauth='username_basicauth',
  password_basicauth='password_basicauth',
  jwt_secret_auth='jwt_secret_auth',
  jwt_expire_auth='jwt_expire_auth',
  jwt_secret_verify='jwt_secret_verify',
  jwt_expire_verify='jwt_expire_verify',
  logger_api='logger_api',
  logger_database='logger_database',
  file_location='file_location',
  file_max_size_mb='file_max_size_mb',
}

export enum DbEnvironmentEnum {
  name='name',
  host='host',
  dialect='dialect',
  port='port',
  schema='schema',
  database='database',
  username='username',
  password='password',
  entities='entities',
  logging='logging',
  synchronise='synchronise',
  request_timeout='request_timeout',
  timezone='timezone',
  extra='extra'
}

export enum JwtEnvironmentEnum {
  auth,
  verify
}

export enum DbCnxEnvironmentEnum {
  bsnsmtch = 'bsnsmtch',
}
