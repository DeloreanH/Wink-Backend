import { Document } from 'mongoose';

export interface Log extends Document {
    userId: string;
    created: Date;
    updated: Date;
}
