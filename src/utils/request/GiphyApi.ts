import { RequestStrategy, DataResponse } from "./types";
import { toUrl } from "../requestUtils";

interface GiphyImageInfo {
    id: string;
    title: string;
    images: {
        fixed_width_still: {
            height: string;
            url: string;
            width: string;
        },
        fixed_width_downsampled: {
            height: string;
            url: string;
            width: string;
        },
    }
}

export interface GiphyDataResponse {
    data: GiphyImageInfo[];
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

export class GiphyApi implements RequestStrategy {

    private apiKey: string;

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async search(query: string, signal: AbortSignal, offset = 0) {
        const url = toUrl("https://api.giphy.com/v1/gifs/search", {
            api_key: this.apiKey,
            q: query,
            limit: 100,
            offset: offset,
            rating: "G",
            lang: "en",
        });
    
        try {
            const res = await fetch(url, { signal: signal });
            const body: GiphyDataResponse = await res.json();
        
            if (body.meta.status === 200) {
                return this.responseAdaptor(body);
            } else {
                throw new Error(`Status of the message is ${body.meta.status}`);
            }
        } catch (e) {
            throw new Error(`Request was aborted`);
        }
    }

    private responseAdaptor(response: GiphyDataResponse): DataResponse {
        const data = response.data.map((imageInfo: GiphyImageInfo) => ({
            id: imageInfo.id,
            title: imageInfo.title,
            images: {
                preview: {
                    height: imageInfo.images.fixed_width_downsampled.height,
                    url: imageInfo.images.fixed_width_downsampled.url,
                    width: imageInfo.images.fixed_width_downsampled.width, 
                },
            }
        }));
        const meta = {
            status: response.meta.status,
        };
        const pagination = { ...response.pagination };

        return {
            data: data,
            meta: meta,
            pagination: pagination,
        }
    }

}
