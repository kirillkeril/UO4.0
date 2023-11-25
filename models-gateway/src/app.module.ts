import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([{
        name: "appeal",
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://bulbaman.me:16005'],
            queue: "appeals",
            queueOptions: {
                durable: false
            }
        }
    }])],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
