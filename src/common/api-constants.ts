import type { FieldParam, FieldParamType, FieldValue } from "./types";

export interface RequestBody {
    [key: string]: FieldValue | RequestBody;
}

export interface ApiConfig {
    // http request type - GET, POST, PUT, DELETE
    requestType?: string;
    // request body payload
    requestBody?: RequestBody;
    // requst body payload parameters
    requestBodyParams?: Array<FieldParamType>;
    // request header parameter
    requestHeaders?: Record<string, string>;
    // query parameters
    queryParams?: Array<FieldParam>;
    // url of the api
    url?: string;
    // to setup url location type (local, remote)
    urlType?: string;
    labelKey?: string;
    valueKey?: string;
    responseKey?: string;
}

export interface RequestHeaders {
    requestHeaders: Record<string, string>;
}