export declare const BUCKET_SERVICE: unique symbol;
export interface BucketService {
    upload(file: Express.Multer.File, path: string): Promise<string>;
    delete(path: string): Promise<void>;
    getSignedUrl(path: string, expiresIn?: number): Promise<string>;
}
