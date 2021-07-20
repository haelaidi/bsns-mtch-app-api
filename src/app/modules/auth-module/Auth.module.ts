import { Module } from '@nestjs/common';
import importToArray from 'import-to-array';
import { CoreModule } from '../Core.module';
import { JwtStrategy } from '../../../common/guards/passport-strategy/jwt.strategy';
import { LocalStrategy } from '../../../common/guards/passport-strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../services/auth-service';
import { ConfigService } from '../../../config/config.service';
import { ConfigModule } from '../../../config/config.module';
import { ApiEnvironmentEnum } from '../../../common/enums/Environment.enum';

@Module({
  imports: [
    CoreModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(ApiEnvironmentEnum.jwt_secret_auth),
        signOptions: { expiresIn: configService.get(ApiEnvironmentEnum.jwt_expire_auth) },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: importToArray(require('../../controllers/auth-controller')),
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
