import { ObjectId } from '$utils/mongoose';
import { Injectable } from '@nestjs/common';
import { IDescriptionCore } from '../interfaces/dictionary.interfaces';
import { DescriptionRepository } from '../repository';
@Injectable()
export class DescriptionService {
  constructor(private readonly descriptionRepo: DescriptionRepository) {}

  async getDescription(
    dictionaryId: string,
    destination: string,
    page: number,
    perPage: number,
  ) {
    return this.descriptionRepo.getDescription(
      {
        dictionary: ObjectId(dictionaryId),
        toLanguage: destination,
      },
      page,
      perPage,
    );
  }

  async editDescription(
    userId: string,
    dictionaryId: string,
    noteId: string,
    data: IDescriptionCore,
  ) {
    return this.descriptionRepo.editDescription(
      { dictionary: dictionaryId, noteId, creator: userId },
      data,
    );
  }

  async addDescription(
    userId: string,
    dictionaryId: string,
    data: IDescriptionCore,
  ) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.descriptionRepo.addDescription(obj);
  }

  async deleteDescription(
    userId: string,
    dictionaryId: string,
    noteId: string,
  ) {
    return this.descriptionRepo.deleteDescription({
      _id: noteId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
