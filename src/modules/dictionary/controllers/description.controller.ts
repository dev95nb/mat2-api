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
import { DescriptionDto } from '../dto/dictionary.dto';
import { DescriptionService } from '../services/description.service';

@Controller('dictionary')
export class DescriptionController {
  constructor(private descriptionService: DescriptionService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':dictionaryId/description')
  async getDescription(
    @Param() params: { dictionaryId: string },
    @Query() query: { destination: string; page: number; perPage: number },
  ) {
    const dictionaryId = params.dictionaryId;
    const { destination, page, perPage } = query;
    return this.descriptionService.getDescription(
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
    @Body() body: DescriptionDto,
    @Req() req: IRequest,
  ) {
    const { dictionaryId, descriptionId } = params;
    const { userId } = req.user;
    return this.descriptionService.editDescription(
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
    @Body() body: DescriptionDto,
    @Req() req: IRequest,
  ) {
    const dictionaryId = params.dictionaryId;
    const { userId } = req.user;
    return this.descriptionService.addDescription(userId, dictionaryId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':dictionaryId/note/:descriptionId')
  async deleteDescription(
    @Param() params: { dictionaryId: string; descriptionId: string },
    @Req() req: IRequest,
  ) {
    const { dictionaryId, descriptionId } = params;
    const { userId } = req.user;
    return this.descriptionService.deleteDescription(
      userId,
      dictionaryId,
      descriptionId,
    );
  }
}
