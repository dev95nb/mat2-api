import { ObjectId } from '$utils/mongoose';
import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../dictionary.repository';
import { INoteCore } from '../interfaces/dictionary.interfaces';
@Injectable()
export class NoteService {
  constructor(private readonly noteRepo: NoteRepository) {}

  async getNote(dictionaryId: string, page: number, perPage: number) {
    return this.noteRepo.getNote(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editNote(
    userId: string,
    dictionaryId: string,
    noteId: string,
    data: INoteCore,
  ) {
    return this.noteRepo.editNote(
      { dictionary: dictionaryId, noteId, creator: userId },
      data,
    );
  }

  async addNote(userId: string, dictionaryId: string, data: INoteCore) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.noteRepo.addNote(obj);
  }

  async deleteNote(userId: string, dictionaryId: string, noteId: string) {
    return this.noteRepo.deleteNote({
      _id: noteId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
