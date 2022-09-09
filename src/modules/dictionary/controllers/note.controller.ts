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
import { DictionaryService } from '../dictionary.service';
import { NoteDto } from '../dto/dictionary.dto';

@Controller('dictionary')
export class NoteController {
  constructor(private dictionaryService: DictionaryService) {}
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
