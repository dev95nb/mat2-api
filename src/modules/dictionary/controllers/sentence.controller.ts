import { IQueryPagination, IRequest } from '$base/base.interface';
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
import { SentenceDto } from '../dto/dictionary.dto';
import { SentenceService } from '../services/sentence.service';

@Controller('dictionary')
export class SentenceController {
  constructor(private sentenceService: SentenceService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/sentence')
  async getSentence(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.sentenceService.getSentence(dictionaryId, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/sentence/:sentenceId')
  async editSentence(
    @Param() params: { dictionaryId: string; sentenceId: string },
    @Body() body: SentenceDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, sentenceId } = params;
    const { userId } = req.user;
    return this.sentenceService.editSentence(
      userId,
      dictionaryId,
      sentenceId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/sentence')
  async addSentence(
    @Param() params: { dictionaryId: string },
    @Body() body: SentenceDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.sentenceService.addSentence(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/sentence/:sentenceId')
  async deleteSentence(
    @Param() params: { dictionaryId: string; sentenceId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, sentenceId } = params;
    const { userId } = req.user;
    return this.sentenceService.deleteSentence(
      userId,
      dictionaryId,
      sentenceId,
    );
  }
}
