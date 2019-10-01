import { Meaning } from '../enums/enums';

export interface ITokenOptions {
    algorithm?: any;
    expire?: ITokenExpiration;
}
export interface ITokenExpiration {
    unit: number;
    meaning: Meaning;
}
