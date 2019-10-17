import { createParamDecorator } from '@nestjs/common';

/**
 * @description toma la propiedad AuthUser del objeto req (expressjs) y se hace la transformacion
 *  a un decorator @AuthUser('param')
 * @author Harry Perez
 * @date 2019-10-02
 * @returns {authUser}
 */
export const AuthUser = createParamDecorator((param, req) => {
  return param ? req.authUser[param] : req.authUser;
  });

/**
 * @description toma la propiedad servToken del objeto req (expressjs) y se hace la transformacion
 *  a un decorator @servDecoded('param')
 * @author Harry Perez
 * @date 2019-10-02
 * @returns {authUser}
 */
export const servToken = createParamDecorator((param, req) => {
  return param ? req.servToken[param] : req.servToken;
  });
