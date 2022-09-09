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
import { PronunciationDto } from '../dto/dictionary.dto';
import { PronunciationService } from '../services/pronunciation.service';

@Controller('dictionary')
export class PronunciationController {
  constructor(private pronunciationService: PronunciationService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/pronunciation')
  async getPronunciation(
    @Param() params: { dictionaryId: string },
    @Query() query: { source: string; page: number; perPage: number },
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage, source } = query;
    return this.pronunciationService.getPronunciation(
      dictionaryId,
      source,
      page,
      perPage,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/pronunciation/:pronunciationId')
  async editPronunciation(
    @Param() params: { dictionaryId: string; pronunciationId: string },
    @Body() body: PronunciationDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, pronunciationId } = params;
    const { userId } = req.user;
    return this.pronunciationService.editPronunciation(
      userId,
      dictionaryId,
      pronunciationId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/pronunciation')
  async addPronunciation(
    @Param() params: { dictionaryId: string },
    @Body() body: PronunciationDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.pronunciationService.addPronunciation(
      userId,
      dictionaryId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/pronunciation/:pronunciationId')
  async deletePronunciation(
    @Param() params: { dictionaryId: string; pronunciationId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, pronunciationId } = params;
    const { userId } = req.user;
    return this.pronunciationService.deletePronunciation(
      userId,
      dictionaryId,
      pronunciationId,
    );
  }
}
