import { ImageInfo } from "../image/types";

export interface DataResponse {
    data: ImageInfo[];
    meta: {
        status: number;
    };
    pagination: {
        count: number;
        offset: number;
        total_count: number;
    };
}

export interface RequestStrategy {

    search: (query: string, signal: AbortSignal, offset?: number) => Promise<DataResponse>;

}
