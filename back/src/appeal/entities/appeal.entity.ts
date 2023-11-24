import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AppealDocument = HydratedDocument<Appeal>;

@Schema()
export class Appeal {
    @Prop()
    executor: string;

    @Prop()
    theme: string;

    @Prop()
    subTheme: string;

    @Prop({required: true})
    body: string;
}

export const AppealSchema = SchemaFactory.createForClass(Appeal);
