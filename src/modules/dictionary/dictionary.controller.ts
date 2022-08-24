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
import { DictionaryService } from './dictionary.service';
import {
  TranslateDto,
  PronunciationDto,
  ClassDto,
  SentenceDto,
  NoteDto,
} from './dto/dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('define')
  async getDefineWord(
    @Query() query: { word: string; source: string; destination: string },
  ) {
    const { word, source, destination } = query;
    return this.dictionaryService.getDefineWord(word, source, destination);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchWord(@Query() query: { word: string }) {
    const word = query.word;
    return this.dictionaryService.searchWord(word);
  }

  // Translate
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/translate')
  async getTranslate(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.dictionaryService.getTranslate(dictionaryId, page, perPage);
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

  // Pronunciation
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/pronunciation')
  async getPronunciation(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.dictionaryService.getPronunciation(dictionaryId, page, perPage);
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
    return this.dictionaryService.editPronunciation(
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
    return this.dictionaryService.addPronunciation(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/pronunciation/:pronunciationId')
  async deletePronunciation(
    @Param() params: { dictionaryId: string; pronunciationId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, pronunciationId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deletePronunciation(
      userId,
      dictionaryId,
      pronunciationId,
    );
  }

  // Class
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/class')
  async getClass(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.dictionaryService.getClass(dictionaryId, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/class/:classId')
  async editClass(
    @Param() params: { dictionaryId: string; classId: string },
    @Body() body: ClassDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, classId } = params;
    const { userId } = req.user;
    return this.dictionaryService.editClass(
      userId,
      dictionaryId,
      classId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/class')
  async addClass(
    @Param() params: { dictionaryId: string },
    @Body() body: ClassDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.dictionaryService.addClass(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/class/:classId')
  async deleteClass(
    @Param() params: { dictionaryId: string; classId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, classId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deleteClass(userId, dictionaryId, classId);
  }

  // Sentence
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/sentence')
  async getSentence(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.dictionaryService.getSentence(dictionaryId, page, perPage);
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
    return this.dictionaryService.editSentence(
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
    return this.dictionaryService.addSentence(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/sentence/:sentenceId')
  async deleteSentence(
    @Param() params: { dictionaryId: string; sentenceId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, sentenceId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deleteSentence(
      userId,
      dictionaryId,
      sentenceId,
    );
  }

  // Note
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/note')
  async getNote(
    @Param() params: { dictionaryId: string },
    @Query() query: IQueryPagination,
  ) {
    const dictionaryId = params.dictionaryId;
    const { page, perPage } = query;
    return this.dictionaryService.getNote(dictionaryId, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/note/:noteId')
  async editNote(
    @Param() params: { dictionaryId: string; noteId: string },
    @Body() body: NoteDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, noteId } = params;
    const { userId } = req.user;
    return this.dictionaryService.editNote(userId, dictionaryId, noteId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/note')
  async addNote(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.dictionaryService.addNote(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/note/:noteId')
  async deleteNote(
    @Param() params: { dictionaryId: string; noteId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, noteId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deleteNote(userId, dictionaryId, noteId);
  }
}
