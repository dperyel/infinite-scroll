
export type UrlParams = {[key: string]: number | string; };

export function toUrl(link: string, urlParams?: UrlParams) {

    const paramsAsString = urlParams && Object.keys(urlParams).map(paramName => {
        const param = urlParams[paramName].toString().trim();
        return `${paramName}=${param}`;
    }).join("&");

    const url = link.trim();
    const paramsToAttach = paramsAsString ? `?${paramsAsString}` : "";

    return encodeURI(url + paramsToAttach);
}
