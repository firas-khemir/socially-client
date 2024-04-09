import { S3 } from 'aws-sdk';
import { globalEnv } from '../config/baseConfig';

export class uploadS3 {
  private getS3Bucket() {
    return new S3({
      accessKeyId: process.env.REACT_APP_KEY_ID_FOR_AWS,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY_FOR_AWS,
      region: 'us-east-1'
    });
  }

  async uploadS3(file: any, name: string, topicName: string, isLowRes = false) {
    const s3 = this.getS3Bucket();

    let folderName: string = topicName.replace(/[^a-zA-Z0-9_.]/g, '_');
    const underscoreName: string = String(name).replace(/[^a-zA-Z0-9_.]/g, '_');

    if (isLowRes) {
      folderName = folderName + '/low_res';
    }

    const params = {
      Bucket: globalEnv.BUCKET_NAME,
      Key: `images/${folderName.toLowerCase()}/${String(underscoreName)}`,
      Body: file,
      ACL: 'public-read',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1'
      }
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
