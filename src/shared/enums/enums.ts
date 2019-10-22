export enum jwtAlgorithm {
    HS256 = 'HS256',
    HS384 = 'HS384',
    HS512 = 'HS512',
    RS256 = 'RS256',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum excludeMwRoutes {
    // auth routes
    AUTH_AUTHENTICATE = '/auth/authenticate',

    // user-config routes
    UCONFIG_CONFIG                 = '/user-config/config',
    UCONFIG_CATEGORIES             = '/user-config/categories',
    UCONFIG_CATEGORIES_ITEMS       = '/user-config/categories-items',
    UCONFIG_ITEMTYPES              = '/user-config/itemtypes',
    UCONFIG_USERITEMS              = '/user-config/items/user/:id',
    UCONFIG_ADD_MANY_ITEMS_TO_USER = '/user-config/items/user/create',
    UCONFIG_UPDATE_USER_BASIC_DATA = '/user-config/user/update/basic-data',
    UCONFIG_UPLOAD_USER_AVATAR     = '/user-config/user/upload/avatar',
    UCONFIG_USER_AVATAR            = '/user-config/user/avatar/:imagepath',
}
