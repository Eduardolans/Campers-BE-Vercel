import { CloudinaryResponse } from './cloudinary-response';
export declare class CloudinaryService {
    uploadFiles(files: Express.Multer.File): Promise<CloudinaryResponse>;
}
