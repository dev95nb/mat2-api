import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryDto } from './dto/dictionary.dto';

@Controller('auth')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}
  @Get()
  async getDefineWord(@Body() auth: AuthDto) {
    return this.dictionaryService.getDefineWord(auth);
  }

  @Get()
  async searchWord(@Body() auth: AuthDto) {
    return this.dictionaryService.searchWord(auth);
  }

  // Translate
  @Get()
  async getTranslate(@Body() auth: AuthDto) {
    return this.dictionaryService.getTranslate(auth);
  }

  @Put()
  async editTranslate(@Body() auth: AuthDto) {
    return this.dictionaryService.editTranslate(auth);
  }

  @Post()
  async addTranslate(@Body() auth: AuthDto) {
    return this.dictionaryService.addTranslate(auth);
  }

  @Delete()
  async deleteTranslate(@Body() auth: AuthDto) {
    return this.dictionaryService.deleteTranslate(auth);
  }

  // Audio
  @Get()
  async getAudio(@Body() auth: AuthDto) {
    return this.dictionaryService.getAudio(auth);
  }

  @Put()
  async editAudio(@Body() auth: AuthDto) {
    return this.dictionaryService.editAudio(auth);
  }

  @Post()
  async addAudio(@Body() auth: AuthDto) {
    return this.dictionaryService.addAudio(auth);
  }

  @Delete()
  async deleteAudio(@Body() auth: AuthDto) {
    return this.dictionaryService.deleteAudio(auth);
  }

  // Class
  @Get()
  async getClass(@Body() auth: AuthDto) {
    return this.dictionaryService.getClass(auth);
  }

  @Put()
  async editClass(@Body() auth: AuthDto) {
    return this.dictionaryService.editClass(auth);
  }

  @Post()
  async addClass(@Body() auth: AuthDto) {
    return this.dictionaryService.addClass(auth);
  }

  @Delete()
  async deleteClass(@Body() auth: AuthDto) {
    return this.dictionaryService.deleteClass(auth);
  }

  // Sentence
  @Get()
  async getSentence(@Body() auth: AuthDto) {
    return this.dictionaryService.getSentence(auth);
  }

  @Put()
  async editSentence(@Body() auth: AuthDto) {
    return this.dictionaryService.editSentence(auth);
  }

  @Post()
  async addSentence(@Body() auth: AuthDto) {
    return this.dictionaryService.addSentence(auth);
  }

  @Delete()
  async deleteSentence(@Body() auth: AuthDto) {
    return this.dictionaryService.deleteSentence(auth);
  }
}
