import importToArray from 'import-to-array';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export = {
  node_env: 'production',
  port: 3002,
  production: false,
  username_basicauth: 'bsnsmtch',
  password_basicauth: 'bsnsmtch@pass',
  jwt_secret_auth: 'K£y_SeCret@B$nSmtCh_.1',
  jwt_secret_verify: 'K£y_SeCret@B$nSmtCh_.2',
  jwt_expire_auth: '24h',
  jwt_expire_verify: '24h',
  logger_api: false,
  logger_database: false,
  file_location: 'uploads-bsns-mtch',
  file_max_size_mb: 100,

  mailer: {
    bsnsmtch: {
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'lins.dev.contact@gmail.com',
          pass: 'RFTwTCu2Lv3879D',
        },
      },
      defaults: {
        from: 'lins.dev.contact@gmail.com',
      },
      template: {
        dir: join(process.cwd(), 'public'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    },
  },

  database: {
    bsnsmtch: {
      name: 'default',
      host: 'eu-cdbr-west-01.cleardb.com',
      //host: 'localhost',
      dialect: 'mysql',
      port: '3306',
      schema: 'public',
      database: 'heroku_7f967a678f45395',
      username: 'bf8a82556c76b5',
      password: 'f3027679',
      entities: importToArray(require('../app/models/entities/bsnsmtch-entity')),
      logging: true,
      synchronise: false,
      request_timeout: 30000,
      timezone: '+01:00',
      extra: {},
    },
  },
};
