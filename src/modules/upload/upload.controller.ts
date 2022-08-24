import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ParseFile } from './upload.pipe';
import { DataUploadDto } from './dto/upload.dto';
import { JwtAuthGuard } from '$guards/jwt.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadFile(
    @Req() req,
    @UploadedFiles(ParseFile) files: Array<Express.Multer.File>,
    @Body() body: DataUploadDto,
  ) {
    const { userId } = req.user;
    const { fileType } = body;
    return this.service.uploadFile(userId, files, fileType);
  }
}
