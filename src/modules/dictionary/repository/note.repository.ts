import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { INoteModel } from '../dictionary.model';
import { Note } from '../schemas/dictionary.schema';
import { INoteCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class NoteRepository extends BaseRepository<INoteModel> {
  constructor(@InjectModel(Note.name) model) {
    super(model);
  }

  async editNote(filter: any, data: INoteCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addNote(data: any) {
    return this.model.create(data);
  }

  async deleteNote(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getNote(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
