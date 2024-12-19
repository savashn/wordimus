export type Api = {
    api: string;
    slug?: string;
    token?: string;
};

export type Auth = {
    username: string;
};

export type Params = Promise<{ user: string, post?: string, username?: string, msg?: string, cat?: string }>

export type SearchParams = Promise<{ [id: string]: string | string[] | undefined }>;