import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpModule} from '@nestjs/axios';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RmqController} from "./rmq.controller";

@Module({
    imports: [
        HttpModule.register({}),
        ClientsModule.register([{
            name: "parser",
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://bulbaman.me:16005'],
                queue: "appeals",
                queueOptions: {
                    durable: true,
                }
            }
        }])
    ],
    controllers: [AppController, RmqController],
    providers: [AppService],
})
export class AppModule {
}
