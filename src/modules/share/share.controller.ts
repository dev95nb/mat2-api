import { IRequest } from '$base/base.interface';
import { JwtAuthGuard } from '$guards/jwt.guard';
import {
  Body,
  Headers,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly service: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getListShare(
    @Req() req: IRequest,
    @Headers() headers: { lang: string },
  ) {
    const { userId } = req.user;
    const { lang } = headers;
    return await this.service.getListShare(userId, lang);
  }
}
