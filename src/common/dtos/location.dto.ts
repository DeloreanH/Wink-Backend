import { IsString, Equals, IsNumber } from 'class-validator';

export class LocationDTO {
    @IsString()
    @Equals('Point')
    type: string;
    @IsNumber({}, {
       each: true,
    })
    coordinates: [number, number];
 }
