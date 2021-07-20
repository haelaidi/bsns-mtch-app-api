import {Module} from '@nestjs/common';
import importToArray from 'import-to-array';
import {CoreModule} from "../Core.module";

@Module({
    imports: [CoreModule],
    controllers: importToArray(require('../../controllers/bsnsmtch-controller')),
})
export class BsnsmtchModule {
}
