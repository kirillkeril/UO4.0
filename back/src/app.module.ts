import {Module} from '@nestjs/common';
import {AppealModule} from './appeal/appeal.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { SourcesModule } from './sources/sources.module';


@Module({
    imports: [
        ClientsModule.register([{
            name: "appeal",
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://rmq:5672'],
                queue: "appeals",
                queueOptions: {
                    durable: true,
                }
            }
        }]),
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        AppealModule,
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        SourcesModule,
    ],
    controllers: [],
})
export class AppModule {
    constructor() {
        console.log(process.env.MONGO_CONNECTION)
    }
}
