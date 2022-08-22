import { JwtAuthGuard } from '$guards/jwt.guard';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserEditDto } from './dto/user.dto';
import { RequestWithUser } from './interfaces/user.interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDetail(@Req() req: RequestWithUser) {
    const { userId } = req.user;
    return await this.service.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserDetail(
    @Req() req: RequestWithUser,
    @Body()
    body: UserEditDto,
  ) {
    const { userId } = req.user;
    return await this.service.updateUserDetail(userId, body);
  }
}
