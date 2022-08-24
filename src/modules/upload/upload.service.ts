import { ConfigAppService } from '$modules/config/config.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private readonly configAppService: ConfigAppService) {}

  async _upload(
    userId: string,
    b2Token: string,
    file: Express.Multer.File,
    fileType: string,
  ) {
    const sha1 = createHash('sha1').update(file.buffer).digest('hex');
    const originalname = file.originalname;
    const extendSplit = originalname.split('.');
    if (extendSplit.length === 1) {
      throw new HttpException('File_Name_Invalid', HttpStatus.BAD_REQUEST);
    }
    const extend = extendSplit.pop();
    const fileId = uuidv4();
    const fileName = `${fileId}.${extend}`;
    for (let i = 0; i < 5; i++) {
      try {
        const { data } = await axios.post(
          'https://api004.backblazeb2.com/b2api/v2/b2_get_upload_url',
          {
            bucketId: '61a9c3d1bdc6f31c8713051b',
          },
          {
            headers: {
              Authorization: b2Token,
            },
          },
        );

        const { authorizationToken, uploadUrl } = data;

        const uploadFile = await axios({
          method: 'post',
          url: uploadUrl,
          data: file.buffer,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            Authorization: authorizationToken,
            'X-Bz-File-Name': `${fileType}/${userId}/${fileName}`,
            'Content-Type': 'b2/x-auto',
            'Content-Length': file.size,
            'X-Bz-Content-Sha1': sha1,
          },
        });
        return process.env.B2_URL_DOWNLOAD + uploadFile.data.fileName;
      } catch (errors) {
        console.log(errors);
      }
    }
    // Alert error upload file
  }

  async uploadFile(
    userId: string,
    files: Array<Express.Multer.File>,
    fileType: string,
  ) {
    const b2Token = await this.configAppService.getB2Config();
    if (!b2Token) {
      throw new HttpException('B2_TOKEN_NOT_EXIST', HttpStatus.BAD_REQUEST);
    }
    const uploadMultiFile = [];
    for (const file of files) {
      uploadMultiFile.push(this._upload(userId, b2Token, file, fileType));
    }
    return {
      items: await Promise.all(uploadMultiFile),
    };
  }
}
