import { IQueryPagination, IRequest } from '$base/base.interface';
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
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ChatDto, StoryDto } from './dto/share.dto';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly service: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getListShare(
    @Req() req: IRequest,
    @Headers() headers: { lang: string },
    @Query() query: IQueryPagination,
  ) {
    const { page, perPage } = query;
    const { userId } = req.user;
    const { lang } = headers;
    return await this.service.getListShare(userId, lang, page, perPage);
  }

  // Story
  @UseGuards(JwtAuthGuard)
  @Post('story')
  async createStory(@Req() req: IRequest, @Body() body: StoryDto) {
    const { userId } = req.user;
    return await this.service.createStory(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('story/:storyId')
  async editStory(
    @Req() req: IRequest,
    @Param() params: { storyId: string },
    @Body() body: StoryDto,
  ) {
    const { userId } = req.user;
    const { storyId } = params;
    return await this.service.editStory(userId, storyId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('story/:storyId')
  async getStory(@Req() req: IRequest, @Param() params: { storyId: string }) {
    const { userId } = req.user;
    const { storyId } = params;
    return await this.service.getStory(userId, storyId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('story/:storyId')
  async deleteStory(
    @Req() req: IRequest,
    @Param() params: { storyId: string },
  ) {
    const { userId } = req.user;
    const { storyId } = params;
    return await this.service.deleteStory(userId, storyId);
  }

  // Chat
  @UseGuards(JwtAuthGuard)
  @Post('chat')
  async createChat(@Req() req: IRequest, @Body() body: ChatDto) {
    const { userId } = req.user;
    return await this.service.createChat(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('chat/:chatId')
  async editChat(
    @Req() req: IRequest,
    @Param() params: { chatId: string },
    @Body() body: StoryDto,
  ) {
    const { userId } = req.user;
    const { chatId } = params;
    return await this.service.editChat(userId, chatId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/:chatId')
  async getChat(@Req() req: IRequest, @Param() params: { chatId: string }) {
    const { userId } = req.user;
    const { chatId } = params;
    return await this.service.getChat(userId, chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('chat/:chatId')
  async deleteChat(@Req() req: IRequest, @Param() params: { chatId: string }) {
    const { userId } = req.user;
    const { chatId } = params;
    return await this.service.deleteChat(userId, chatId);
  }
}
