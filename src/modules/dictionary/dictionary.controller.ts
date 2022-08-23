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
  @Get()
  async searchWord(@Query() query: { word: string }) {
    const word = query.word;
    return this.dictionaryService.searchWord(word);
  }

  // Translate
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/translate')
  async getTranslate(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getTranslate(dictionaryId);
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
  async getPronunciation(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getPronunciation(dictionaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/pronunciation')
  async editPronunciation(
    @Param() params: { dictionaryId: string },
    @Body() body: PronunciationDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editPronunciation(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/pronunciation')
  async addPronunciation(
    @Param() params: { dictionaryId: string },
    @Body() body: PronunciationDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addPronunciation(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/:pronunciationId')
  async deletePronunciation(
    @Param() params: { dictionaryId: string; pronunciationId: string },
  ) {
    const { dictionaryId, pronunciationId } = params;
    return this.dictionaryService.deletePronunciation(
      dictionaryId,
      pronunciationId,
    );
  }

  // Class
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/class')
  async getClass(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getClass(dictionaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/class')
  async editClass(
    @Param() params: { dictionaryId: string },
    @Body() body: ClassDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editClass(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/class')
  async addClass(
    @Param() params: { dictionaryId: string },
    @Body() body: ClassDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addClass(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/:classId')
  async deleteClass(
    @Param() params: { dictionaryId: string; classId: string },
  ) {
    const { dictionaryId, classId } = params;
    return this.dictionaryService.deleteClass(dictionaryId, classId);
  }

  // Sentence
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/sentence')
  async getSentence(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getSentence(dictionaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/sentence')
  async editSentence(
    @Param() params: { dictionaryId: string },
    @Body() body: SentenceDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editSentence(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/sentence')
  async addSentence(
    @Param() params: { dictionaryId: string },
    @Body() body: SentenceDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addSentence(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/:sentenceId')
  async deleteSentence(
    @Param() params: { dictionaryId: string; sentenceId: string },
  ) {
    const { dictionaryId, sentenceId } = params;
    return this.dictionaryService.deleteSentence(dictionaryId, sentenceId);
  }

  // Note
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/note')
  async getNote(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getNote(dictionaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/note')
  async editNote(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editNote(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/note')
  async addNote(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addNote(dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/:noteId')
  async deleteNote(@Param() params: { dictionaryId: string; noteId: string }) {
    const { dictionaryId, noteId } = params;
    return this.dictionaryService.deleteNote(dictionaryId, noteId);
  }
}
