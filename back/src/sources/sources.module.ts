import {Module} from '@nestjs/common';
import {SourcesService} from './sources.service';
import {SourcesController} from './sources.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Source, SourceSchema} from "./entities/source";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
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
        MongooseModule.forFeature([{
            name: Source.name,
            schema: SourceSchema
        }]),
    ],
    controllers: [SourcesController],
    providers: [SourcesService],
})
export class SourcesModule {
}
