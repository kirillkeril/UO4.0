import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import * as process from "process";


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBIT_CONNECTION],
            queue: "appeals",
            queueOptions: {
                durable: true
            }
        }
    });
    await app.listen();
}

bootstrap();
