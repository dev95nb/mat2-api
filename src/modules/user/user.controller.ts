import { IRequest } from '$base/base.interface';
import { JwtAuthGuard } from '$guards/jwt.guard';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserEditDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDetail(@Req() req: IRequest) {
    const { userId } = req.user;
    return await this.service.getUserById(userId);
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
