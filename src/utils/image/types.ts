
interface ImageUnit {
    height: string;
    url: string;
    width: string;
}
export interface ImageInfo {
    id: string;
    title: string;
    images: {
        fixed_width_still: ImageUnit,
        fixed_width_downsampled: ImageUnit,
    }
}

export interface GiphyDataResponse {
    data: ImageInfo[];
    meta: {
        msg: string;
        response_id: string;
        status: number;
    };
    pagination: {
        count: number;
        offset: number;
        total_count: number;
    };
} 

export type ImageInfoMapper<T> = (imageInfo: ImageInfo) => T;

export enum ErrorMessage {
    SameTail = "Head and tail cannot be the same refferences",
    NoHead = "Head node cannot be empty",
};
