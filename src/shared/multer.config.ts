import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

let path: string; // path to storage
let limit: number; // file size in bytes
let filter: any; // array of support formats jpeg|png  etc..

export const setMulterImageOptions = ( fileSize: number, uploadPath: string, uploadFilter: string) => {
    path   =  uploadPath;
    limit  = fileSize;
    filter = new RegExp(`\/(${uploadFilter})$`);
    return multerImageOptions;
};

// Multer upload options
const multerImageOptions: MulterOptions = {
    // Enable file size limits
    limits: {
        fileSize: limit,
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(filter)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = path;
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
};
