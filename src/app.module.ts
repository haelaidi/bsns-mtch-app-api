import {Module} from '@nestjs/common';
import {CoreModule} from './app/modules/Core.module';
import {ConfigModule} from './config/config.module';
import {AuthModule} from './app/modules/auth-module/Auth.module';
import {UploadDowlaodModule} from './app/modules/upload-dowload-module/UploadDowlaod.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from './config/config.service';
import {DbCnxEnvironmentEnum} from './common/enums/Environment.enum';
import {routes} from './app/routes/route.routing';
import {RouterModule} from 'nest-router';
import {BsnsmtchModule} from "./app/modules/bsnsmtch-module/Bsnsmtch.module";

@Module({
    imports: [
        ConfigModule.register(),
        RouterModule.forRoutes(routes),
        AuthModule,
        BsnsmtchModule,
        UploadDowlaodModule,
        CoreModule,
    ],
})
export class AppModule {
}
