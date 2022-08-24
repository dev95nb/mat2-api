import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(files: Array<Express.Multer.File>) {
    for (const file of files) {
      const maxSizeByte = 30 * 1000 * 1000;
      if (file.size > maxSizeByte) {
        throw new BadRequestException('Validation failed (files expected)');
      }
    }
    return files;
  }
}
