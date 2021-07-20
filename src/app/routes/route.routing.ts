import { Routes } from 'nest-router';
import { AuthModule } from '../modules/auth-module/Auth.module';
import { UploadDowlaodModule } from '../modules/upload-dowload-module/UploadDowlaod.module';
import {BsnsmtchModule} from "../modules/bsnsmtch-module/Bsnsmtch.module";

export const routes: Routes = [

  {
    path: '',
    module: AuthModule,
  },
  {
    path: 'bsnsmtch',
    module: BsnsmtchModule,
  },
  {
    path: 'upload-download',
    module: UploadDowlaodModule,
  },
];
