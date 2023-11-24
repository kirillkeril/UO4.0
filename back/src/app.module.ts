import {Module} from '@nestjs/common';
import {AppealModule} from './appeal/appeal.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { AppealsModule } from './appeals/appeals.module';


@Module({
    imports: [
        ClientsModule.register([{
            name: "appeal",
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://bulbaman.me:16005'],
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
        AppealsModule
    ],
    controllers: [],
})
export class AppModule {
    constructor() {
        console.log(process.env.MONGO_CONNECTION)
    }
}
