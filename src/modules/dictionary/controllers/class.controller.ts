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
import { ClassDto } from '../dto/dictionary.dto';

@Controller('dictionary')
export class ClassController {
  constructor(private dictionaryService: DictionaryService) {}
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
}
