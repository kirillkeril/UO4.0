import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AppealDocument = HydratedDocument<Appeal>;

@Schema()
export class Appeal {
    @Prop({required: false})
    executor: string;

    @Prop({required: false})
    theme: string;

    @Prop({required: false})
    themeGroup: string;

    @Prop({required: false})
    tags: string[];

    @Prop({required: true})
    body: string;

    @Prop({required: false})
    mark: "NEW" | "OLD";
}

export const AppealSchema = SchemaFactory.createForClass(Appeal);
