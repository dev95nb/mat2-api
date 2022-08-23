import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @Get()
  async getDefineWord(@Query() query: { word: string }) {
    const word = query.word;
    return this.dictionaryService.getDefineWord(word);
  }

  @Get()
  async searchWord(@Query() query: { word: string }) {
    const word = query.word;
    return this.dictionaryService.searchWord(word);
  }

  // Translate
  @Get(':dictionaryId/translate')
  async getTranslate(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getTranslate(dictionaryId);
  }

  @Put(':dictionaryId/translate')
  async editTranslate(
    @Param() params: { dictionaryId: string },
    @Body() body: TranslateDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editTranslate(dictionaryId, body);
  }

  @Post(':dictionaryId/translate')
  async addTranslate(
    @Param() params: { dictionaryId: string },
    @Body() body: TranslateDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addTranslate(dictionaryId, body);
  }

  @Delete(':dictionaryId/translate/:translateId')
  async deleteTranslate(
    @Param() params: { dictionaryId: string; translateId: string },
  ) {
    const { dictionaryId, translateId } = params;
    return this.dictionaryService.deleteTranslate(dictionaryId, translateId);
  }

  // Pronunciation
  @Get(':dictionaryId/pronunciation')
  async getPronunciation(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getPronunciation(dictionaryId);
  }

  @Put(':dictionaryId/pronunciation')
  async editPronunciation(
    @Param() params: { dictionaryId: string },
    @Body() body: PronunciationDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editPronunciation(dictionaryId, body);
  }

  @Post(':dictionaryId/pronunciation')
  async addPronunciation(
    @Param() params: { dictionaryId: string },
    @Body() body: PronunciationDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addPronunciation(dictionaryId, body);
  }

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
  @Get(':dictionaryId/class')
  async getClass(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getClass(dictionaryId);
  }

  @Put(':dictionaryId/class')
  async editClass(
    @Param() params: { dictionaryId: string },
    @Body() body: ClassDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editClass(dictionaryId, body);
  }

  @Post(':dictionaryId/class')
  async addClass(
    @Param() params: { dictionaryId: string },
    @Body() body: ClassDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addClass(dictionaryId, body);
  }

  @Delete(':dictionaryId/:classId')
  async deleteClass(
    @Param() params: { dictionaryId: string; classId: string },
  ) {
    const { dictionaryId, classId } = params;
    return this.dictionaryService.deleteClass(dictionaryId, classId);
  }

  // Sentence
  @Get(':dictionaryId/sentence')
  async getSentence(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getSentence(dictionaryId);
  }

  @Put(':dictionaryId/sentence')
  async editSentence(
    @Param() params: { dictionaryId: string },
    @Body() body: SentenceDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editSentence(dictionaryId, body);
  }

  @Post(':dictionaryId/sentence')
  async addSentence(
    @Param() params: { dictionaryId: string },
    @Body() body: SentenceDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addSentence(dictionaryId, body);
  }

  @Delete(':dictionaryId/:sentenceId')
  async deleteSentence(
    @Param() params: { dictionaryId: string; sentenceId: string },
  ) {
    const { dictionaryId, sentenceId } = params;
    return this.dictionaryService.deleteSentence(dictionaryId, sentenceId);
  }

  // Note
  @Get(':dictionaryId/note')
  async getNote(@Param() params: { dictionaryId: string }) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.getNote(dictionaryId);
  }

  @Put(':dictionaryId/note')
  async editNote(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.editNote(dictionaryId, body);
  }

  @Post(':dictionaryId/note')
  async addNote(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
  ) {
    const dictionaryId = params.dictionaryId;
    return this.dictionaryService.addNote(dictionaryId, body);
  }

  @Delete(':dictionaryId/:noteId')
  async deleteNote(@Param() params: { dictionaryId: string; noteId: string }) {
    const { dictionaryId, noteId } = params;
    return this.dictionaryService.deleteNote(dictionaryId, noteId);
  }
}
