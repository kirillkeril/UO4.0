import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpModule} from '@nestjs/axios';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        HttpModule.register({}),
        ClientsModule.register([{
            name: "parser",
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://bulbaman.me:16005'],
                queue: "appeals.toparse",
                queueOptions: {
                    durable: true,
                }
            }
        }])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
