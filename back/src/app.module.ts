import {Module} from '@nestjs/common';
import {AppealModule} from './appeal/appeal.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {SourcesModule} from './sources/sources.module';
import * as process from "process";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        ClientsModule.register([{
            name: "appeal",
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBIT_CONNECTION],
                queue: "appeals",
                queueOptions: {
                    durable: true,
                }
            }
        }]),
        AppealModule,
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        SourcesModule,
    ],
    controllers: [],
})
export class AppModule {
    constructor() {
        console.log(process.env.MONGO_CONNECTION)
        console.log(process.env.RABBIT_CONNECTION)
    }
}
