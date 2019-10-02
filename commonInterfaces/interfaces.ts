export interface serverToken {
    exp: number;
    iat: number;
    sub: {
        appId: string,
        avatarUrl: string,
        birthday: string,
        created: string,
        email: string,
        firstName: string,
        gender: string,
        lastName: string,
        provider: string,
    };
}
