export interface Payload {
    exp: number;
    iat: number;
    sub: Sub;
}

export interface Sub {
    appId: string;
    provider: string;
    created: string;
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    avatarUrl?: string;
    birthday?: string;
}
