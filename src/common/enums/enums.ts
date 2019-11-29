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

export enum itemsVisibility {
    BIO          = -1,
    PUBLIC       = 0,
    GENERAL      = 1,
    PERSONAL     = 2,
    PROFESSIONAL = 3,
    ALL          = 4,
}

export enum excludeMwRoutes {
    // auth routes
    AUTH_AUTHENTICATE = '/auth/authenticate',

    // user-config routes
    UCONFIG_CATEGORIES             = '/user-config/categories',
    UCONFIG_CATEGORIES_ITEMS       = '/user-config/categories-items',
    UCONFIG_ITEMTYPES              = '/user-config/itemtypes',
    UCONFIG_USERITEMS              = '/user-config/items',
    UCONFIG_ADD_MANY_ITEMS_TO_USER = '/user-config/items-create',
    UCONFIG_UPDATE_USER_BASIC_DATA = '/user-config/update-basic-data',
    UCONFIG_UPLOAD_USER_AVATAR     = '/user-config/upload-avatar',

    // wink routes
    WINK_NEARBY_USERS              = '/wink/nearby-users',
    WINK_SHOW_PUBLIC_PROFILE       = '/wink/show-public-profile',
    WINK_SEND_WINK                 = '/wink/send-wink',
    WINK_GET_USER                  = '/wink/get-user',
    WINK_GET_WINKS                 = '/wink/get-winks',
    WINK_HANDLE_WINK               = '/wink/handle-wink',
    WINK_SHOW_PRIVATE_PROFILE      = '/wink/show-private-profile',
    WINK_DELETE_WINK               = '/wink/delete-wink',
    WINK_SOCIAL_NETWORK_LINKS      = '/wink/social-network-links',
    WINK_UPDATE_USER_VISIBILITY    = '/wink/update-visibility',
    WINK_UPDATE_USER_STATUS        = '/wink/user-status',
}
