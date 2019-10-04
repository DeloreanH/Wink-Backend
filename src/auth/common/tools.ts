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
}
