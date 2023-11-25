import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        ClientsModule.register([{
            name: "appeal",
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://bulbaman.me:16005"],
                queue: "appeals",
                queueOptions: {
                    durable: true
                }
            }
        }])],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor() {
    }
}
