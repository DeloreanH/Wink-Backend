import { createParamDecorator } from '@nestjs/common';

/**
 * @description createParamDecorator() nos da la funcionalidad de crear custom decorators, en este caso @authUser()
 * @author Harry Perez
 * @date 2019-10-02
 * @returns {authUser}
 */
export const AuthUser = createParamDecorator((data, req) => {
    return data ? req.authUser[data] : req.authUser;
  });
