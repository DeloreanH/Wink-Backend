import { createParamDecorator } from '@nestjs/common';

/**
 * @description createParamDecorator() nos da la funcionalidad de crear custom decorators, en este caso @servSub()
 * @author Harry Perez
 * @date 2019-10-02
 * @returns {authUser}
 */
export const servDecoded = createParamDecorator((param, req) => {
  return param ? req.servDecoded[param] : req.servDecoded;
  });
