import { toUrl } from "../../utils/requestUtils";
import { GiphyDataResponse } from "../../utils/image/types";

export async function getGiphies(query: string, signal: AbortSignal, offset = 0) {
    const url = toUrl("https://api.giphy.com/v1/gifs/search", {
        api_key: "VR8zLh7EW0IgB3AethVFn2iseXA94K6i",
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
            return body;
        } else {
            throw new Error(`Status of the message is ${body.meta.status}`);
        }
    } catch (e) {
        throw new Error(`Request was aborted`);
    }
}