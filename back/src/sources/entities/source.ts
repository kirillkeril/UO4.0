import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AppealDocument = HydratedDocument<Source>;

@Schema()
export class Source {
    @Prop({required: false})
    link: string;
}

export const AppealSchema = SchemaFactory.createForClass(Source);
