import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';


async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://bulbaman.me:16005'],
            queue: "appeals",
            queueOptions: {
                durable: false
            }
        }
    });
    await app.listen();
}

bootstrap();
