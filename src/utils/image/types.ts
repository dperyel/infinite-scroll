
interface ImageUnit {
    height: string;
    url: string;
    width: string;
}
export interface ImageInfo {
    id: string;
    title: string;
    images: {
        preview: ImageUnit,
    }
}

export type ImageInfoMapper<T> = (imageInfo: ImageInfo) => T;

export enum ErrorMessage {
    SameTail = "Head and tail cannot be the same refferences",
    NoHead = "Head node cannot be empty",
};
