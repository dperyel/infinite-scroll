export interface ImageInfo {
    id: string;
}

export type ImageInfoMapper<T> = (imageInfo: ImageInfo) => T;

export enum ErrorMessage {
    SameTail = "Head and tail cannot be the same refferences",
};
