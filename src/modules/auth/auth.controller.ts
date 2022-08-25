import { JwtRTAuthGuard } from '$guards/jwt.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async auth(@Body() auth: AuthDto) {
    return this.authService.checkAuth(auth);
  }

  @UseGuards(JwtRTAuthGuard)
  @Post('renew')
  async renewToken(@Req() req) {
    const { userId, sessionId, refreshToken } = req.user;
    return this.authService.renewToken(sessionId, userId, refreshToken);
  }
}
