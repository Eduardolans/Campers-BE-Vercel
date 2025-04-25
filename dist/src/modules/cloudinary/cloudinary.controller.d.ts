import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(files: Express.Multer.File): Promise<import("./cloudinary-response").CloudinaryResponse>;
}
