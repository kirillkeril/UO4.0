import {Module} from '@nestjs/common';
import {AppealModule} from './appeal/appeal.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        AppealModule,
        MongooseModule.forRoot(process.env.MONGO_CONNECTION)
    ],
    controllers: [],
})
export class AppModule {
    constructor() {
        console.log(process.env.MONGO_CONNECTION)
    }
}
