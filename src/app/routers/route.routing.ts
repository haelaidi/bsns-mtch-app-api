import { Routes } from 'nest-router';
import { BsnsmtchModule } from '../modules/bsnsmtch-module/Bsnsmtch.module';
import {AuthModule} from "../modules/auth-module/Auth.module";
import {UploadDowlaodModule} from "../modules/upload-dowload-module/UploadDowlaod.module";

export const routes: Routes = [

  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'bsnsmtch',
    module: BsnsmtchModule,
  },
  {
    path: '',
    module: UploadDowlaodModule,
  },
];
