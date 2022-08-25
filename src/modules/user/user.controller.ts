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
import { UserEditDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDetailMe(
    @Req() req: IRequest,
    @Headers() headers: { lang: string },
  ) {
    const { userId } = req.user;
    const { lang } = headers;
    return await this.service.getDetailMe(userId, lang);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/detail')
  async getDetailById(@Param() param: { userId: string }) {
    const userId = param.userId;
    return await this.service.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notification')
  async getListNotification(
    @Req() req: IRequest,
    @Headers() headers: { lang: string },
  ) {
    const { userId } = req.user;
    const { lang } = headers;
    return await this.service.getListNotification(userId, lang);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserDetail(
    @Req() req: IRequest,
    @Body()
    body: UserEditDto,
  ) {
    const { userId } = req.user;
    return await this.service.updateUserDetail(userId, body);
  }
}
