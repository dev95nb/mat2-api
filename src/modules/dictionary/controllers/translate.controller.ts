import { IRequest } from '$base/base.interface';
import { JwtAuthGuard } from '$guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DictionaryService } from '../dictionary.service';

import { TranslateDto } from '../dto/dictionary.dto';

@Controller('dictionary')
export class TranslateController {
  constructor(private dictionaryService: DictionaryService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/translate')
  async getTranslate(
    @Param() params: { dictionaryId: string },
    @Query() query: { destination: string; page: number; perPage: number },
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage, destination } = query;
    return this.dictionaryService.getTranslate(
      dictionaryId,
      destination,
      page,
      perPage,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/translate/:translateId')
  async editTranslate(
    @Req() req: IRequest,
    @Param() params: { dictionaryId: string; translateId: string },
    @Body() body: TranslateDto,
  ) {
    const { dictionaryId, translateId } = params;
    const { userId } = req.user;
    return this.dictionaryService.editTranslate(
      userId,
      dictionaryId,
      translateId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/translate')
  async addTranslate(
    @Req() req: IRequest,
    @Param() params: { dictionaryId: string },
    @Body() body: TranslateDto,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.dictionaryService.addTranslate(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/translate/:translateId')
  async deleteTranslate(
    @Req() req: IRequest,
    @Param() params: { dictionaryId: string; translateId: string },
  ) {
    const { dictionaryId, translateId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deleteTranslate(
      userId,
      dictionaryId,
      translateId,
    );
  }
}
