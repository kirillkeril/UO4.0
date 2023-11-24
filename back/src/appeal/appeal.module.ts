import {Module} from '@nestjs/common';
import {AppealService} from './appeal.service';
import {AppealController} from './appeal.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Appeal, AppealSchema} from "./entities/appeal.entity";
import {HttpModule} from "@nestjs/axios";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppealRmqController} from "./appeal.rmq.controller";

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
        MongooseModule.forFeature([{
            name: Appeal.name,
            schema: AppealSchema
        }]),
        HttpModule
    ],
    controllers: [AppealController, AppealRmqController],
    providers: [AppealService],
})
export class AppealModule {
}
