import {Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, Req, Res, UploadedFiles} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from '../../services/upload-dowload-service';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {IApiResponse} from "../../../common/helpers/api-response/api-response.interface";

//@UseGuards(JwtAuthGuard)
@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
  }

  @Post('')
  @UseInterceptors(AnyFilesInterceptor())
  async _edit(@Req() request: any, @Res() response: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
    console.log(files)
    return { files: files };
  }
}
