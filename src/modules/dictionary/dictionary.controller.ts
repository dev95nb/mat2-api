import { JwtAuthGuard } from '$guards/jwt.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('define')
  async getDefineWord(@Query() query: { word: string; source: string }) {
    const { word, source } = query;
    return this.dictionaryService.getDefineWord(word, source);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchWord(@Query() query: { word: string; source: string }) {
    const { word, source } = query;
    return this.dictionaryService.searchWord(word, source);
  }
}
