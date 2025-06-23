export const baseUrl = "https://apitest.globalta.com.mm/v2_2api/api";
export const origin = "https://apitest.globalta.com.mm";
export const myOrigin = "ook";

export function getCommonHeaders(token) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        myOrigin: myOrigin,
        Origin: origin,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
    };
}
