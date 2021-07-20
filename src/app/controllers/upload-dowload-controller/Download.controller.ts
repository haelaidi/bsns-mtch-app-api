import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DownloadService } from '../../services/upload-dowload-service';

//@UseGuards(JwtAuthGuard)
@ApiTags('Download')
@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {
  }

  @Get()
  getAuth() {
    return { message: 'Welcome into Auth Routing' };
  }
}
