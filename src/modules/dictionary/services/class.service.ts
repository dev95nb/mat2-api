import { ObjectId } from '$utils/mongoose';
import { Injectable } from '@nestjs/common';
import { IClassCore } from '../interfaces/dictionary.interfaces';
import { ClassRepository } from '../repository';
@Injectable()
export class ClassService {
  constructor(private readonly classRepo: ClassRepository) {}

  async getClass(dictionaryId: string, page: number, perPage: number) {
    return this.classRepo.getClass(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editClass(
    userId: string,
    dictionaryId: string,
    classId: string,
    data: IClassCore,
  ) {
    return this.classRepo.editClass(
      { dictionary: dictionaryId, classId, creator: userId },
      data,
    );
  }

  async addClass(userId: string, dictionaryId: string, data: IClassCore) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.classRepo.addClass(obj);
  }

  async deleteClass(userId: string, dictionaryId: string, classId: string) {
    return this.classRepo.deleteClass({
      _id: classId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
