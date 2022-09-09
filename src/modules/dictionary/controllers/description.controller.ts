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
import { NoteDto } from '../dto/dictionary.dto';

@Controller('dictionary')
export class DescriptionController {
  constructor(private dictionaryService: DictionaryService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/description')
  async getDescription(
    @Param() params: { dictionaryId: string },
    @Query() query: { destination: string; page: number; perPage: number },
  ) {
    const dictionaryId = params.dictionaryId;
    const { destination, page, perPage } = query;
    return this.dictionaryService.getDescription(
      dictionaryId,
      destination,
      page,
      perPage,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':dictionaryId/description/:descriptionId')
  async editDescription(
    @Param() params: { dictionaryId: string; descriptionId: string },
    @Body() body: NoteDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, descriptionId } = params;
    const { userId } = req.user;
    return this.dictionaryService.editDescription(
      userId,
      dictionaryId,
      descriptionId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':dictionaryId/description')
  async addDescription(
    @Param() params: { dictionaryId: string },
    @Body() body: NoteDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.dictionaryService.addDescription(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/note/:descriptionId')
  async deleteDescription(
    @Param() params: { dictionaryId: string; descriptionId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, descriptionId } = params;
    const { userId } = req.user;
    return this.dictionaryService.deleteDescription(
      userId,
      dictionaryId,
      descriptionId,
    );
  }
}
