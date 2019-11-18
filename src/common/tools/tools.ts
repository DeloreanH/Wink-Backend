
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

    public static getDistance( lat1: number, lon1: number, lat2: number, lon2: number, unit = 'km' ) {
      const r = 6378.1; // Equatorial Radius of the earth in km, use Equatorial to match mongodb spatial query distances
      const dLat = Tools.deg2rad(lat2 - lat1);  // deg2rad below
      const dLon = Tools.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(Tools.deg2rad(lat1)) * Math.cos(Tools.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = r * c; // Distance in km
      if (unit === 'm') {
        return d * 1000;
      } else {
        return d;
      }
    }

    public static deg2rad(deg) {
      return deg * (Math.PI / 180 );
    }

}
