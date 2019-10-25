
/**
 * @description Herramientas para variables
 * @author George Dakhil
 * @date 2018-09-07
 * @export
 * @class Tools
 */
export class Tools {

    /**
     * @description Elimina los espacios en un texto
     * @author George Dakhil
     * @date 2018-09-07
     * @static
     * @param {string} value cadena de texto
     * @returns {string} Rotorna un string sin espacios
     * @memberof Tools
     */
    public static removeSpaces(value: string): string {
        return value.replace(/\s/g, ''); // Elimina todos los espacios del texto
    }

    /**
     * @description elimina las propiedades null o undefined de un objeto
     * @author Harry Perez
     * @date 2019-10-08
     * @static
     * @param {object} obj objeto
     * @returns {object} Rotorna un objeto
     * @memberof Tools
     */
    public static removeNullProperties(obj: object) {
        for (const prop in obj) {
            if (obj[prop] === null || obj[prop] === undefined) {
                delete obj[prop];
            }
        }
        return obj;
    }

    public static excludePath(url: string, controllersName: string[]) {
        const splited = url.split('/');
        if ( splited[1] === 'api') {
          const hasMatch = controllersName.find( value => {
           return value === splited[2];
          });
          if (hasMatch) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
}

// no funciona
export const unless = (path, middleware) => {
    return (req, res, next) => {
      if (path === req.path) {
          return next();
      } else {
        return middleware;
      }
  };
};
